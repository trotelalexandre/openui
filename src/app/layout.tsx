import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/providers/theme-provider";
import { getSupabaseAuth } from "@/lib/supabase/server";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenUI",
  description:
    "OpenUI is an open registry for sharing and downloading React-based UI components.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = await getSupabaseAuth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader showSpinner={false} />
          <Navbar isAuthenticated={isAuthenticated} />

          {children}

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
