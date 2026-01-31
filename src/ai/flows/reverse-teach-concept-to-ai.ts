'use server';
/**
 * @fileOverview Implements the Reverse Teaching Protocol where the AI learns from the student.
 *
 * - reverseTeachConceptToAI - A function that handles the reverse teaching process.
 * - ReverseTeachConceptToAIInput - The input type for the reverseTeachConceptToAI function.
 * - ReverseTeachConceptToAIOutput - The return type for the reverseTeachConceptToAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReverseTeachConceptToAIInputSchema = z.object({
  concept: z.string().describe('The concept that the student will attempt to teach the AI.'),
  studentExplanation: z.string().describe('The student explanation of the concept.'),
});
export type ReverseTeachConceptToAIInput = z.infer<typeof ReverseTeachConceptToAIInputSchema>;

const ReverseTeachConceptToAIOutputSchema = z.object({
  aiUnderstanding: z.string().describe('The AI assessment of its understanding of the concept.'),
  questionsForStudent: z.string().describe('Questions for the student to help refine their understanding.'),
  identifiedGaps: z.string().describe('The AI identified gaps in the student explanation.'),
});
export type ReverseTeachConceptToAIOutput = z.infer<typeof ReverseTeachConceptToAIOutputSchema>;

export async function reverseTeachConceptToAI(input: ReverseTeachConceptToAIInput): Promise<ReverseTeachConceptToAIOutput> {
  return reverseTeachConceptToAIFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reverseTeachConceptToAIPrompt',
  input: {schema: ReverseTeachConceptToAIInputSchema},
  output: {schema: ReverseTeachConceptToAIOutputSchema},
  prompt: `You are an AI that is being taught a concept by a student. Your goal is to learn the concept, identify any gaps in the student's explanation, and ask the student questions to refine their understanding.

Concept: {{{concept}}}

Student Explanation: {{{studentExplanation}}}

Based on the above, please provide the following:

1.  Your assessment of your understanding of the concept.
2.  Questions for the student to help refine their understanding.
3.  Identified gaps in the student's explanation.

Make sure to format the output as described in the output schema.`,}
);

const reverseTeachConceptToAIFlow = ai.defineFlow(
  {
    name: 'reverseTeachConceptToAIFlow',
    inputSchema: ReverseTeachConceptToAIInputSchema,
    outputSchema: ReverseTeachConceptToAIOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
