import { OptionsIcon } from "@/icons/OptionsIcon";
import { useTasks } from "@/store/Task";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function CardOptions({ task }) {
  const { deleteTask, updateTask } = useTasks();
  const router = useRouter();

  const handleEdit = () => {
    if (!task.done) {
      router.push(`/edit/${task.id}`);
    } else {
      toast.error("You can't edit a task that's already been completed");
    }
  };

  const handleDelete = () => {
    toast.error(`Do you want to delete the task?`, {
      description: "The task will be permanently deleted",
      action: {
        label: "Delete",
        onClick: () => deleteTask(task.id),
      },
    });
  };

  const handleDone = () => {
    updateTask(task.id, { ...task, done: !task.done });
    toast.success("Updated Task");
  };

  return (
    <div className="relative">
      <button className="peer cursor-pointer">
        <OptionsIcon width="30px" height="30px" />
      </button>
      <aside className="group w-[145px] [clip-path:polygon(1%_1%,_84%_0,_84%_19%,_100%_19%,_99%_99%,_0%_99%)] transition invisible opacity-0 peer-hover:visible peer-hover:opacity-100 hover:visible hover:opacity-100 absolute bottom-[-100px] left-[-110px] z-20">
        <div className="w-[115px] rounded-md text-[16px] flex flex-col gap-[8px] items-start p-[8px] bg-slate-800">
          <button
            onClick={handleEdit}
            className={`relative rounded  w-full capitalize p-[4px] ${
              task.done ? "cursor-not-allowed" : "hover:bg-slate-700"
            }`}
          >
            edit
          </button>
          <button
            onClick={handleDone}
            className={`${
              task.done ? "bg-green-500" : undefined
            } rounded hover:bg-slate-700 w-full capitalize p-[4px]`}
          >
            {task.done ? "completed" : "complete"}
          </button>
          <button
            onClick={handleDelete}
            className="relative mt-[6px] rounded bg-red-600 hover:bg-red-800 w-full capitalize p-[4px] before:content-[''] before:absolute before:top-[-10px] before:left-0 before:w-full before:bg-white before:h-[2px] "
          >
            Delete
          </button>
        </div>
      </aside>
    </div>
  );
}
export default CardOptions;
