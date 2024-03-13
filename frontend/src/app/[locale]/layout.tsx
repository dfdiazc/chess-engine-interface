import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Providers from "@/app/Providers";
import { NextIntlClientProvider, useMessages } from "next-intl";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Un-Real Chess",
  description:
    "Play chess online for free against the world's best chess engines.",
  metadataBase: new URL("https://unrealchess.vercel.app"),
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <html lang={locale} className="dark">
          <body className={inter.className}>{children}</body>
        </html>
      </Providers>
    </NextIntlClientProvider>
  );
}
