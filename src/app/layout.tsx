import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

// Lokal fonts setup
const inter = localFont({
  src: "../../public/fonts/Inter-Regular.ttf", // Jodi Inter font thake
  variable: "--font-inter",
  display: "swap",
});

const hindSiliguri = localFont({
  src: [
    { path: "../../public/fonts/HindSiliguri-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/HindSiliguri-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/HindSiliguri-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/HindSiliguri-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-hind",
  display: "swap",
});

const notoBengali = localFont({
  src: [
    { path: "../../public/fonts/NotoSansBengali-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/NotoSansBengali-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/NotoSansBengali-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/NotoSansBengali-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/NotoSansBengali-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-anek", // globals.css e change na korte ei name same rakhlam
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
  keywords: ["Abacus", "Abacus classes Bangladesh", "online Abacus course", "mental math", "kids math", "soroban", "Abacus training", "AbacusUp"],
  authors: [{ name: "AbacusUp" }],
  creator: "AbacusUp",
  publisher: "AbacusUp",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abacusup-iota.vercel.app",
    siteName: "AbacusUp",
    title: "AbacusUp — Learn Abacus Online in Bangladesh",
    description: "Master mental math with Bangladesh's #1 online Abacus platform. Live classes, interactive practice, and certificates.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AbacusUp — Learn Abacus Online",
    description: "Bangladesh's #1 online Abacus platform. Live classes, interactive practice, certificates.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: { icon: "/favicon.ico" },
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