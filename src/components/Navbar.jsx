import { PlusIcon } from "@/icons/PlusIcon";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="container mx-auto flex justify-between items-center p-2">
      <Link href="/" className="font-bold text-4xl">
        <h1
          translate="no"
          className="text-4xl text-sky-500 hover:text-sky-700 transition-[color]"
        >
          To do App
        </h1>
      </Link>
      <Link
        href="/new"
        className="flex flex-row gap-1 items-center bg-sky-500 px-2 py-2 border rounded-md border-sky-500 text-black hover:bg-transparent hover:text-white"
      >
        <PlusIcon width="1.5rem" height="1.5rem" /> New
      </Link>
    </nav>
  );
}
export default Navbar;
