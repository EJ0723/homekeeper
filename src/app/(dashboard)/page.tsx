import { Suspense } from "react";
import { ChoreList } from "@/src/features/chores/components/chore-list";
import { getChores } from "@/src/features/chores/data";
import { CreateChoreCTA } from "@/src/features/chores/components/create-chore-cta";

export default function DashboardPage() {
  return (
    <main className="space-y-6">
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Your chores</h2>
        <CreateChoreCTA />
        <Suspense
          fallback={
            <p className="text-sm text-muted-foreground">Loading chores...</p>
          }
        >
          <ChoreListContainer />
        </Suspense>
      </section>
    </main>
  );
}

async function ChoreListContainer() {
  const chores = await getChores();
  return <ChoreList chores={chores} />;
}
