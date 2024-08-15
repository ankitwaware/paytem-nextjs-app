"use client";

import { useSession } from "next-auth/react";
import { redirect, RedirectType } from "next/navigation";

export default function Page() {
  const session = useSession();

  if (session.data?.user) {
    redirect("/dashboard",RedirectType.push);
  }

  redirect("/signin", RedirectType.push);

  return <section>landing Page</section>;
}
