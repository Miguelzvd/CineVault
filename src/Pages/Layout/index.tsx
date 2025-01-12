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
        {children}
      </div>
      <footer className="ml-12 mb-2">
        <a
          href="https://www.flaticon.com/free-icons/cinema"
          title="cinema icons"
        >
          Cinema icons created by Freepik - Flaticon
        </a>
      </footer>
    </>
  );
}
