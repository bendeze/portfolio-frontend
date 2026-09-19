import type { Metadata } from "next";

import "./globals.css";
import Providers from "@/providers/providers";
import { ThemeProvider } from "@/providers/theme-provider";

import { Navbar } from "@/components/shared/navbar/navbar";
import { Footer } from "@/components/shared/footer/footer";  
import { ScrollToTop } from "@/components/shared/scroll-to-top";

import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "E. Ndeze Bonheur | Backend & Network Engineer",
  description: "Network architecture, BGP routing, eBPF telemetry, and high-performance backend systems publication.",
  icons: {
    icon: "/profile.png",
    shortcut: "/profile.png",
    apple: "/profile.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden selection:bg-[#ebcb00] selection:text-black"
      >
        <NuqsAdapter>
          <Providers>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="w-full mx-auto min-h-screen flex flex-col relative">
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster />
              <ScrollToTop />
            </ThemeProvider>
          </Providers>
        </NuqsAdapter>
        <Analytics />
      </body>
    </html>
  );
}
