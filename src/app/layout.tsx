import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Wed | Επιλεγμένα για τη μέρα σας",
  description:
    "Ό,τι ονειρεύεται μια νύφη. Ανακαλύψτε την επιλεγμένη συλλογή νυφικών ειδών, από εντυπωσιακά φορέματα μέχρι τα πιο λεπτά αξεσουάρ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el">
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
