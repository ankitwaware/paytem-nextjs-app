"use client";
// import { useBalance } from "@repo/store/useBalance";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function Page(): JSX.Element {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session?.user) {
    console.log(session);
  }

  if (status == "unauthenticated") {
    console.log(status);
    redirect("/signin");
  }

  return (
    <main>
      <nav className="flex gap-x-4">
        <button onClick={() => signOut({ redirect: false })}>Signout</button>
        <button onClick={() => router.push("/signin")}>SignIn</button>
        <button onClick={() => router.push("/signup")}>SignUp</button>
      </nav>

      <h1>Home Page</h1>

      <>
        <h1>{session?.user?.name}</h1>
        <h1>{session?.user?.email}</h1>
        <h1>{status}</h1>
      </>
    </main>
  );
}
