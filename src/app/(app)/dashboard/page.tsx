import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { navItems } from "@/config/nav";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

export default function DashboardPage() {
  const features = navItems.filter((item) => item.href !== "/dashboard");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
          <Balancer>Welcome to Your Synergistic Learning Accelerator</Balancer>
        </h1>
        <p className="text-muted-foreground">
          Explore the tools below to revolutionize your learning process.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Link href={feature.href} key={feature.href}>
            <Card className="h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="flex flex-row items-center gap-4">
                <feature.icon className="h-8 w-8 text-primary" />
                <div className="grid gap-1">
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Explore the {feature.title.toLowerCase()} module.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
