import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { CSPostHogProvider } from "./providers";

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
      <head>
        <meta
          name="google-site-verification"
          content="HxgbvuU59VL-ZhlG7j4BzaZ1y9yjo72kRWlgxuL87AA"
        />
      </head>
      <CSPostHogProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </CSPostHogProvider>
    </html>
  );
}
