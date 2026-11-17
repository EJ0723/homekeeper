import { Suspense, type ReactNode } from "react";
import { UserMenu } from "@/src/features/auth/components/user-menu";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 p-6">
      <header className="flex items-center justify-between gap-4 border-b border-border pb-4">
        <h1 className="text-xl font-bold">Homekeeper</h1>
        <Suspense
          fallback={
            <span className="text-sm text-muted-foreground">Loading...</span>
          }
        >
          <UserMenu />
        </Suspense>
      </header>
      {children}
    </div>
  );
}
