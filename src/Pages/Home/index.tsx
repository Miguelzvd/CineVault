import { Input } from "@/components/ui/input";
import BoxReveal from "@/components/ui/box-reveal";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { MidiaContentSection } from "@/components/MidiaContentSection";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useMidiaData } from "@/hooks/useMidiaData";
import { ContentCard } from "@/components/ContentCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";

export function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string | undefined>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [itemsLength, setItemsLength] = useState(5);

  const {
    data: midiaContentResponse,
    isLoading,
    isError,
  } = useMidiaData(searchValue, page);

  const midiaContent = midiaContentResponse?.Search;
  const totalResults = midiaContentResponse?.totalResults
    ? Number(midiaContentResponse.totalResults)
    : 0;

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

  const totalPages = Math.ceil(totalResults / pageSize);

  const handlePaginationChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleOnChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 border-[0.5px] m-auto w-[95%] min-h-[70vh] gap-8 p-6 mb-8 rounded-md shadow-sm">
        <h2 className="text-2xl font-bold text-red-600">
          Something went wrong!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          We couldn't fetch the data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="w-fit m-auto flex flex-col gap-2 items-center relative">
        <BoxReveal boxColor={"#f7cb2c"} duration={0.5}>
          <h2 className="text-xl font-bold">What will be your next title?</h2>
        </BoxReveal>

        <div className="w-72 sm:w-96">
          <Input
            className="shadow-sm"
            placeholder="Search for a movie or series"
            value={inputValue}
            onChange={handleOnChangeText}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchValue(inputValue);
                setPage(1);
              }
            }}
            handleIconFunction={() => setSearchValue(inputValue)}
            icon={
              <Search className="group-hover:text-gray-900 dark:group-hover:text-gray-50 transition-colors duration-300" />
            }
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center text-center py-10 border-[0.5px] m-auto w-[95%] min-h-[70vh] gap-8 p-6 mb-8 rounded-md shadow-sm">
          <LoadingSpinner />
        </div>
      ) : midiaContent && midiaContent.length > 0 ? (
        <>
          <MidiaContentSection
            title="Movies and Series"
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
                      onClick={() =>
                        page > 1 && handlePaginationChange(page - 1)
                      }
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
            {midiaContent.map((content) => (
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
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-10">
          <h2 className="text-2xl font-bold ">
            <span className="text-red-600">No results</span> found! :/
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Try to search something different.
          </p>
        </div>
      )}
    </>
  );
}
