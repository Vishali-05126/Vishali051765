'use server';

/**
 * @fileOverview Failure simulation playground AI agent.
 *
 * - simulateFailureScenario - A function that simulates failure scenarios and provides analysis.
 * - SimulateFailureScenarioInput - The input type for the simulateFailureScenario function.
 * - SimulateFailureScenarioOutput - The return type for the simulateFailureScenario function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulateFailureScenarioInputSchema = z.object({
  topic: z.string().describe('The topic for which to simulate a failure scenario.'),
  userSkills: z.array(z.string()).describe('The skills of the user.'),
  failureContext: z.string().describe('The context or situation in which the failure might occur.'),
});
export type SimulateFailureScenarioInput = z.infer<typeof SimulateFailureScenarioInputSchema>;

const SimulateFailureScenarioOutputSchema = z.object({
  scenarioDescription: z.string().describe('A detailed description of the failure scenario.'),
  failureAnalysis: z.string().describe('An analysis of the potential reasons for failure.'),
  learningRecommendations: z.string().describe('Recommendations for the user to avoid similar failures in the future.'),
});
export type SimulateFailureScenarioOutput = z.infer<typeof SimulateFailureScenarioOutputSchema>;

export async function simulateFailureScenario(input: SimulateFailureScenarioInput): Promise<SimulateFailureScenarioOutput> {
  return simulateFailureScenarioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simulateFailureScenarioPrompt',
  input: {schema: SimulateFailureScenarioInputSchema},
  output: {schema: SimulateFailureScenarioOutputSchema},
  prompt: `You are an AI that creates failure scenarios for students to learn from.

  Given the topic, user's skills, and a specific context, simulate a realistic failure scenario. Analyze why the failure occurred and suggest learning recommendations.

  Topic: {{{topic}}}
  User Skills: {{#if userSkills}}{{#each userSkills}}- {{{this}}}{{/each}}{{else}}None{{/if}}
  Failure Context: {{{failureContext}}}

  Scenario Description:
  Failure Analysis:
  Learning Recommendations:`,
});

const simulateFailureScenarioFlow = ai.defineFlow(
  {
    name: 'simulateFailureScenarioFlow',
    inputSchema: SimulateFailureScenarioInputSchema,
    outputSchema: SimulateFailureScenarioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
