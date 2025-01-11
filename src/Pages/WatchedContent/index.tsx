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
import { Progress } from "@/components/ui/progress";

const NoContentMessage = () => (
  <div className="flex justify-center items-center w-[70% ] h-[300px] ">
    <p className="text-xl font-semibold">
      You haven't watched anything yet. Start adding your favorite{" "}
      <strong className="text-yellow-500">movies</strong>,{" "}
      <strong className="text-yellow-500">series</strong>, and{" "}
      <strong className="text-yellow-500">episodes</strong> on the{" "}
      <a
        href="/"
        className="text-blue-500 hover:text-blue-700 underline transition-all duration-300"
      >
        home page
      </a>
      ! 🎥
    </p>
  </div>
);

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

  const countMovies = watchedContent.filter(
    (content) => content.Type === "movie"
  ).length;
  const countSeries = watchedContent.filter(
    (content) => content.Type === "series"
  ).length;
  const countEpisodes = watchedContent.filter(
    (content) => content.Type === "episode"
  ).length;

  const movieProgress = (countMovies / total_content) * 100;
  const seriesProgress = (countSeries / total_content) * 100;
  const episodeProgress = (countEpisodes / total_content) * 100;

  return (
    <>
      <div className="w-[50%] h-fit mx-auto flex flex-col gap-4 shadow-sm p-4 rounded-sm border-[0.5px]">
        <h2 className="text-xl font-semibold text-center">
          Your watched content 📺
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="font-bold text-lg">Movies: {countMovies}</p>
            <Progress value={movieProgress} className="w-[80%]" color="green" />
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold text-lg">Series: {countSeries}</p>
            <Progress value={seriesProgress} className="w-[80%]" color="blue" />
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold text-lg">
              Series Episodes: {countEpisodes}
            </p>
            <Progress
              value={episodeProgress}
              className="w-[80%]"
              color="purple"
            />
          </div>
        </div>
      </div>

      {total_content === 0 ? (
        <NoContentMessage />
      ) : (
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
      )}
    </>
  );
}
