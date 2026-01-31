import Balancer from "react-wrap-balancer";
import { AntiPatternsForm } from "./form";

export default function AntiPatternsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
          <Balancer>Hyper-Personalized Anti-Patterns</Balancer>
        </h1>
        <p className="text-muted-foreground">
          Let our AI identify your specific bad learning habits and provide personalized interventions.
        </p>
      </div>
      <AntiPatternsForm />
    </div>
  );
}
