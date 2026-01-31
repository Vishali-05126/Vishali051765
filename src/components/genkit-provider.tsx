'use client';
import {GenkitProvider as Provider} from '@genkit-ai/next/client';

export function GenkitProvider({children}: {children: React.ReactNode}) {
  return <Provider>{children}</Provider>;
}
