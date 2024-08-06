"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinkProp {
  href: string;
  Icon: JSX.Element;
  linkText: string;
}

export default function SidebarLink({ href, Icon, linkText }: SidebarLinkProp) {
  const pathname = usePathname();
  const selected = pathname === href;
  
  return (
    <div
      className={`flex h-8 w-full items-center gap-x-2 pb-2 font-semibold ${selected ? "text-blue-500" : "text-slate-800"} `}
    >
      {Icon}
      <Link href={href} className="mt-1">
        {linkText}
      </Link>
    </div>
  );
}
