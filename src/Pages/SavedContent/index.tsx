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
import { Progress } from "@/components/ui/progress"; // Assuming Progress is a reusable component

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
  const itemsPerPage = 10;
  const [page, setPage] = useState<number>(1);

  const totalPages = Math.ceil(total_content / itemsPerPage);

  const handlePaginationChange = (newPage: number) => {
    setPage(newPage);
  };

  const currentItems = savedMidiaContent.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const countMovies = savedMidiaContent.filter(
    (content) => content.Type === "movie"
  ).length;
  const countSeries = savedMidiaContent.filter(
    (content) => content.Type === "series"
  ).length;
  const countEpisodes = savedMidiaContent.filter(
    (content) => content.Type === "episode"
  ).length;

  const movieProgress = (countMovies / total_content) * 100;
  const seriesProgress = (countSeries / total_content) * 100;
  const episodeProgress = (countEpisodes / total_content) * 100;

  return (
    <>
      <div className="min-w-[50%] h-fit mx-auto flex flex-col gap-4 shadow-sm p-4 rounded-sm border-[0.5px]">
        <h2 className="text-xl font-semibold text-center">
          Your saved content ⭐
        </h2>

        <p className="font-bold text-base lg:text-lg  text-center">
          Total: {countMovies}
        </p>

        <hr className="" />

        <div className="flex flex-col gap-8 lg:gap-4">
          <div className="flex justify-between items-center flex-col lg:flex-row gap-4">
            <p className="font-bold text-base lg:text-lg  text-center w-40">
              Movies: {countMovies}
            </p>
            <Progress value={movieProgress} className="w-[80%]"  />
          </div>

          <hr className="" />

          <div className="flex justify-between items-center flex-col lg:flex-row gap-4">
            <p className="font-bold text-base lg:text-lg  text-center w-40">
              Series: {countSeries}
            </p>
            <Progress value={seriesProgress} className="w-[80%]" />
          </div>

          <hr className="" />

          <div className="flex justify-between items-center flex-col lg:flex-row gap-4">
            <p className="font-bold text-base lg:text-lg  text-center w-40">
              Series Episodes: {countEpisodes}
            </p>
            <Progress
              value={episodeProgress}
              className="w-[80%]"
            />
          </div>
        </div>
      </div>

      <MidiaContentSection
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
    </>
  );
}
