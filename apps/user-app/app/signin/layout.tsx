
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <nav>nav barcomponent</nav>
      {children}
    </>
  );
}
