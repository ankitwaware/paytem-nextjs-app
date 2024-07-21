import "./globals.css";
import type { Metadata } from "next";
import Provider from "../components/Provider";

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Provider>
        <body >{children}</body>
      </Provider>
    </html>
  );
}
