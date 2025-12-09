import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import { TransitionProvider } from "./context/TransitionContext";
import TransitionOverlay from "./components/TransitionOverlay";

export const metadata: Metadata = {
  title: "Hall XIII - Sportschool met diverse expertises",
  description: "Een sportschool met diverse expertises waar jij je kunt uitleven",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <SmoothScroll />
        <TransitionProvider>
          <Suspense fallback={null}>
            <TransitionOverlay />
          </Suspense>
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
