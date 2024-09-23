import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

const metaData = {
  title: "Pegas Chile",
  description: "Más de 1400 publicaciones de trabajos de software en Chile.",
  url: "https://pegas-chile.vercel.app",
  imageUrl: "https://pegas-chile.vercel.app/banner.png",
};

export const metadata: Metadata = {
  title: metaData.title,
  description: metaData.description,
  openGraph: {
    title: metaData.title,
    description: metaData.description,
    images: [
      {
        url: metaData.imageUrl,
        alt: "Pegas Chile Banner",
      },
    ],
    url: metaData.url,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: metaData.title,
    description: metaData.description,
    images: [metaData.imageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
