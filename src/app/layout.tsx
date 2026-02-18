import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { NetworkBackground } from "@/components/Backgrounds/NetworkBackground";  // Import it

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Giuseppe Testa | Developer",
  description: "Full-stack developer & Data Analyst",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} relative min-h-screen bg-black`}>
        <NetworkBackground />  {/* Add it here */}
        <div className="relative z-10">  {/* Wrap content to keep it above canvas */}
          <Navbar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}