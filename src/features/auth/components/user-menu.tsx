import "server-only";
import { getCurrentUser } from "@/src/lib/session";
import { SignOutButton } from "./sign-out-button";

export async function UserMenu() {
  const user = await getCurrentUser();

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">
        {user.name || user.email}
      </span>
      <SignOutButton />
    </div>
  );
}
