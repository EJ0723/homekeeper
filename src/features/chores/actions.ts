"use server";

import { revalidatePath } from "next/cache";
import { createChore, deleteChore } from "./data";
import type { ChoreActionState, DeleteChoreState } from "./types";
import z from "zod";

const createChoreSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100),
  intervalValue: z.coerce.number().int().min(1).max(365),
  intervalUnit: z.enum(["day", "week", "month"]),
  lastCompletedAt: z.preprocess(
    (v) => (v === "" || v == null ? undefined : v),
    z.coerce.date().optional()
  ),
});

export async function createChoreAction(
  _prevState: ChoreActionState,
  formData: FormData
): Promise<ChoreActionState> {
  const parsed = createChoreSchema.safeParse({
      title: formData.get("choreTitle"),
      intervalValue: formData.get("intervalValue"),
      intervalUnit: formData.get("intervalUnit"),
      lastCompletedAt: formData.get("lastCompletedAt"),
    });

    if (!parsed.success) {
      return {
        status: "error",
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
      };
    }

  try {
    await createChore({
      ...parsed.data,
      lastCompletedAt: parsed.data.lastCompletedAt ?? null,
    });

    revalidatePath("/");
    return { status: "success", "message": "Chore created." };
  } catch {
    return { status: "error", message: "Could not create the chore." };
  }
}

export async function deleteChoreAction(
  choreId: string,
  _prevState: DeleteChoreState,
  _formData: FormData | null
): Promise<DeleteChoreState> {
  try {
    await deleteChore(choreId);
    revalidatePath("/");
    return { status: "success" };
  } catch {
    return { status: "error", message: "Could not delete the chore." };
  }
}
