import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "../components/providers";
import Appbar from "../components/navBarComponents/appbar";

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
      <Providers>
        <body className={inter.className}>
          <Appbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
