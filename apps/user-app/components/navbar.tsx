"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <nav className="md-px-8 flex justify-between bg-yellow-400 px-4 py-3 capitalize">
      <div>
        <h1 className="text-4xl font-extrabold italic text-blue-500">Paytem</h1>
      </div>
      <ul className="flex justify-between gap-x-4">
        {status == "unauthenticated" && (
          <>
            <li
              className="rounded-lg border border-black p-2"
              onClick={() => router.push("/signin")}
            >
              login In
            </li>
            <li className="rounded-lg border border-black p-2">
              Merchant login
            </li>
          </>
        )}

        {status == "authenticated" && (
          <li
            className="pointer rounded-lg border border-black p-2"
            onClick={() => signOut()}
          >
            sign out
          </li>
        )}

        
      </ul>
    </nav>
  );
}
