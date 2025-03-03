import { ReactNode } from "react";

interface MidiaContentSectionProps {
  title?: string;
  pagination?: ReactNode;
  children: ReactNode;
}

export function MidiaContentSection({
  title,
  children,
  pagination,
}: MidiaContentSectionProps) {
  return (
    <div className="m-auto w-[95%] h-fit flex flex-col gap-8 p-6 mb-8 border-[0.5px] rounded-md shadow-sm">
      {title && (
        <h2 className="text-xl font-bold w-full text-center">{title}</h2>
      )}

      <div className="grid items-start justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 max-w-full justify-start">
        {children}
      </div>
      {pagination}
    </div>
  );
}
