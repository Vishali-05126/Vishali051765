
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Loader2, Puzzle, Sparkles, Users } from "lucide-react";
import type { ExplainConceptFromMultipleAnglesOutput } from "@/ai/flows/explain-concept-from-multiple-angles";
import { explainConceptAction } from "@/lib/actions";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  concept: z.string().min(3, "Concept must be at least 3 characters."),
  persona1: z.string().min(3, "Persona 1 must be at least 3 characters."),
  persona2: z.string().min(3, "Persona 2 must be at least 3 characters."),
  persona3: z.string().min(3, "Persona 3 must be at least 3 characters."),
});

export function MultiPersonaForm() {
  const [result, setResult] = useState<ExplainConceptFromMultipleAnglesOutput | null>(null);
  const [personas, setPersonas] = useState({ p1: '', p2: '', p3: '' });
  const [isLoading, setIsLoading] = useState(false);

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
    setResult(null);
    setPersonas({ p1: values.persona1, p2: values.persona2, p3: values.persona3 });
    try {
      const res = await explainConceptAction(values);
      setResult(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

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
      
      {(isLoading || result) && (
        <Card>
          <CardHeader>
            <CardTitle>The Ensemble's Explanations</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                    <AccordionItem value="item-1">
                      <AccordionTrigger><Skeleton className="h-4 w-1/3" /></AccordionTrigger>
                      <AccordionContent><Skeleton className="h-20 w-full" /></AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger><Skeleton className="h-4 w-1/2" /></AccordionTrigger>
                      <AccordionContent><Skeleton className="h-20 w-full" /></AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger><Skeleton className="h-4 w-2/5" /></AccordionTrigger>
                      <AccordionContent><Skeleton className="h-20 w-full" /></AccordionContent>
                    </AccordionItem>
                </Accordion>
            ) : result && (
              <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" /> {personas.p1}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="text-muted-foreground">{result.explanation1}</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" /> {personas.p2}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="prose prose-sm dark:prose-invert max-w-none">
                     <p className="text-muted-foreground">{result.explanation2}</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" /> {personas.p3}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="prose prose-sm dark:prose-invert max-w-none">
                     <p className="text-muted-foreground">{result.explanation3}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
