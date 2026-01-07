export default function AuthCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="pt-8 space-y-4 justify-center">
        {children}
      </div>
    </div>
  );
}
