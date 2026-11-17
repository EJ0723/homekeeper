"use client";

import type { ComponentProps } from "react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

type SubmitButtonProps = ComponentProps<typeof Button> & {
  pending?: boolean;
  pendingText?: string;
};

export function SubmitButton({
  pending = false,
  pendingText = "Please wait...",
  disabled,
  className,
  children,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending || disabled}
      className={cn("h-10 w-full text-sm", className)}
      {...props}
    >
      {pending ? pendingText : children}
    </Button>
  );
}
