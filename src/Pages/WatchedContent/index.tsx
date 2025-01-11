import { ContentCard } from "@/components/ContentCard";
import { MidiaContentSection } from "@/components/MidiaContentSection";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IMidiaContent } from "@/interfaces/IMidiaContentResponse";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";

export function WatchedContent() {
  const { getItem: getWatchedItem } = useLocalStorage("watched_contents");
  const [watchedContent] = useState<IMidiaContent[]>(
    () => getWatchedItem() || []
  );

  const total_content = watchedContent.length;
  const itemsPerPage = 10;
  const [page, setPage] = useState<number>(1);

  const totalPages = Math.ceil(total_content / itemsPerPage);

  const handlePaginationChange = (newPage: number) => {
    setPage(newPage);
  };

  const currentItems = watchedContent.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <MidiaContentSection
      title="Your watched content 📺"
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
                  page >= totalPages ? "cursor-not-allowed" : "cursor-pointer"
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
  );
}
