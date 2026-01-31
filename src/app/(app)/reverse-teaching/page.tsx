import Balancer from "react-wrap-balancer";
import { ReverseTeachingForm } from "./form";

export default function ReverseTeachingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
          <Balancer>Reverse Teaching Protocol</Balancer>
        </h1>
        <p className="text-muted-foreground">
          Solidify your understanding by teaching a concept to our AI. It will ask questions and point out gaps in your explanation.
        </p>
      </div>
      <ReverseTeachingForm />
    </div>
  );
}
