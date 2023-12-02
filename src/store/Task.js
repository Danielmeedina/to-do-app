import { create } from "zustand";
import { persist } from "zustand/middleware";

export const TAGS = [
  "work",
  "home",
  "casual",
  "shoping",
  "search",
  "games",
  "Homework",
  "investigation",
];

export const useTasks = create(
  persist(
    (set, get) => ({
      tasks: [],
      createTask: (title, description, tags) => {
        const tasksCollection = get().tasks;
        set({
          tasks: [
            ...tasksCollection,
            {
              title,
              description,
              tags,
              done: false,
              id: crypto.randomUUID(),
            },
          ],
        });
      },
      deleteTask: (id) => {
        const tasksCollection = get().tasks;
        set({ tasks: [...tasksCollection.filter((task) => task.id !== id)] });
      },
      updateTask: (id, updateFields) => {
        const tasksCollection = get().tasks;
        set({
          tasks: [
            ...tasksCollection.map((task) =>
              task.id === id ? { ...task, ...updateFields } : task
            ),
          ],
        });
      },
    }),
    {
      name: "tasks",
    }
  )
);
