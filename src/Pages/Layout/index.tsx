import { Header } from "@/components/Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="flex flex-col gap-16 min-h-screen">
        <Header />
        <div className="flex flex-col min-h-[86vh] justify-between">
          <main className="flex flex-col justify-end gap-16 mb-8">
            {children}
          </main>
          <footer className="flex flex-col items-center mb-4 lg:items-start lg:mx-[2.5%]">
            <p>
              Project developed by{" "}
              <a
                href="https://github.com/Miguelzvd"
                target="_blank"
                className="text-primary font-semibold hover:text-blue-800 dark:hover:text-blue-500 transition-colors duration-300 hover:underline"
              >
                Miguel Azevedo
              </a>{" "}
              © 🎬
            </p>
            <a
              href="https://www.flaticon.com/free-icons/cinema"
              title="cinema icons"
            >
              Cinema icons created by Freepik - Flaticon
            </a>
          </footer>
        </div>
      </div>
    </>
  );
}
