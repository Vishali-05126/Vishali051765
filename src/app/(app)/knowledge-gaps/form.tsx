
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Loader2, Sparkles } from "lucide-react";
import type { PredictKnowledgeGapsAndSuggestLearningOutput } from "@/ai/flows/predict-knowledge-gaps-and-suggest-learning";
import { predictGapsAction } from "@/lib/actions";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  careerGoal: z.string().min(3, "Career goal must be at least 3 characters."),
  currentSkills: z.string().min(3, "Please list at least one skill."),
});

export function KnowledgeGapsForm() {
  const [result, setResult] = useState<PredictKnowledgeGapsAndSuggestLearningOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      careerGoal: "",
      currentSkills: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await predictGapsAction({
        ...values,
        currentSkills: values.currentSkills.split(',').map(s => s.trim()),
      });
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
          <CardTitle>Chart Your Learning Path</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="careerGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Career Goal</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Senior Frontend Developer'" {...field} />
                    </FormControl>
                    <FormDescription>
                      What is your dream job or career path?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentSkills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Skills</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'React, TypeScript, Node.js'" {...field} />
                    </FormControl>
                    <FormDescription>
                      A comma-separated list of your skills.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Predicting...
                  </>
                ) : (
                  <>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Predict Knowledge Gaps
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
            <CardTitle>Your Learning Roadmap</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Predicted Knowledge Gaps</h3>
              <div className="flex flex-wrap gap-2">
                {result.predictedGaps.map((gap, index) => (
                  <Badge key={index} variant="secondary">{gap}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Suggested Learning Resources</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {result.suggestedResources.map((resource, index) => (
                  <li key={index}>{resource}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
