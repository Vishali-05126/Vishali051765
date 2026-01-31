
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowRightLeft, Sparkles } from "lucide-react";
import type { ReverseTeachConceptToAIOutput } from "@/ai/flows/reverse-teach-concept-to-ai";
import { reverseTeachAction } from "@/lib/actions";

const formSchema = z.object({
  concept: z.string().min(3, "Concept must be at least 3 characters."),
  studentExplanation: z.string().min(20, "Your explanation needs to be more detailed."),
});

export function ReverseTeachingForm() {
  const [result, setResult] = useState<ReverseTeachConceptToAIOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      concept: "",
      studentExplanation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await reverseTeachAction(values);
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
          <CardTitle>Teach the AI</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="concept"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Concept</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Photosynthesis'" {...field} />
                    </FormControl>
                    <FormDescription>
                      The concept you want to teach the AI.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studentExplanation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Explanation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Explain the concept as if you were teaching a beginner..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The best way to learn is to teach.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Teaching...
                  </>
                ) : (
                  <>
                    <ArrowRightLeft className="mr-2 h-4 w-4" />
                    Submit Explanation
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {isLoading && (
        <Card>
          <CardHeader>
            <CardTitle>AI is Learning...</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-1/3 animate-pulse"></div>
                <div className="h-16 bg-muted rounded w-full animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-1/3 animate-pulse"></div>
                <div className="h-16 bg-muted rounded w-full animate-pulse"></div>
              </div>
          </CardContent>
        </Card>
      )}
      
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>AI's Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">AI's Understanding</h3>
              <p className="text-muted-foreground">{result.aiUnderstanding}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Questions for You</h3>
              <p className="text-muted-foreground">{result.questionsForStudent}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Identified Gaps</h3>
              <p className="text-muted-foreground">{result.identifiedGaps}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
