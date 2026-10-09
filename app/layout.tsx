import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "SVG Hubs — Characters with a little character",
  description:
    "Browse 29 animated SVG characters: Originals, Grok-style bots, Dots and Muse-inspired friends. Save or copy any character with its animation.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
