import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#15803d",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SuperVerde | Supermercado & Delivery Online de Alta Performance",
  description:
    "Template moderno de e-commerce e vitrine para Supermercados de Pequeno, Médio e Grande Porte. Hortifrúti fresco, Açougue, Padaria, Mercearia, Catálogo Inteligente, Tabloide Digital e PWA.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SuperVerde",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
