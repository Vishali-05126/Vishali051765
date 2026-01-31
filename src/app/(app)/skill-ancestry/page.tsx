'use client';

import Balancer from "react-wrap-balancer";
import { SkillTree } from "./skill-tree";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SkillAncestryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
          <Balancer>Skill Ancestry Display</Balancer>
        </h1>
        <p className="text-muted-foreground">
          Visualize the evolutionary path of your skills. Our system can translate visual concepts into audio and tactile representations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Knowledge Domains</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="programming" className="w-full">
            <TabsList>
              <TabsTrigger value="programming">Programming</TabsTrigger>
              <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
            </TabsList>
            <TabsContent value="programming" className="mt-4">
              <SkillTree domain="Programming" />
            </TabsContent>
            <TabsContent value="mathematics" className="mt-4">
              <SkillTree domain="Mathematics" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
