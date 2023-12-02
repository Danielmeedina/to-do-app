"use client";
import { useHydration } from "@/hooks/useHydration";
import { PlusIcon } from "@/icons/PlusIcon";
import TaskSection from "@/components/TaskSection";
import Link from "next/link";
import LoaderTask from "@/components/LoaderTask";
import { useTasks } from "@/store/Task";

export default function Home() {
  const { tasks } = useTasks();
  const hydrated = useHydration();

  if (!hydrated) {
    return <LoaderTask />;
  }
  return (
    <main className="container mx-auto p-2 mt-4 flex flex-col-reverse md:flex-row gap-4">
      {tasks.length === 0 ? (
        <Link
          href="/new"
          className="w-full min-h-[550px] flex flex-col justify-center items-center transition-colors border rounded-lg text-6xl border-transparent hover:border-sky-500 text-white cursor-pointer hover:text-sky-500"
        >
          <PlusIcon width="7rem" height="7rem" />
          Create
        </Link>
      ) : (
        <TaskSection />
      )}
    </main>
  );
}
