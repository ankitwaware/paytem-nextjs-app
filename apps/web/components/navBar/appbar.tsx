"use client";

import { signOut, useSession } from "next-auth/react";
import Navbar from "./navBar";
import { useRouter } from "next/navigation";

export default function Appbar() {
  const session = useSession();
  const router = useRouter();

  const signoutHandler = async () => {
    await signOut({ redirect: false, callbackUrl : "/" });
    router.push("/signin");
  };

  return (
    <Navbar
      user={session.data?.user}
      signin={() => router.push("/signin")}
      signout={signoutHandler}
    />
  );
}
