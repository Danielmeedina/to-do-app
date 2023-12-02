"use client";

import { useTasks, TAGS } from "@/store/Task";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const INITIAL_STATE = {
  title: "",
  description: "",
  done: false,
  tags: [],
};

function NewPage({ params }) {
  const [task, setTask] = useState(INITIAL_STATE);
  const { tasks, createTask, updateTask } = useTasks();
  const router = useRouter();

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      const checkedTag = e.target.value;

      setTask((prevTask) => {
        if (e.target.checked) {
          return { ...prevTask, tags: [...prevTask.tags, checkedTag] };
        } else {
          return {
            ...prevTask,
            tags: prevTask.tags.filter((tag) => tag !== checkedTag),
          };
        }
      });
    } else {
      setTask({ ...task, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      updateTask(params.id, task);
      toast.success("Updated Task");
    } else {
      createTask(task.title, task.description, task.tags);
      toast.success("Task Created");
    }
    router.push("/");
  };

  useEffect(() => {
    if (params.id) {
      const taskFound = tasks.find((task) => task.id === params.id);
      if (taskFound)
        setTask({
          title: taskFound.title,
          description: taskFound.description,
          tags: taskFound.tags,
        });
    }
  }, []);

  return (
    <section className="container mx-auto mt-3 min-h-[550px] lg:min-h-[550px] p-2 flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-[1100px] flex flex-col gap-6 lg:grid lg:grid-cols-4 lg:gap-4  text-white"
      >
        <h2 className="col-span-full text-3xl text-sky-500 ">New Task</h2>
        <input
          className="relative text-[20px] lg:col-start-1 lg:col-end-4 lg:row-start-2 lg:row-end-3 h-[40px] px-1 bg-transparent border-b-2 outline-none border-sky-500"
          type="text"
          required
          autoFocus
          autoComplete="false"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={task.title}
        />
        <textarea
          className="text-[18px] lg:col-start-1 lg:col-end-4 lg:row-start-3 lg:row-end-4 bg-transparent outline-none resize-none"
          name="description"
          required
          cols="10"
          rows="5"
          placeholder="Description"
          onChange={handleChange}
          value={task.description}
        />
        <fieldset className="lg:col-start-4 lg:col-span-1 lg:row-start-2 lg:row-end-4 border rounded border-sky-500 p-[12px] flex gap-5 flex-row flex-wrap">
          <legend className="ml-4 text-[25px]">Tags</legend>
          {TAGS.map((tag, index) => (
            <div key={index}>
              <input
                type="checkbox"
                name={tag}
                id={`id-${tag}`}
                value={tag}
                onChange={handleChange}
                checked={task.tags.includes(tag)}
                className="peer hidden"
              />
              <label
                htmlFor={`id-${tag}`}
                className="text-[22px] cursor-pointer capitalize hover:bg-sky-500 hover:text-black peer-checked:bg-sky-500 peer-checked:text-black p-[4px] border border-transparent rounded"
              >
                {tag}
              </label>
            </div>
          ))}
        </fieldset>
        <button
          type="submit"
          className="lg:col-span-full lg:row-start-4 lg:row-end-5 p-4 text-2xl transition-[background-color] border border-sky-500 rounded text-black bg-sky-500 hover:bg-sky-700"
        >
          {params.id ? "Save" : "Create"}
        </button>
      </form>
    </section>
  );
}
export default NewPage;
