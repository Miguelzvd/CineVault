import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import { House, Menu, Star, Tv } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { useState } from "react";

export function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleTooltip = () => {
    setIsOpen((prev) => !prev);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:px-6 lg:px-8 w-full">
      <header className="h-[3.5rem] w-full flex flex-row shrink-0 items-center px-4 md:px-6 relative">
        <h1 className="mr-6 flex font-bold text-lg lg:text-xl">
          cine-vault.io
        </h1>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto lg:hidden flex flex-row items-center gap-2 bg-transparent"
            >
              <Menu className="text-black dark:text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Navigate through the app</SheetDescription>
            </SheetHeader>

            <div className="flex flex-col gap-4 py-4 p-x">
              <a
                href="/"
                className={`flex items-center gap-2 text-sm ${
                  isActive("/")
                    ? "text-yellow-600 dark:text-yellow-200"
                    : "text-black dark:text-white"
                }`}
              >
                <House />
                <span>Home</span>
              </a>

              <a
                href="/saved-content"
                className={`flex items-center gap-2 text-sm ${
                  isActive("/saved-content")
                    ? "text-yellow-600 dark:text-yellow-200"
                    : "text-black dark:text-white"
                }`}
              >
                <Star />
                <span>Saved</span>
              </a>

              <a
                href="/watched-content"
                className={`flex items-center gap-2 text-sm ${
                  isActive("/watched-content")
                    ? "text-yellow-600 dark:text-yellow-200"
                    : "text-black dark:text-white"
                }`}
              >
                <Tv />
                <span>Watched</span>
              </a>

              <div className="flex items-center gap-4 mt-4">
                <ModeToggle />

                <TooltipProvider>
                  <Tooltip open={isOpen} onOpenChange={setIsOpen}>
                    <TooltipTrigger asChild>
                      <Button
                        className="justify-self-end px-2 py-1 text-xs"
                        onClick={toggleTooltip}
                      >
                        EN/PT-BR
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="rounded-sm p-2 text-white shadow-md opacity-90 transition-opacity duration-200 ease-in-out transform scale-95 hover:scale-100 bg-slate-800 dark:bg-slate-600">
                      <p>Will be implemented soon 😁</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="ml-auto hidden lg:flex flex-row items-center gap-2">
          <a href="/" className="relative">
            <div
              className={
                "justify-center cursor-pointer items-center gap-2 group inline-flex h-10 w-max rounded-md px-4 py-2 text-sm font-medium transition-colorsbg-white hover:bg-yellow-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-slate-800 dark:hover:text-gray-50"
              }
            >
              <House />
              <span>Home</span>
            </div>
            {isActive("/") && (
              <div className="absolute bottom-[-0.6rem] left-0 w-full h-[4px] bg-yellow-600 dark:bg-yellow-200" />
            )}
          </a>

          <a href="/saved-content" className="relative">
            <div
              className={
                "justify-center cursor-pointer items-center gap-2 group inline-flex h-10 w-max rounded-md px-4 py-2 text-sm font-medium transition-colorsbg-white hover:bg-yellow-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-slate-800 dark:hover:text-gray-50"
              }
            >
              <Star />
              <span>Saved</span>
            </div>
            {isActive("/saved-content") && (
              <div className="absolute bottom-[-0.6rem] left-0 w-full h-[4px] bg-yellow-600 dark:bg-yellow-200" />
            )}
          </a>

          <a href="/watched-content" className="relative">
            <div
              className={
                "justify-center cursor-pointer items-center gap-2 group inline-flex h-10 w-max rounded-md px-4 py-2 text-sm font-medium transition-colorsbg-white hover:bg-yellow-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-slate-800 dark:hover:text-gray-50"
              }
            >
              <Tv />
              <span>Watched</span>
            </div>
            {isActive("/watched-content") && (
              <div className="absolute bottom-[-0.6rem] left-0 w-full h-[4px] bg-yellow-600 dark:bg-yellow-200" />
            )}
          </a>

          <div className="flex gap-2">
            <ModeToggle />
            <TooltipProvider>
              <Tooltip open={isOpen} onOpenChange={setIsOpen}>
                <TooltipTrigger asChild>
                  <Button
                    className="justify-self-end px-2 py-1 text-xs"
                    onClick={toggleTooltip}
                  >
                    EN/PT-BR
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="rounded-sm p-2 text-white shadow-md opacity-90 transition-opacity duration-200 ease-in-out transform scale-95 hover:scale-100 bg-slate-800 dark:bg-slate-600">
                  <p>Will be implemented soon 😁</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>
      <hr />
    </div>
  );
}
