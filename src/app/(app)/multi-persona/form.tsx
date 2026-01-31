
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Pause, Puzzle, Users, Volume2 } from "lucide-react";
import { debateConceptAction, textToSpeechAction } from "@/lib/actions";
import { Skeleton } from "@/components/ui/skeleton";
import type { DebateTurn } from "@/ai/flows/debate-concept";

const formSchema = z.object({
  concept: z.string().min(3, "Concept must be at least 3 characters."),
  persona1: z.string().min(3, "Persona 1 must be at least 3 characters."),
  persona2: z.string().min(3, "Persona 2 must be at least 3 characters."),
  persona3: z.string().min(3, "Persona 3 must be at least 3 characters."),
});

export function MultiPersonaForm() {
  const [debate, setDebate] = useState<DebateTurn[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [personas, setPersonas] = useState({ p1: '', p2: '', p3: '' });

  const [audioSrc, setAudioSrc] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [loadingAudioId, setLoadingAudioId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      concept: "",
      persona1: "A skeptical five-year-old",
      persona2: "A philosophy professor from the 18th century",
      persona3: "A futuristic AI from the year 3000",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setDebate([]);
    setPersonas({ p1: values.persona1, p2: values.persona2, p3: values.persona3 });

    try {
      const result = await debateConceptAction({
        concept: values.concept,
        personas: [values.persona1, values.persona2, values.persona3],
      });
      setDebate(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handlePlayAudio = async (text: string, id: string) => {
    if (playingId === id && audioRef.current) {
      audioRef.current.pause();
      setPlayingId(null);
      return;
    }
    setLoadingAudioId(id);
    setPlayingId(null);
    setAudioSrc('');
    try {
      const audioData = await textToSpeechAction(text);
      setAudioSrc(audioData);
      setPlayingId(id);
    } catch (error) {
      console.error("Failed to generate audio", error);
    } finally {
      setLoadingAudioId(null);
    }
  };

  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio play failed", e));
    }
  }, [audioSrc]);
  
  const showResults = isLoading || debate.length > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle>Assemble Your Learning Ensemble</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="concept"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Concept to Explain</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Quantum Entanglement'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Define Personas</h3>
                <FormField
                  control={form.control}
                  name="persona1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Persona 1</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="persona2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Persona 2</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="persona3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Persona 3</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Puzzle className="mr-2 h-4 w-4" />
                    Get Explanation
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {showResults && (
        <Card>
          <CardHeader>
            <CardTitle>The Ensemble's Explanation</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                {isLoading && debate.length === 0 && [personas.p1, personas.p2, personas.p3].filter(p=>p).map((p, index) => (
                   <AccordionItem value={`item-${index}`} key={index}>
                     <AccordionTrigger>
                       <div className="flex items-center gap-2">
                         <Users className="h-4 w-4" /> {p || <Skeleton className="h-4 w-[150px]" />}
                       </div>
                     </AccordionTrigger>
                     <AccordionContent>
                       <Skeleton className="h-20 w-full" />
                     </AccordionContent>
                   </AccordionItem>
                ))}
                {debate.map((turn, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" /> {turn.persona}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="prose prose-sm dark:prose-invert max-w-none">
                      <div className="space-y-2">
                        <p className="text-muted-foreground">{turn.text}</p>
                        <Button variant="outline" size="sm" onClick={() => handlePlayAudio(turn.text, `p${index}`)} disabled={loadingAudioId === `p${index}`}>
                          {loadingAudioId === `p${index}` ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (playingId === `p${index}` ? <Pause className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />)}
                          {playingId === `p${index}` ? 'Pause' : 'Listen'}
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
      <audio ref={audioRef} src={audioSrc} onEnded={() => setPlayingId(null)} />
    </div>
  );
}
