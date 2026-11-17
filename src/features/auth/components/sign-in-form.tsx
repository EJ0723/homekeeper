"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { SubmitButton } from "@/src/components/forms/submit-button";
import { buttonVariants } from "@/src/components/ui/button";
import { signIn } from "@/src/lib/auth-client";

export function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    try {
      const formData = new FormData(e.currentTarget);

      const res = await signIn.email({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });

      if (res.error) {
        setError(res.error.message || "Something went wrong.");
        return;
      }

      router.replace("/");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Sign In</h1>
      {error && <p className="text-sm text-destructive">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>

        <SubmitButton pending={pending} pendingText="Signing in...">
          Sign In
        </SubmitButton>
      </form>

      <Link
        href="/sign-up"
        className={buttonVariants({
          variant: "outline",
          size: "lg",
          className: "h-10 w-full text-sm",
        })}
      >
        Create an account
      </Link>
    </div>
  );
}
