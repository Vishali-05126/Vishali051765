"use server";

import {
  identifyAndInterveneOnLearningAntiPatterns,
  type IdentifyAndInterveneOnLearningAntiPatternsInput,
} from "@/ai/flows/identify-and-intervene-on-learning-anti-patterns";
import {
  explainConceptFromMultipleAngles,
  type ExplainConceptFromMultipleAnglesInput,
} from "@/ai/flows/explain-concept-from-multiple-angles";
import {
  simulateFailureScenario,
  type SimulateFailureScenarioInput,
} from "@/ai/flows/simulate-failure-scenario";
import {
  predictKnowledgeGapsAndSuggestLearning,
  type PredictKnowledgeGapsAndSuggestLearningInput,
} from "@/ai/flows/predict-knowledge-gaps-and-suggest-learning";
import {
  reverseTeachConceptToAI,
  type ReverseTeachConceptToAIInput,
} from "@/ai/flows/reverse-teach-concept-to-ai";
import { z } from "zod";
import { experimental_streamText } from "ai";

export async function identifyAntiPatternsAction(
  input: IdentifyAndInterveneOnLearningAntiPatternsInput
) {
  return await identifyAndInterveneOnLearningAntiPatterns(input);
}

export async function explainConceptAction(
  input: ExplainConceptFromMultipleAnglesInput
) {
  return await explainConceptFromMultipleAngles(input);
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
