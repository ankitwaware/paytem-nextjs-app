"use client";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function ProviderRoot({ children }: { children: ReactNode }) {
  return (
    <RecoilRoot>
      <SessionProvider>{children}</SessionProvider>
    </RecoilRoot>
  );
}
