'use server';
/**
 * @fileOverview Orchestrates a debate between multiple AI personas on a given concept.
 *
 * - debateConcept - A function that handles the debate generation.
 * - DebateInput - The input type for the debateConcept function.
 * - DebateOutput - The return type for the debateConcept function.
 * - DebateTurn - The type for a single turn in the debate.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const DebateInputSchema = z.object({
  concept: z.string().describe('The concept to be debated.'),
  personas: z
    .array(z.string())
    .min(2)
    .max(3)
    .describe('An array of 2 or 3 personas for the debate.'),
});
export type DebateInput = z.infer<typeof DebateInputSchema>;

export const DebateTurnSchema = z.object({
  persona: z.string().describe('The persona speaking.'),
  text: z.string().describe('The content of the speech.'),
});
export type DebateTurn = z.infer<typeof DebateTurnSchema>;

export const DebateOutputSchema = z.array(DebateTurnSchema);
export type DebateOutput = z.infer<typeof DebateOutputSchema>;

export async function debateConcept(input: DebateInput): Promise<DebateOutput> {
  return debateConceptFlow(input);
}

const debatePrompt = ai.definePrompt({
  name: 'debatePrompt',
  input: {schema: DebateInputSchema},
  output: {schema: DebateOutputSchema},
  prompt: `You are a scriptwriter. Your task is to write a short, engaging debate about the concept of '{{{concept}}}' between the following personas:
{{#each personas}}- {{{this}}}
{{/each}}

The debate should have one turn for each persona. The second persona should respond to the first, and the third should respond to the previous two.
Make each explanation concise (2-3 sentences).
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
        text: 'I am unable to participate in the debate right now.',
      }));
    }
    return output;
  }
);
