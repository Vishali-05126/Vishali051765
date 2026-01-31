import Balancer from "react-wrap-balancer";
import { FailureSimulationForm } from "./form";

export default function FailureSimulationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
          <Balancer>Failure Simulation Playground</Balancer>
        </h1>
        <p className="text-muted-foreground">
          Learn from mistakes in a safe environment. Our AI creates realistic scenarios for you to experiment and grow.
        </p>
      </div>
      <FailureSimulationForm />
    </div>
  );
}
