import "./globals.css";
import type { Metadata } from "next";
import Providers from "../components/providers";

export const metadata: Metadata = {
  title: "Paytem App",
  description: "created by ankit",
};

import { Inter } from 'next/font/google'
import Appbar from "../components/navBar/appbar";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.className}`}>
          <Appbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
