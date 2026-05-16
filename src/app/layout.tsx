import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import AppProviders from "@/providers/app-providers";
import { getAuthSnapshot } from "@/features/auth/profile";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"]
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"]
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"]
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
        className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <AppProviders initialAuthState={authSnapshot}>{children}</AppProviders>
      </body>
    </html>
  );
}
