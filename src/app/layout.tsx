import type { Metadata } from "next";
import { Inter, Space_Grotesk, Cinzel_Decorative } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Khemet Voice | Sovereign Intelligence",
  description: "Enterprise voice agent platform by Khemet.ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${cinzelDecorative.variable} dark`}>
      <body className="antialiased font-sans text-text-primary bg-obsidian selection:bg-primary/30 min-h-screen">
        {children}
      </body>
    </html>
  );
}
