import Balancer from "react-wrap-balancer";
import { KnowledgeGapsForm } from "./form";

export default function KnowledgeGapsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
          <Balancer>Predictive Knowledge Gaps</Balancer>
        </h1>
        <p className="text-muted-foreground">
          Proactively prevent falling behind. Compare your current knowledge against your dream job requirements and get a roadmap to success.
        </p>
      </div>
      <KnowledgeGapsForm />
    </div>
  );
}
