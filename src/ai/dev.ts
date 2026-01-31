'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/identify-and-intervene-on-learning-anti-patterns.ts';
import '@/ai/flows/debate-concept.ts';
import '@/ai/flows/simulate-failure-scenario.ts';
import '@/ai/flows/predict-knowledge-gaps-and-suggest-learning.ts';
import '@/ai/flows/reverse-teach-concept-to-ai.ts';
import '@/ai/flows/text-to-speech.ts';
