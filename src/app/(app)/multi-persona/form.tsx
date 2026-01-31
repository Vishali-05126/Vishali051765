
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
import { explainConceptAction, textToSpeechAction } from "@/lib/actions";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  concept: z.string().min(3, "Concept must be at least 3 characters."),
  persona1: z.string().min(3, "Persona 1 must be at least 3 characters."),
  persona2: z.string().min(3, "Persona 2 must be at least 3 characters."),
  persona3: z.string().min(3, "Persona 3 must be at least 3 characters."),
});

export function MultiPersonaForm() {
  const [explanation1, setExplanation1] = useState('');
  const [explanation2, setExplanation2] = useState('');
  const [explanation3, setExplanation3] = useState('');
  const [personas, setPersonas] = useState({ p1: '', p2: '', p3: '' });
  const [isLoading, setIsLoading] = useState(false);

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
    setExplanation1('');
    setExplanation2('');
    setExplanation3('');
    setPersonas({ p1: values.persona1, p2: values.persona2, p3: values.persona3 });

    try {
      await Promise.allSettled([
        explainConceptAction({ concept: values.concept, persona: values.persona1 }).then(res => setExplanation1(res)),
        explainConceptAction({ concept: values.concept, persona: values.persona2 }).then(res => setExplanation2(res)),
        explainConceptAction({ concept: values.concept, persona: values.persona3 }).then(res => setExplanation3(res)),
      ]);
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

  const showResults = isLoading || explanation1 || explanation2 || explanation3;

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
                    Start Debate
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
            <CardTitle>The Ensemble's Explanations</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" /> {personas.p1 || <Skeleton className="h-4 w-[150px]" />}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="prose prose-sm dark:prose-invert max-w-none">
                    {explanation1 ? (
                      <div className="space-y-2">
                        <p className="text-muted-foreground">{explanation1}</p>
                        <Button variant="outline" size="sm" onClick={() => handlePlayAudio(explanation1, 'p1')} disabled={loadingAudioId === 'p1'}>
                          {loadingAudioId === 'p1' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (playingId === 'p1' ? <Pause className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />)}
                          {playingId === 'p1' ? 'Pause' : 'Listen'}
                        </Button>
                      </div>
                    ) : <Skeleton className="h-20 w-full" />}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" /> {personas.p2 || <Skeleton className="h-4 w-[200px]" />}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="prose prose-sm dark:prose-invert max-w-none">
                     {explanation2 ? (
                      <div className="space-y-2">
                        <p className="text-muted-foreground">{explanation2}</p>
                         <Button variant="outline" size="sm" onClick={() => handlePlayAudio(explanation2, 'p2')} disabled={loadingAudioId === 'p2'}>
                           {loadingAudioId === 'p2' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (playingId === 'p2' ? <Pause className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />)}
                           {playingId === 'p2' ? 'Pause' : 'Listen'}
                         </Button>
                      </div>
                    ) : <Skeleton className="h-20 w-full" />}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" /> {personas.p3 || <Skeleton className="h-4 w-[250px]" />}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="prose prose-sm dark:prose-invert max-w-none">
                     {explanation3 ? (
                      <div className="space-y-2">
                        <p className="text-muted-foreground">{explanation3}</p>
                         <Button variant="outline" size="sm" onClick={() => handlePlayAudio(explanation3, 'p3')} disabled={loadingAudioId === 'p3'}>
                           {loadingAudioId === 'p3' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (playingId === 'p3' ? <Pause className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />)}
                           {playingId === 'p3' ? 'Pause' : 'Listen'}
                         </Button>
                      </div>
                    ) : <Skeleton className="h-20 w-full" />}
                  </AccordionContent>
                </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}
      <audio ref={audioRef} src={audioSrc} onEnded={() => setPlayingId(null)} />
    </div>
  );
}
