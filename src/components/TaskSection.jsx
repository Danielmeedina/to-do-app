import Card from "@/components/Card";
import { EpArrowUpBold } from "@/icons/Arrow";
import { ZondiconsInformationOutline } from "@/icons/Information";
import { TAGS, useTasks } from "@/store/Task";
import { useState } from "react";

function TaskSection() {
  const { tasks } = useTasks();
  const [filters, setFilters] = useState([]);

  const handleChange = (e) => {
    if (e.target.checked) {
      setFilters((prevFilters) => [...prevFilters, e.target.value]);
    } else {
      setFilters((prevFilters) =>
        prevFilters.filter((tag) => tag !== e.target.value)
      );
    }
  };

  const filterTasksByTags = (tasks, filters) => {
    if (filters.length === 0) return tasks;
    return tasks.filter((task) =>
      filters.some((tag) => task.tags.includes(tag))
    );
  };

  const filteredTasks = filterTasksByTags(tasks, filters);

  return (
    <>
      <section className="flex flex-col items-center flex-nowrap flex-grow flex-shrink">
        {filteredTasks.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center flex-col gap-4 text-yellow-500 border border-yellow-500 rounded-md">
            <ZondiconsInformationOutline width="80px" height="80px" />
            <h3 className="text-[20px] text-center">
              There are no tasks with this tag
            </h3>
          </div>
        ) : (
          <ul className="flex flex-col gap-4 w-full">
            {filteredTasks.map((task) => (
              <Card task={task} key={task.id} />
            ))}
          </ul>
        )}
      </section>
      <details className="[&[open]>summary]:bg-slate-800 [&[open]>summary_svg]:rotate-[180deg] [&[open]>summary_svg]:transition-[transform] w-full bg-slate-900 md:w-[200px] md:h-[430px] md:bg-transparent md:open:bg-slate-900 sticky top-4 right-0 rounded-md  text-white p-1">
        <summary className="text-[30px] flex justify-between items-center font-semibold hover:bg-slate-800 cursor-pointer list-none px-2 rounded-md">
          Filters
          <EpArrowUpBold width="25px" height="25px" />
        </summary>
        <div className="flex flex-row flex-wrap gap-4 md:flex-col md:flex-nowrap md:gap-2 px-[4px] mt-3">
          {TAGS.map((tag, index) => (
            <label
              key={index}
              className="flex gap-1 text-[24px] md:text-[20px] cursor-pointer hover:bg-slate-800 py-[4px] px-3 rounded-md"
            >
              <input
                type="checkbox"
                onChange={handleChange}
                name={tag}
                value={tag}
                className="accent-sky-500"
              />
              {tag}
            </label>
          ))}
        </div>
      </details>
    </>
  );
}
export default TaskSection;
