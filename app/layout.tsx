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
  title: "E. Ndeze Bonheur",
  description: "Backend Developer & Network Engineer Portfolio",
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet" />
        <a rel="me" href="https://mastodon.social/@bendeze">Mastodon</a>
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#030303] text-foreground font-sans antialiased overflow-x-hidden"
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
