import { Header } from "@/components/Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col gap-16 ">
      <Header />
      {children}
    </div>
  );
}
