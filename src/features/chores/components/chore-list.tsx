import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/src/components/ui/empty";
import { ChoreView } from "../types";
import { DeleteChoreCTA } from "./delete-chore-cta";
import { IconClipboardOff } from "@tabler/icons-react";
import { Button } from "@/src/components/ui/button";
import { CreateChoreCTA } from "./create-chore-cta";

function formatDue(date: Date) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
}

export function ChoreList({ chores }: { chores: ChoreView[] }) {
  if (chores.length === 0) {
    // return <p className="text-gray-500">No chores here.</p>;
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconClipboardOff />
          </EmptyMedia>
          <EmptyTitle>No Chores Yet</EmptyTitle>
          <EmptyDescription>You haven&apos;t added any chores yet. Get started by adding your first chore.</EmptyDescription>
          <EmptyContent className="justify-center">
            <CreateChoreCTA />
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <ul className="space-y-2">
      {chores.map((chore) => (
        <li
          key={chore.id}
          className="rounded-md border border-gray-200 px-3 py-2"
        >
          <p className="font-medium">{chore.title}</p>
          <p className="text-sm text-gray-600">
            Due {formatDue(chore.nextDueAt)} · every {chore.intervalValue > 1 ? chore.intervalValue+" " : ""}
            {chore.intervalUnit}{chore.intervalValue > 1 ? "s" : ""}
          </p>
          {/*<form action={completeChore.bind(null, chore.id)}>
            <button type="submit" className="text-sm underline">
              Mark done
            </button>
          </form>*/}
          <DeleteChoreCTA choreId={chore.id} title={chore.title} />
        </li>
      ))}
    </ul>
  );
}
