import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://why.yuvrajkashyap.com"),
  title: "Why - Yuvraj Kashyap",
  description:
    "A premium personal manifesto page that keeps ambition and consequence impossible to ignore.",
  applicationName: "Why - Yuvraj Kashyap",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Why - Yuvraj Kashyap",
    description:
      "A premium personal manifesto page that keeps ambition and consequence impossible to ignore.",
    siteName: "Why - Yuvraj Kashyap",
    type: "website",
    url: "https://why.yuvrajkashyap.com",
  },
  twitter: {
    card: "summary",
    title: "Why - Yuvraj Kashyap",
    description:
      "A premium personal manifesto page that keeps ambition and consequence impossible to ignore.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${cormorant.variable} bg-background text-foreground antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
