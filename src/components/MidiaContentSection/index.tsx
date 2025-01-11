import { ReactNode } from "react";

interface MidiaContentSectionProps {
  title: string;
  children: ReactNode;
}

export function MidiaContentSection({title,children }: MidiaContentSectionProps) {
  return (
    <div className="m-auto w-[95%] h-fit flex flex-col gap-8 p-6 mb-8 border-[0.5px] rounded-md">
      <h2 className="text-xl font-bold w-full text-center">
        {title}
      </h2>

      <div className="grid items-center justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 max-w-full">
        {children}
      </div>
    </div>
  );
}
