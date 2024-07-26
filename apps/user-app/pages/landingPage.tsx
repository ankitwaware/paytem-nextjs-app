import React from "react";
import Navbar from "../components/navbar";
import { useSession } from "next-auth/react";
import { redirect,RedirectType } from "next/navigation";

export default function LandingPage(): React.JSX.Element {
  const { data: session, status } = useSession();

  if (!session) {
    redirect("/signin",RedirectType.push);
  }

  return (
    <main>
      <Navbar />
        
      <h1>Home Page</h1>
      {session?.user?.email && (
        <>
          <h1>{session.user.email}</h1>
          <h1>{session.user.uid}</h1>
          <h1>{session.user.account.acc_id}</h1>
          <h1>{session.user.account.type}</h1>
          <h1>{session.user.jwtToken}</h1>
          <h1>{status}</h1>
        </>
      )}
    </main>
  );
}
