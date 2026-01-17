import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

/**
 * Brand Typography
 * Per Constitution v1.0.0 - Principle III: Luxury Brand Standards
 */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Premium Coffee - Coffee for People Who Refuse Average Mornings",
  description: "Obsessively sourced, meticulously roasted. Elite coffee for high-performers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
