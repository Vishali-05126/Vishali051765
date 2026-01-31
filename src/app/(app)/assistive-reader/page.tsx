import Balancer from "react-wrap-balancer";
import { AssistiveReaderForm } from "./form";

export default function AssistiveReaderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
          <Balancer>Assistive Reader Tools</Balancer>
        </h1>
        <p className="text-muted-foreground">
          Summarize, translate, and listen to any text with advanced AI tools.
        </p>
      </div>
      <AssistiveReaderForm />
    </div>
  );
}
