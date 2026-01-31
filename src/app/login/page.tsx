'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real app, you'd use Firebase Auth here.
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Mock login logic
    setTimeout(() => {
      // For now, we'll just redirect to the dashboard.
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="space-y-4 text-center">
            <Logo className="justify-center" />
            <div className="space-y-1">
                <CardTitle className="text-2xl">Welcome to AxonAI</CardTitle>
                <CardDescription>
                  The accessible learning platform for blind students.
                </CardDescription>
            </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
            </Button>
            <Button variant="outline" className="w-full" type="button" disabled={isLoading}>
              Login with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
