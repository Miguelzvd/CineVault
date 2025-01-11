import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import { House, Star, Tv } from "lucide-react";

export function Header() {
  return (
    <div className=" md:px-6 lg:px-8 w-full">
      <header className="h-20 w-full flex flex-row shrink-0 items-center px-4 md:px-6">
        <h1 className="mr-6 hidden lg:flex font-bold text-lg">cine-vault.io</h1>
        <div className="ml-auto flex flex-row items-center gap-2">
          <a href="/">
            <div className="border-[0.5px] justify-center cursor-pointer items-center gap-2 group inline-flex h-10 w-max rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50">
              <House />
              <span>Home</span>
            </div>
          </a>

          <a href="saved-content">
            <div className="border-[0.5px] justify-center cursor-pointer items-center gap-2 group inline-flex h-10 w-max rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50">
              <Star />
              <span>Saved</span>
            </div>
          </a>

          <a href="watched-content" className="">
            <div className="border-[0.5px] justify-center cursor-pointer items-center gap-2 group inline-flex h-10 w-max rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50">
              <Tv />
              <span>Watched</span>
            </div>
          </a>

          <div className="flex gap-2">
            <ModeToggle />

            <Button className="justify-self-end px-2 py-1 text-xs">
              EN/PT-BR
            </Button>
          </div>
        </div>
      </header>
      <hr />
    </div>
  );
}
