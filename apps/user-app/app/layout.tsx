import "./globals.css";
import type { Metadata } from "next";
import Providers from "./Provider";

export const metadata: Metadata = {
  title: "Paytem App",
  description: "created by ankit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
