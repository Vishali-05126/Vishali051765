import Balancer from "react-wrap-balancer";
import { MultiPersonaForm } from "./form";

export default function MultiPersonaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
          <Balancer>Multi-Persona Debate</Balancer>
        </h1>
        <p className="text-muted-foreground">
          Perfect for audio learning. Hear different perspectives on any topic from multiple AI personas in a conversational debate you can listen to.
        </p>
      </div>
      <MultiPersonaForm />
    </div>
  );
}
