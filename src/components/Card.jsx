import CardOptions from "./CardOptions";

function Card({ task }) {
  return (
    <li className="bg-slate-900 min-h-[160px] rounded p-4 text-white flex flex-col gap-4">
      <div className="flex justify-between items-start md:items-center gap-2">
        <h2
          translate="no"
          className={`${
            task.done ? "line-through text-sky-950 select-none" : "text-white"
          } text-2xl md:text-4xl [word-break:break-all] capitalize font-bold flex-shrink `}
        >
          {task.title}
        </h2>
        <CardOptions task={task} />
      </div>
      <p
        translate="no"
        className={`${
          task.done ? "line-through select-none opacity-50" : undefined
        } text-[16px] md:text-[20px] capitalize`}
      >
        {task.description}
      </p>
      <article className="flex flex-row flex-wrap gap-2">
        {task.tags.map((tag, index) => (
          <div
            key={index}
            className={`${
              task.done
                ? "bg-sky-800 border-sky-800 text-black select-none"
                : undefined
            } bg-sky-500 p-2 border border-sky-500 rounded-md w-fit`}
          >
            {tag}
          </div>
        ))}
      </article>
    </li>
  );
}
export default Card;
