import type { IntervalUnit } from "./types";

export function addInterval(
  date: Date,
  value: number,
  unit: IntervalUnit
): Date {
  const next = new Date(date);

  switch (unit) {
    case "day":
      next.setDate(next.getDate() + value);
      break;
    case "week":
      next.setDate(next.getDate() + value * 7);
      break;
    case "month": {
      const day = next.getDate();
      next.setDate(1);
      next.setMonth(next.getMonth() + value);
      const lastDay = new Date(
        next.getFullYear(),
        next.getMonth() + 1,
        0
      ).getDate();
      next.setDate(Math.min(day, lastDay));
      break;
    }
  }

  return next;
}
