import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/component/Navbar";
import Preloader from "@/app/component/Preloader";
import { JetBrains_Mono } from "next/font/google";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My modern portfolio website",

  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFD000" },
    { media: "(prefers-color-scheme: dark)", color: "#FFD000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-black text-white ${jetbrains.variable}`}>
        <Preloader />
        <Navbar />
        <main className="pt-5">{children}</main>
      </body>
    </html>
  );
}
