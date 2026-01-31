import Balancer from "react-wrap-balancer";
import { MultiPersonaForm } from "./form";

export default function MultiPersonaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
          <Balancer>Multi-Persona Explanation</Balancer>
        </h1>
        <p className="text-muted-foreground">
          Get a comprehensive explanation on any topic from multiple AI perspectives. Each persona builds on the last to give you a deep and rounded understanding.
        </p>
      </div>
      <MultiPersonaForm />
    </div>
  );
}
