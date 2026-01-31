import { BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 font-headline text-xl font-bold", className)}>
      <BrainCircuit className="h-8 w-8 text-primary" />
      <span>Synergistic Learning Accelerator</span>
    </div>
  );
}
