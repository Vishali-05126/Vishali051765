import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { GenkitProvider } from "@/components/genkit-provider";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Balancer as ProivderBalancer } from "react-wrap-balancer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-code",
});

export const metadata: Metadata = {
  title: "Synergistic Learning Accelerator",
  description: "An AI-powered platform to revolutionize your learning process.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          inter.variable,
          sourceCodePro.variable
        )}
      >
        <ProivderBalancer>
          <GenkitProvider>
            {children}
            <Toaster />
          </GenkitProvider>
        </ProivderBalancer>
      </body>
    </html>
  );
}
