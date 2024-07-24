"use client";
// import { useBalance } from "@repo/store/useBalance";
import { signOut, useSession } from "next-auth/react";
// import { redirect } from "next/navigation";

export default function Page(): JSX.Element {
  const { data: session, status } = useSession();

  

  return (
    <main>
      <button onClick={() => signOut({ redirect: false })}>Signout</button>
      <h1>Home Page</h1>
      {session && (
        <>
          <h1>{session.user?.name}</h1>
          <h1>{session.user?.id}</h1>
          <h1>{session.user?.email}</h1>
          <h1>{session.user?.image}</h1>
          <h1>{status}</h1>
        </>
      )}
    </main>
  );
}
