import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LAMBORGHINI REVUELTO — The V12 Hybrid Revolution",
  description:
    "Experience the Lamborghini Revuelto — a 1,015 HP V12 hybrid super sports car. Explore its carbon fiber monocoque, tri-motor hybrid system, and scissor door design in this immersive scrollytelling showcase.",
  keywords: [
    "Lamborghini",
    "Revuelto",
    "V12",
    "Hybrid",
    "Supercar",
    "Luxury",
    "Italian",
  ],
  openGraph: {
    title: "LAMBORGHINI REVUELTO",
    description: "The V12 Hybrid Super Sports Car — Starting at Nu. 1,500,000",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${rajdhani.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
