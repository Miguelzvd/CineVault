import { MidiaContentSection } from "@/components/MidiaContentSection";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
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
import { Progress } from "@/components/ui/progress";

export function SavedContent() {
  const { getItem } = useLocalStorage("midia_contents");

  const [savedMidiaContent] = useState<IMidiaContent[]>(() => getItem() || []);
  const [itemsLength, setItemsLength] = useState(5);
  const total_content = savedMidiaContent.length;
  const itemsPerPage = 10;
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const updateItemsLength = () => {
      // sm
      if (window.innerWidth <= 640) {
        setItemsLength(2);
      }
      // md
      else if (window.innerWidth <= 768) {
        setItemsLength(3);
      }
      // Default
      else {
        setItemsLength(5);
      }
    };

    updateItemsLength();
    window.addEventListener("resize", updateItemsLength);

    return () => window.removeEventListener("resize", updateItemsLength);
  }, []);

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

  const NoContentMessage = () => (
    <div className="flex justify-center items-center mx-auto border-[0.5px] rounded-sm w-[95%] min-h-[70vh] mb-8 shadow-sm">
      <p className="text-xl font-semibold p-4">
        You haven't saved anything yet. Start adding your favorite{" "}
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

  const movieProgress = (countMovies / total_content) * 100;
  const seriesProgress = (countSeries / total_content) * 100;
  const episodeProgress = (countEpisodes / total_content) * 100;

  return (
    <>
      <div className="w-[95%] lg:w-[65%] h-fit mx-auto flex flex-col gap-4 shadow-sm p-4 pb-8 lg:pb-4 rounded-sm border-[0.5px]">
        <h2 className="text-xl font-semibold text-center">
          Your saved content ⭐
        </h2>

        <p className="font-bold text-base lg:text-lg  text-center">
          Total: {total_content}
        </p>

        <hr className="" />

        <div className="flex flex-col gap-8 lg:gap-4">
          <div className="flex justify-between items-center flex-col lg:flex-row gap-4">
            <p className="font-bold text-base lg:text-lg  text-center w-40">
              Movies: {countMovies}
            </p>
            <Progress value={movieProgress} className="w-[80%]" />
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
            <Progress value={episodeProgress} className="w-[80%]" />
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
                      page === 1
                        ? "cursor-not-allowed hover:bg-transparent text-gray-400"
                        : "cursor-pointer"
                    }`}
                    onClick={() => page > 1 && handlePaginationChange(page - 1)}
                  />
                </PaginationItem>

                {(page > 3 && itemsLength > 2) ||
                (itemsLength <= 2 &&
                  page >= totalPages - 2 &&
                  totalPages !== 1) ? (
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePaginationChange(1)}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                ) : null}

                {(page > 3 && itemsLength > 2) ||
                (itemsLength <= 2 &&
                  page >= totalPages - 2 &&
                  totalPages !== 1) ? (
                  <PaginationEllipsis />
                ) : null}

                {itemsLength > 2 ? (
                  Array.from(
                    { length: itemsLength },
                    (_, index) => index + page - 2
                  )
                    .filter((p) => p > 0 && p <= totalPages)
                    .map((p) => (
                      <PaginationItem key={p}>
                        <PaginationLink
                          href="#"
                          isActive={p === page}
                          onClick={() => handlePaginationChange(p)}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    ))
                ) : (
                  <PaginationItem>
                    <PaginationLink href="#" isActive={true}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {page < totalPages - 2 && <PaginationEllipsis />}

                {page < totalPages - 2 && (
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
                        ? "cursor-not-allowed hover:bg-transparent text-gray-400"
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
