import type { Metadata } from "next";
import { Chivo_Mono, Josefin_Sans, Noto_Sans } from "next/font/google";
import "./globals.css";
import AppProviders from "@/providers/app-providers";
import { getAuthSnapshot } from "@/features/auth/profile";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700"]
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"]
});

const chivoMono = Chivo_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400"]
});

export const metadata: Metadata = {
  title: {
    default: "MissionOS",
    template: "%s · MissionOS"
  },
  description: "Where teams align, execute, and accelerate."
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authSnapshot = await getAuthSnapshot();

  return (
    <html lang="en">
      <body
        className={`${josefinSans.variable} ${notoSans.variable} ${chivoMono.variable} antialiased`}
      >
        <AppProviders initialAuthState={authSnapshot}>{children}</AppProviders>
      </body>
    </html>
  );
}
