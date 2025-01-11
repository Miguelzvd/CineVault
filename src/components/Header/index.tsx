import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import { House, Star, Tv } from "lucide-react";
import { useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:px-6 lg:px-8 w-full">
      <header className="h-[3.5rem] w-full flex flex-row shrink-0 items-center px-4 md:px-6 relative">
        <h1 className="mr-6 hidden lg:flex font-bold text-lg">cine-vault.io</h1>
        <div className="ml-auto flex flex-row items-center gap-2">
          <a href="/" className="relative">
            <div
              className={
                "justify-center cursor-pointer items-center gap-2 group inline-flex h-10 w-max rounded-md px-4 py-2 text-sm font-medium transition-colorsbg-white hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              }
            >
              <House />
              <span>Home</span>
            </div>
            {isActive("/") && (
              <div className="absolute bottom-[-0.6rem] left-0 w-full h-[4px] bg-slate-600 dark:bg-slate-200" />
            )}
          </a>

          <a href="/saved-content" className="relative">
            <div
              className={
                "justify-center cursor-pointer items-center gap-2 group inline-flex h-10 w-max rounded-md px-4 py-2 text-sm font-medium transition-colorsbg-white hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              }
            >
              <Star />
              <span>Saved</span>
            </div>
            {isActive("/saved-content") && (
              <div className="absolute bottom-[-0.6rem] left-0 w-full h-[4px] bg-slate-600 dark:bg-slate-200" />
            )}
          </a>

          <a href="/watched-content" className="relative">
            <div
              className={
                "justify-center cursor-pointer items-center gap-2 group inline-flex h-10 w-max rounded-md px-4 py-2 text-sm font-medium transition-colorsbg-white hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              }
            >
              <Tv />
              <span>Watched</span>
            </div>
            {isActive("/watched-content") && (
              <div className="absolute bottom-[-0.6rem] left-0 w-full h-[4px] bg-slate-600 dark:bg-slate-200" />
            )}
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
