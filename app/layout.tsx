import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/providers/providers";
import { ThemeProvider } from "@/providers/theme-provider";

import { Navbar } from "@/components/shared/navbar/navbar";
import { Footer } from "@/components/shared/footer/footer";  
import { ScrollToTop } from "@/components/shared/scroll-to-top";

import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans" 
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono" 
});

export const metadata: Metadata = {
  title: "E. Ndeze Bonheur",
  description: "Backend Developer & Network Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(inter.variable, jetbrainsMono.variable)}>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <NuqsAdapter>
          <Providers>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Toaster />
              <ScrollToTop />
              <Footer />
            </ThemeProvider>
          </Providers>
        </NuqsAdapter>
        <Analytics />
      </body>
    </html>
  );
}
