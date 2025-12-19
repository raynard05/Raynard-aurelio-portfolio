import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/app/component/Navbar";
import Preloader from "@/app/component/Preloader";
import { JetBrains_Mono } from "next/font/google";
import Script from "next/script";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My modern portfolio website",
};

export const viewport: Viewport = {
  themeColor: "#FFD000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-black text-white ${jetbrains.variable}`}>
        {/* Inject theme-color meta tag */}
        <Script
          id="theme-color-meta"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var meta = document.createElement('meta');
                meta.name = 'theme-color';
                meta.content = '#FFD000';
                document.head.appendChild(meta);
              })();
            `,
          }}
        />

        <Preloader />
        {/* Navbar selalu tampil */}
        <Navbar />

        {/* Konten halaman */}
        <main className="pt-5">
          {children}
          <script
            type="module"
            src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
          ></script>
        </main>
      </body>
    </html>
  );
}
