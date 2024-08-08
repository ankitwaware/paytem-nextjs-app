"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page(): React.JSX.Element {
  const session = useSession();

  if (session.data?.user) {
    redirect("/dashboard");
  } else {
    redirect("/signin");
  } 

  return <section>landing Page</section>;
}
