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
import { PlaceHolderImages, type ImagePlaceholder } from "@/lib/placeholder-images";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const features = navItems.filter((item) => item.href !== "/dashboard");
  const imagesById = PlaceHolderImages.reduce((acc, img) => {
    acc[img.id] = img;
    return acc;
  }, {} as Record<string, ImagePlaceholder>);

  const heroImage = imagesById['dashboard-hero'];

  return (
    <div className="flex flex-col gap-8">
      <div className="relative rounded-xl overflow-hidden">
        {heroImage && (
            <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative p-8 md:p-12 flex flex-col gap-2 items-start">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-foreground">
              <Balancer>Synergistic Learning Accelerator</Balancer>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Welcome to the Synergistic Learning Accelerator. An AI-powered platform to accelerate learning.
            </p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const image = feature.imageId ? imagesById[feature.imageId] : null;
          return (
            <Link href={feature.href} key={feature.href} className="group">
              <Card className="h-full overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20">
                {image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <feature.icon className="h-6 w-6 text-primary" />
                    <span>{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="flex items-center justify-between">
                    <span>Explore the {feature.title.toLowerCase()} module.</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
