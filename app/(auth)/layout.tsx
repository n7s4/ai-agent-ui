export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex h-full bg-muted/30">{children}</div>;
}
