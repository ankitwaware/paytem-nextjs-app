"use client";

import { signOut, useSession } from "next-auth/react";
import Navbar from "./navbar";
import { usePathname, useRouter } from "next/navigation";

export default function Appbar() {
  const pathname = usePathname();
  const session = useSession();
  const router = useRouter();

  console.log("pathname", pathname);

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
      signin={() => router.push("/signin")}
      signout={signoutHandler}
    />
  );
}
