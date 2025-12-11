import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

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
        <link rel="preload" href="/fonts/SCHABO-Condensed.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
