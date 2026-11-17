export type IntervalUnit = "day" | "week" | "month";

export type ChoreView = {
  id: string;
  title: string;
  intervalValue: number;
  intervalUnit: IntervalUnit;
  lastCompletedAt: Date | null;
  nextDueAt: Date;
};

export type ChoreActionState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Partial<
    Record<
      "title" | "intervalValue" | "intervalUnit" | "lastCompletedAt",
      string[]
    >
  >;
};

export type DeleteChoreState = {
  status: "idle" | "error" | "success";
  message?: string;
};
