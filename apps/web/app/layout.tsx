import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ProviderRoot from "../components/providerRoot";
import Navbar from "../components/navbar";

export const metadata: Metadata = {
  title: "Paytem App",
  description: "created by ankit",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderRoot>
          <Navbar />
          {children}
        </ProviderRoot>
      </body>
    </html>
  );
}
