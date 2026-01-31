
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
import { Loader2, ShieldAlert, Sparkles } from "lucide-react";
import type { SimulateFailureScenarioOutput } from "@/ai/flows/simulate-failure-scenario";
import { simulateFailureAction } from "@/lib/actions";

const formSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters long."),
  userSkills: z.string().min(3, "Please list at least one skill."),
  failureContext: z.string().min(10, "Context must be at least 10 characters long."),
});

export function FailureSimulationForm() {
  const [result, setResult] = useState<SimulateFailureScenarioOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      userSkills: "",
      failureContext: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await simulateFailureAction({
        ...values,
        userSkills: values.userSkills.split(',').map(s => s.trim()),
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
          <CardTitle>Create a Failure Scenario</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'React State Management'" {...field} />
                    </FormControl>
                    <FormDescription>
                      The subject area for the simulation.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userSkills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Skills</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'JavaScript, HTML, CSS basics'" {...field} />
                    </FormControl>
                    <FormDescription>
                      A comma-separated list of your relevant skills.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="failureContext"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Failure Context</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Building a shopping cart feature for an e-commerce site under a tight deadline.'"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe the situation where a failure might happen.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Simulating...
                  </>
                ) : (
                  <>
                    <ShieldAlert className="mr-2 h-4 w-4" />
                    Simulate Failure
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
            <CardTitle>Simulation in Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-1/3 animate-pulse"></div>
                <div className="h-20 bg-muted rounded w-full animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-1/3 animate-pulse"></div>
                <div className="h-20 bg-muted rounded w-full animate-pulse"></div>
              </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Simulation Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Scenario Description</h3>
              <p className="text-muted-foreground">{result.scenarioDescription}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Failure Analysis</h3>
              <p className="text-muted-foreground">{result.failureAnalysis}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Learning Recommendations</h3>
              <p className="text-muted-foreground">{result.learningRecommendations}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
