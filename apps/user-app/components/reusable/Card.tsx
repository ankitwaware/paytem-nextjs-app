import { ReactNode } from "react";

export default function Card({
  className,
  title,
  children,
}: {
  className?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex flex-col rounded-lg bg-slate-50 p-4 font-medium ${className}`}
    >
      <h3 className="mb-1 border-b border-slate-600 text-lg">{title}</h3>

      {children}
    </div>
  );
}
