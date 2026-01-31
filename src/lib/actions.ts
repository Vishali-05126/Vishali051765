'use server';

import {
  identifyAndInterveneOnLearningAntiPatterns,
  type IdentifyAndInterveneOnLearningAntiPatternsInput,
} from '@/ai/flows/identify-and-intervene-on-learning-anti-patterns';
import {
  debateConcept,
  type DebateInput,
} from '@/ai/flows/debate-concept';
import {
  simulateFailureScenario,
  type SimulateFailureScenarioInput,
} from '@/ai/flows/simulate-failure-scenario';
import {
  predictKnowledgeGapsAndSuggestLearning,
  type PredictKnowledgeGapsAndSuggestLearningInput,
} from '@/ai/flows/predict-knowledge-gaps-and-suggest-learning';
import {
  reverseTeachConceptToAI,
  type ReverseTeachConceptToAIInput,
} from '@/ai/flows/reverse-teach-concept-to-ai';
import { textToSpeech, type TextToSpeechInput } from '@/ai/flows/text-to-speech';
import { summarizeText, type SummarizeTextInput } from '@/ai/flows/summarize-text';
import { translateText, type TranslateTextInput } from '@/ai/flows/translate-text';

export async function identifyAntiPatternsAction(
  input: IdentifyAndInterveneOnLearningAntiPatternsInput
) {
  return await identifyAndInterveneOnLearningAntiPatterns(input);
}

export async function debateConceptAction(input: DebateInput) {
  return await debateConcept(input);
}

export async function simulateFailureAction(
  input: SimulateFailureScenarioInput
) {
  return await simulateFailureScenario(input);
}

export async function predictGapsAction(
  input: PredictKnowledgeGapsAndSuggestLearningInput
) {
  return await predictKnowledgeGapsAndSuggestLearning(input);
}

export async function reverseTeachAction(input: ReverseTeachConceptToAIInput) {
  return await reverseTeachConceptToAI(input);
}

export async function textToSpeechAction(input: TextToSpeechInput) {
  return await textToSpeech(input);
}

export async function summarizeTextAction(input: SummarizeTextInput) {
  return await summarizeText(input);
}

export async function translateTextAction(input: TranslateTextInput) {
  return await translateText(input);
}
