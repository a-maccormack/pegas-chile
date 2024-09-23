import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

import Head from "next/head";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <>
        <Head>
          {/* Browser */}
          <title>{metaData.title}</title>
          <meta name="description" content={metaData.description} />

          {/* OpenGraph */}
          <meta property="og:title" content={metaData.title} />
          <meta property="og:description" content={metaData.description} />
          <meta property="og:image" content={metaData.imageUrl} />
          <meta property="og:url" content={metaData.url} />
          <meta property="og:type" content="article" />

          {/* Twitter */}
          <meta name="twitter:title" content={metaData.title} />
          <meta name="twitter:description" content={metaData.description} />
          <meta name="twitter:image" content={metaData.imageUrl} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
      </>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
