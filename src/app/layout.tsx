import type { Metadata, Viewport } from "next";
import { Inter, Hind_Siliguri, Noto_Sans_Bengali } from "next/font/google"; // Anek_Bangla bad diye Noto_Sans_Bengali
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-anek", // CSS variable name same rakhlam jate globals.css e change na korte hoy
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abacusup-iota.vercel.app"),
  title: {
    default: "AbacusUp — Learn Abacus Online in Bangladesh",
    template: "%s | AbacusUp",
  },
  description:
    "Bangladesh's #1 online Abacus learning platform. Live classes, interactive virtual Abacus, and structured Level 1–8 courses for kids and adults.",
  keywords: [
    "Abacus",
    "Abacus classes Bangladesh",
    "online Abacus course",
    "mental math",
    "kids math",
    "soroban",
    "Abacus training",
    "AbacusUp",
  ],
  authors: [{ name: "AbacusUp" }],
  creator: "AbacusUp",
  publisher: "AbacusUp",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abacusup-iota.vercel.app",
    siteName: "AbacusUp",
    title: "AbacusUp — Learn Abacus Online in Bangladesh",
    description:
      "Master mental math with Bangladesh's #1 online Abacus platform. Live classes, interactive practice, and certificates.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AbacusUp — Learn Abacus Online",
    description:
      "Bangladesh's #1 online Abacus platform. Live classes, interactive practice, certificates.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      className={`${inter.variable} ${hindSiliguri.variable} ${notoBengali.variable}`}
    >
      <body className="font-bangla antialiased bg-white text-gray-800">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}