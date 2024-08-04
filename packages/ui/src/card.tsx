import { ReactNode } from "react";

export default function Card({
  className,
  title,
  children,
}: {
  className?: string;
  title: string;
<<<<<<< Updated upstream
<<<<<<< HEAD
<<<<<<< Updated upstream
  children: React.ReactNode;
  href: string;
}): React.JSX.Element {
=======
  children?: ReactNode;
}) {
>>>>>>> Stashed changes
=======
  children: ReactNode;
}): JSX.Element {
>>>>>>> 081c1df5d2c3fe12dbeb3f23206ffa20d95317a3
=======
  children?: ReactNode;
}) {
>>>>>>> Stashed changes
  return (
    <div
      className={`flex flex-col rounded-lg bg-slate-50 p-4 font-medium ${className}`}
    >
      <h3 className="mb-1 border-b border-slate-600 text-lg">{title}</h3>

      {children}
    </div>
  );
}
