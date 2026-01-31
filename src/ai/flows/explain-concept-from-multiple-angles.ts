'use server';
/**
 * @fileOverview Explains a concept from a given persona's perspective.
 *
 * - explainConcept - A function that explains a concept from a single angle.
 * - ExplainConceptInput - The input type for the explainConcept function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const ExplainConceptInputSchema = z.object({
  concept: z.string().describe('The concept to explain.'),
  persona: z.string().describe('The AI persona to explain the concept from.'),
});
export type ExplainConceptInput = z.infer<typeof ExplainConceptInputSchema>;

export async function explainConcept(
  input: ExplainConceptInput
): Promise<string> {
  return explainConceptFlow(input);
}

const explainConceptFlow = ai.defineFlow(
  {
    name: 'explainConceptFlow',
    inputSchema: ExplainConceptInputSchema,
    outputSchema: z.string(),
  },
  async input => {
    const res = await ai.generate({
      prompt: `Explain the concept of '${input.concept}' from the perspective of ${input.persona}. Keep your explanation to a maximum of 3 sentences.`,
    });
    return res.text;
  }
);
