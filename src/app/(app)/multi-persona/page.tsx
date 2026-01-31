import Balancer from "react-wrap-balancer";
import { MultiPersonaForm } from "./form";

export default function MultiPersonaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
          <Balancer>Multi-Persona Learning Ensemble</Balancer>
        </h1>
        <p className="text-muted-foreground">
          Understand concepts from radically different angles. Let multiple AI personalities debate and explain ideas to you.
        </p>
      </div>
      <MultiPersonaForm />
    </div>
  );
}
