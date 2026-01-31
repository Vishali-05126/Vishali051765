'use server';
/**
 * @fileOverview Explains a concept from multiple perspectives using different AI personas.
 *
 * - explainConceptFromMultipleAngles - A function that explains a concept from multiple angles.
 * - ExplainConceptFromMultipleAnglesInput - The input type for the explainConceptFromMultipleAngles function.
 * - ExplainConceptFromMultipleAnglesOutput - The return type for the explainConceptFromMultipleAngles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainConceptFromMultipleAnglesInputSchema = z.object({
  concept: z.string().describe('The concept to explain.'),
  persona1: z.string().describe('The first AI persona to explain the concept from.'),
  persona2: z.string().describe('The second AI persona to explain the concept from.'),
  persona3: z.string().describe('The third AI persona to explain the concept from.'),
});
export type ExplainConceptFromMultipleAnglesInput = z.infer<
  typeof ExplainConceptFromMultipleAnglesInputSchema
>;

const ExplainConceptFromMultipleAnglesOutputSchema = z.object({
  explanation1: z.string().describe('The explanation from the first persona.'),
  explanation2: z.string().describe('The explanation from the second persona.'),
  explanation3: z.string().describe('The explanation from the third persona.'),
});
export type ExplainConceptFromMultipleAnglesOutput = z.infer<
  typeof ExplainConceptFromMultipleAnglesOutputSchema
>;

export async function explainConceptFromMultipleAngles(
  input: ExplainConceptFromMultipleAnglesInput
): Promise<ExplainConceptFromMultipleAnglesOutput> {
  return explainConceptFromMultipleAnglesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainConceptFromMultipleAnglesPrompt',
  input: {schema: ExplainConceptFromMultipleAnglesInputSchema},
  output: {schema: ExplainConceptFromMultipleAnglesOutputSchema},
  prompt: `You are an AI assistant that explains concepts from multiple perspectives.

  Concept: {{{concept}}}

  Explanation from {{{persona1}}}:
  {{explanation1}}

  Explanation from {{{persona2}}}:
  {{explanation2}}

  Explanation from {{{persona3}}}:
  {{explanation3}}`,
});

const explainConceptFromMultipleAnglesFlow = ai.defineFlow(
  {
    name: 'explainConceptFromMultipleAnglesFlow',
    inputSchema: ExplainConceptFromMultipleAnglesInputSchema,
    outputSchema: ExplainConceptFromMultipleAnglesOutputSchema,
  },
  async input => {
    const {output} = await prompt({
      ...input,
      explanation1: await ai.generate({
        prompt: `Explain the concept of ${input.concept} from the perspective of ${input.persona1}.`,
      }).then(r => r.text),
      explanation2: await ai.generate({
        prompt: `Explain the concept of ${input.concept} from the perspective of ${input.persona2}.`,
      }).then(r => r.text),
      explanation3: await ai.generate({
        prompt: `Explain the concept of ${input.concept} from the perspective of ${input.persona3}.`,
      }).then(r => r.text),
    });
    return output!;
  }
);
