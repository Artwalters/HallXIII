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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Edu+NSW+ACT+Cursive:wght@400..700&family=Gloria+Hallelujah&family=Gochi+Hand&family=Handlee&family=Reenie+Beanie&family=Shadows+Into+Light&display=swap" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/InertiaPlugin.min.js" defer></script>
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
