"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import NavBtn from "./navBtn";

export default function Navbar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  // signout and redirect to signin page
  const signoutHandler = async () => {
    await signOut({ redirect: false, callbackUrl: "/" });
    router.push("/signin");
  };

  return (
    <nav
      className={`md-px-8 flex justify-between border-b-2 border-slate-400 bg-slate-200 px-4 py-3 ${className} ${pathname === "/signin" || pathname === "/signup" ? "hidden" : ""}`}
    >
      <h1 className="text-3xl font-extrabold italic text-black">Paytem</h1>

      <div className="flex items-center justify-between gap-x-4">
        <h3 className="text-sm text-gray-950 underline">
          {session?.user?.email}
        </h3>
        <NavBtn
          user={session?.user}
          onClickHandler={session?.user ? signoutHandler : signIn}
        />
      </div>
    </nav>
  );
}
