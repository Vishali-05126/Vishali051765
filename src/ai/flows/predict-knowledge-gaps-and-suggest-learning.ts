'use server';

/**
 * @fileOverview Predicts future knowledge gaps based on career goals and suggests learning resources.
 *
 * - predictKnowledgeGapsAndSuggestLearning - A function that predicts knowledge gaps and suggests learning resources.
 * - PredictKnowledgeGapsAndSuggestLearningInput - The input type for the predictKnowledgeGapsAndSuggestLearning function.
 * - PredictKnowledgeGapsAndSuggestLearningOutput - The return type for the predictKnowledgeGapsAndSuggestLearning function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictKnowledgeGapsAndSuggestLearningInputSchema = z.object({
  careerGoal: z
    .string()
    .describe('The student\'s desired career path or job role.'),
  currentSkills: z
    .array(z.string())
    .describe('A list of the student\'s current skills and knowledge.'),
  learningPreferences: z
    .string()
    .optional()
    .describe('Optional: The student\'s preferred learning methods.'),
});
export type PredictKnowledgeGapsAndSuggestLearningInput = z.infer<
  typeof PredictKnowledgeGapsAndSuggestLearningInputSchema
>;

const PredictKnowledgeGapsAndSuggestLearningOutputSchema = z.object({
  predictedGaps: z
    .array(z.string())
    .describe(
      'A list of predicted knowledge gaps required for the specified career goal.'
    ),
  suggestedResources: z
    .array(z.string())
    .describe(
      'A list of suggested learning resources to address the predicted knowledge gaps.'
    ),
});
export type PredictKnowledgeGapsAndSuggestLearningOutput = z.infer<
  typeof PredictKnowledgeGapsAndSuggestLearningOutputSchema
>;

export async function predictKnowledgeGapsAndSuggestLearning(
  input: PredictKnowledgeGapsAndSuggestLearningInput
): Promise<PredictKnowledgeGapsAndSuggestLearningOutput> {
  return predictKnowledgeGapsAndSuggestLearningFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictKnowledgeGapsAndSuggestLearningPrompt',
  input: {
    schema: PredictKnowledgeGapsAndSuggestLearningInputSchema,
  },
  output: {
    schema: PredictKnowledgeGapsAndSuggestLearningOutputSchema,
  },
  prompt: `You are a career advisor bot who can identify knowledge gaps and find resources for a student.

Given the student's career goal of {{{careerGoal}}} and their current skills of {{{currentSkills}}},
you will identify any knowledge gaps the student needs to fill in order to achieve their goal.

Suggest resources to fill these knowledge gaps.

Output a JSON object with two keys:
predictedGaps: A list of knowledge gaps
suggestedResources: A list of suggested learning resources.

Remember to take into account that the student prefers to learn by {{{learningPreferences}}}`,
});

const predictKnowledgeGapsAndSuggestLearningFlow = ai.defineFlow(
  {
    name: 'predictKnowledgeGapsAndSuggestLearningFlow',
    inputSchema: PredictKnowledgeGapsAndSuggestLearningInputSchema,
    outputSchema: PredictKnowledgeGapsAndSuggestLearningOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
