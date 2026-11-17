"use client"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import type { ChoreActionState } from "../types"
import { Button } from "@/src/components/ui/button";
import { Field, FieldGroup } from "@/src/components/ui/field";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { useActionState, useEffect, useState } from "react";
import { createChoreAction } from "../actions";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { DatePickerInput } from "@/src/components/date-picker-input";

const initialState: ChoreActionState = { status: "idle" };

const interval_units = [
  { label: "Select a unit (e.g. weeks)", value: null },
  { label: "days", value: "day" },
  { label: "weeks", value: "week" },
  { label: "months", value: "month" }
]

export function CreateChoreCTA() {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    async (prevState: ChoreActionState, formData: FormData) => {
      const result = await createChoreAction(prevState, formData);
      if (result.status === "success") {
        setOpen(false);
      }
      return result;
    },
    initialState
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline">Add Chore</Button>} />
      <DialogContent>
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Add a Chore</DialogTitle>
            <DialogDescription>
              Fill up details here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="choreTitle">Title</Label>
              <Input id="choreTitle" name="choreTitle" placeholder="e.g. Deep clean the bathroom" required maxLength={100} />
              {state.fieldErrors?.title?.[0] && (
                <p className="text-xs text-destructive">
                  {state.fieldErrors.title[0]}
                </p>
              )}
            </Field>

            <Field>
              <Label htmlFor="intervalValue">Every</Label>
              <Input id="intervalValue" name="intervalValue" type="number" min={1} max={365} placeholder="3" required />
              {state.fieldErrors?.intervalValue?.[0] && (
                <p className="text-xs text-destructive">
                  {state.fieldErrors.intervalValue[0]}
                </p>
              )}
            </Field>

            <Field>
              <Label htmlFor="intervalUnit">Unit</Label>
              <Select id="intervalUnit" name="intervalUnit" items={interval_units} required>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {interval_units.map(
                      (unit) => (
                        <SelectItem key={unit.value ?? "placeholder"} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {state.fieldErrors?.intervalUnit?.[0] && (
                <p className="text-xs text-destructive">
                  {state.fieldErrors.intervalUnit[0]}
                </p>
              )}
            </Field>

            <Field>
              <Label htmlFor="lastCompletedAt">
                Last done{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>

              <DatePickerInput id="lastCompletedAt" name="lastCompletedAt" />
              {state.fieldErrors?.lastCompletedAt?.[0] && (
                <p className="text-xs text-destructive">
                  {state.fieldErrors.lastCompletedAt[0]}
                </p>
              )}
            </Field>
          </FieldGroup>

          {state.status === "error" && state.message && (
            <p className="text-sm text-destructive" aria-live="polite">
              {state.message}
            </p>
          )}

          {state.status === "success" && state.message && (
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {state.message}
            </p>
          )}

          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit" disabled={pending}>{pending ? "Saving…" : "Save changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
