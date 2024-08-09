"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "./navbar";

export default function Appbar() {
  const pathname = usePathname();
  const session = useSession();
  const router = useRouter();

  const signoutHandler = async () => {
    await signOut({ redirect: false, callbackUrl: "/" });
    router.push("/signin");
  };

  return (
    <Navbar
      className={
        pathname === "/signin" || pathname === "/signup" ? "hidden" : ""
      }
      user={session.data?.user}
      signin={() => {
        router.push("/signin");
      }}
      signout={signoutHandler}
    />
  );
}
