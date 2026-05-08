import Navbar from "@/app/components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head></head>
      <body className="antialiased min-h-screen">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
