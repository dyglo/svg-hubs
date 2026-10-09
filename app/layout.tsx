import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "SVG Hubs — Characters with a little character",
  description:
    "Twelve expressive SVG agent avatars. Customize, preview and copy into your app.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
