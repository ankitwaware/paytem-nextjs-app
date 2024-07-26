import "./globals.css";
import type { Metadata } from "next";
import Providers from "../components/Providers";

export const metadata: Metadata = {
  title: "Paytem App",
  description: "created by ankit",
};

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "100", "300", "500", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en">
      <body className={`${roboto.className} tracking-wide`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
