import { Input } from "@/components/ui/input";
import BoxReveal from "@/components/ui/box-reveal";
import { Search } from "lucide-react";
import { useState } from "react";
import { MidiaContentSection } from "@/components/MidiaContentSection";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useMidiaData } from "@/hooks/useMidiaData";
import { ContentCard } from "@/components/ContentCard";
import { movies } from "@/constants/movies";

export function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string | undefined>();
  // const {
  //   data: midiaContentResponse,
  //   isLoading,
  //   isError,
  // } = useMidiaData(searchValue || "");

  // const midiaContent = midiaContentResponse?.Search;

  const handleOnChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // if (isError) {
  //   return (
  //     <div className="flex flex-col items-center justify-center text-center py-10">
  //       <h2 className="text-2xl font-bold text-red-600">
  //         Something went wrong!
  //       </h2>
  //       <p className="text-gray-600 dark:text-gray-300">
  //         We couldn't fetch the data. Please try again later.
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="w-fit m-auto flex flex-col gap-2 items-center relative">
        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <h2 className="text-xl font-bold">What will your next title?</h2>
        </BoxReveal>

        <div className="w-96">
          <Input
            className="shadow-sm"
            placeholder="Search for a movie or series"
            value={inputValue}
            onChange={handleOnChangeText}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchValue(inputValue);
              }
            }}
            handleIconFunction={() => setSearchValue(inputValue)}
            icon={
              <Search className="group-hover:text-gray-900 dark:group-hover:text-gray-50 transition-colors duration-300" />
            }
          />
        </div>
      </div>

      {
        // isLoading ? (
        //   <div className="w-full flex justify-center items-center h-[20rem]">
        //     <LoadingSpinner />
        //   </div>
        // ) : midiaContent && midiaContent.length > 0 ?
        <MidiaContentSection title="Movies and Series">
          {movies.map((content) => (
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
        // ) : (
        //   <div className="flex flex-col items-center justify-center text-center py-10">
        //     <h2 className="text-2xl font-bold ">
        //       <span className="text-red-600">No results</span> found! :/
        //     </h2>
        //     <p className="text-gray-600 dark:text-gray-300">
        //       Try to search something diferente.
        //     </p>
        //   </div>
      }
    </>
  );
}
