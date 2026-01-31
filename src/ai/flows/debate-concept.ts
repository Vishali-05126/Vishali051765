'use server';
/**
 * @fileOverview Orchestrates a collaborative explanation between multiple AI personas on a given concept.
 *
 * - debateConcept - A function that handles the explanation generation.
 * - DebateInput - The input type for the debateConcept function.
 * - DebateOutput - The return type for the debateConcept function.
 * - DebateTurn - The type for a single turn in the explanation.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DebateInputSchema = z.object({
  concept: z.string().describe('The concept to be explained.'),
  personas: z
    .array(z.string())
    .min(2)
    .max(3)
    .describe('An array of 2 or 3 personas for the explanation.'),
});
export type DebateInput = z.infer<typeof DebateInputSchema>;

const DebateTurnSchema = z.object({
  persona: z.string().describe('The persona speaking.'),
  text: z.string().describe('The content of the speech.'),
});
export type DebateTurn = z.infer<typeof DebateTurnSchema>;

const DebateOutputSchema = z.array(DebateTurnSchema);
export type DebateOutput = z.infer<typeof DebateOutputSchema>;

export async function debateConcept(input: DebateInput): Promise<DebateOutput> {
  return debateConceptFlow(input);
}

const debatePrompt = ai.definePrompt({
  name: 'debatePrompt',
  input: {schema: DebateInputSchema},
  output: {schema: DebateOutputSchema},
  prompt: `You are a scriptwriter and educator. Your task is to write a detailed and comprehensive explanation of the concept '{{{concept}}}' from the perspective of several AI personas.

The personas are:
{{#each personas}}- {{{this}}}
{{/each}}

The output should be a script where each persona takes a turn to explain a facet of the concept. The second persona should build on what the first said, and the third should build on the previous two, creating a single, cohesive, and thorough explanation.

Instead of a short debate, the goal is a collaborative and deep explanation. Each persona's turn should be substantial, providing rich detail and clarity.

Present the output as a JSON array of objects, where each object has a "persona" and "text" key.
`,
});

const debateConceptFlow = ai.defineFlow(
  {
    name: 'debateConceptFlow',
    inputSchema: DebateInputSchema,
    outputSchema: DebateOutputSchema,
  },
  async input => {
    const {output} = await debatePrompt(input);
    if (!output) {
      return input.personas.map(p => ({
        persona: p,
        text: 'I am unable to participate in the explanation right now.',
      }));
    }
    return output;
  }
);
