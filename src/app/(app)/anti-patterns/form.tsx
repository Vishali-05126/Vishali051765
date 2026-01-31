
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import type { IdentifyAndInterveneOnLearningAntiPatternsOutput } from "@/ai/flows/identify-and-intervene-on-learning-anti-patterns";
import { identifyAntiPatternsAction } from "@/lib/actions";

const formSchema = z.object({
  learningHistory: z.string().min(20, "Please provide more details about your learning history."),
  currentActivity: z.string().min(10, "Please describe your current activity in more detail."),
});

export function AntiPatternsForm() {
  const [result, setResult] = useState<IdentifyAndInterveneOnLearningAntiPatternsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      learningHistory: "",
      currentActivity: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await identifyAntiPatternsAction(values);
      setResult(res);
    } catch (error) {
      console.error(error);
      // You could use a toast notification here to show the error
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle>Analyze Your Learning Patterns</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="learningHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Learning History</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Spent 3 hours on calculus, got stuck on derivatives. Watched 2 videos but still confused. Then switched to history for an hour...'"
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe your recent learning sessions. What did you study? What was difficult?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentActivity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Activity</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Trying to understand recursion in Python. I've read the definition but I'm struggling with the base case.'"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What are you trying to learn right now?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Identify Anti-Patterns
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
            <CardTitle>Analysis in Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-1/3 animate-pulse"></div>
                <div className="h-10 bg-muted rounded w-full animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-1/3 animate-pulse"></div>
                <div className="h-10 bg-muted rounded w-full animate-pulse"></div>
              </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Identified Anti-Patterns</h3>
              <ul className="list-disc list-inside space-y-1">
                {result.antiPatterns.map((pattern, index) => (
                  <li key={index}>{pattern}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Suggested Intervention</h3>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-semibold">{result.intervention.type}</p>
                <p className="text-muted-foreground">{result.intervention.message}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
