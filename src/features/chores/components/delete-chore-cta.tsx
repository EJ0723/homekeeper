"use client"

import { Button } from "@/src/components/ui/button";
import { deleteChoreAction } from "../actions";
import type { DeleteChoreState } from "../types";

const initialState: DeleteChoreState = { status: "idle" };

export function DeleteChoreCTA({
  choreId,
  title
}: {
    choreId: string,
    title: string
  }) {
  return (
    <Button
      type="submit"
      variant="destructive"
    size="sm"
    onClick={() => { deleteChoreAction(choreId, initialState, null)}}
    >
      Delete
    </Button>
  )
}
