import "server-only";
import { prisma } from "@/src/lib/prisma";
import { getCurrentUser } from "@/src/lib/session";
import { addInterval } from "./schedule";
import type { ChoreView, IntervalUnit } from "./types";

export async function getChores(): Promise<ChoreView[]> {
  const user = await getCurrentUser();

  return prisma.chore.findMany({
    where: { userId: user.id },
    orderBy: { nextDueAt: "asc" },
    select: {
      id: true,
      title: true,
      intervalValue: true,
      intervalUnit: true,
      lastCompletedAt: true,
      nextDueAt: true,
    },
  });
}

type CreateChoreInput = {
  title: string;
  intervalValue: number;
  intervalUnit: IntervalUnit;
  lastCompletedAt: Date | null;
};

export async function createChore(input: CreateChoreInput) {
  const user = await getCurrentUser();
  const base = input.lastCompletedAt ?? new Date();

  return prisma.chore.create({
    data: {
      userId: user.id,
      title: input.title,
      intervalValue: input.intervalValue,
      intervalUnit: input.intervalUnit,
      lastCompletedAt: input.lastCompletedAt,
      nextDueAt: addInterval(base, input.intervalValue, input.intervalUnit),
    },
  });
}

export async function deleteChore(choreId: string) {
  const user = await getCurrentUser();

  const { count } = await prisma.chore.deleteMany({
    where: { id: choreId, userId: user.id },
  });

  return count;
}
