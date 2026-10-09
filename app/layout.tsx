import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "SVG Hubs — Characters with a little character",
  description:
    "An open canvas of twelve animated SVG characters. Pick a friend and save or copy it, animation included.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
