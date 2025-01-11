import { Progress } from "@/components/ui/progress";
import { MidiaContentSection } from "@/components/MidiaContentSection";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState } from "react";
import { IMidiaContent } from "@/interfaces/IMidiaContentResponse";
import { ContentCard } from "@/components/ContentCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";

export function SavedContent() {
  const { getItem } = useLocalStorage("midia_contents");

  const getSavedMidiaContent = () => {
    const data = getItem();
    if (data) {
      return data;
    } else {
      return [];
    }
  };

  const [savedMidiaContent] = useState<IMidiaContent[]>(getSavedMidiaContent());

  const total_content = savedMidiaContent.length;
  const itemsPerPage = 10; // Set how many items to display per page
  const [page, setPage] = useState<number>(1);

  const totalPages = Math.ceil(total_content / itemsPerPage);

  const handlePaginationChange = (newPage: number) => {
    setPage(newPage);
  };

  const currentItems = savedMidiaContent.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const watched_content = 6;
  const percentage = (watched_content * 100) / total_content;

  return (
    <>
      <div className="w-[50%] h-fit mx-auto flex flex-col gap-2">
        <p className="font-bold">
          How much you've watched:{" "}
          <span className="font-normal">
            {watched_content}/{total_content}
          </span>
        </p>
        <Progress value={percentage} className="h-3" />
      </div>
      <MidiaContentSection
        title="Your saved content ⭐"
        pagination={
          <Pagination className="w-full flex flex-row self-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={`${
                    page === 1 ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  onClick={() => page > 1 && handlePaginationChange(page - 1)}
                />
              </PaginationItem>
              {page > 1 && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePaginationChange(1)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
              )}
              {page > 2 && <PaginationEllipsis />}
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  {page}
                </PaginationLink>
              </PaginationItem>
              {page < totalPages - 1 && <PaginationEllipsis />}
              {page < totalPages && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePaginationChange(totalPages)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  className={`${
                    page >= totalPages
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={() =>
                    page < totalPages && handlePaginationChange(page + 1)
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        }
      >
        {currentItems.map((content) => (
          <ContentCard
            key={content.imdbID}
            id={content.imdbID}
            image={content.Poster}
            title={content.Title}
            type={content.Type}
            year={content.Year}
          />
        ))}
      </MidiaContentSection>
    </>
  );
}
