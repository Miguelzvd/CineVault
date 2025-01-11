import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import BoxReveal from "@/components/ui/box-reveal";
import { IMidiaContent, movies } from "@/constants/movies";
import { Button } from "@/components/ui/button";
import { Search, Star, Tv } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { MidiaContentSection } from "@/components/MidiaContentSection";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useMidiaData } from "@/hooks/useMidiaData";

export function Home() {
  const {
    setItem,
    getItem,
    // removeItem
  } = useLocalStorage("movies");
  const [savedMovies, setSavedMovies] = useState<IMidiaContent[]>([]);
  const [inputValue, setInputValue] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>();
  const { data: midiaContent, isLoading, isError } = useMidiaData(searchValue);

  console.log(midiaContent);
  useEffect(() => {
    const savedItems = getItem();
    setSavedMovies(savedItems || []);
  }, []);

  console.log(inputValue);

  const handleSaveMovie = (movie: IMidiaContent) => {
    const updatedMovies = [...savedMovies, movie];
    setSavedMovies(updatedMovies);
    setItem(updatedMovies);
  };

  const handleRemoveMovie = (movie: IMidiaContent) => {
    const updatedMovies = savedMovies.filter(
      (item) => item.imdbID !== movie.imdbID
    );
    setSavedMovies(updatedMovies);
    setItem(updatedMovies);
  };

  const handleOnChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className="w-fit m-auto flex flex-col gap-2 items-center relative">
        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <h2 className="text-xl font-bold">What will your next title ?</h2>
        </BoxReveal>

        <div className="w-96">
          <Input
            className="shadow-sm"
            placeholder="Search for a movie or series"
            value={inputValue}
            onChange={(text) => {
              handleOnChangeText(text);
            }}
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

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <MidiaContentSection title="Movies and Series">
          {(midiaContent && midiaContent.Search.length > 0
            ? midiaContent.Search
            : movies
          ).map((content) => (
            <Card
              key={content.imdbID}
              className="relative dark:bg-slate-900 rounded-md shadow-md overflow-hidden w-fit"
            >
              <div className="absolute right-2 top-2 flex flex-row gap-2">
                <Button
                  variant="outline"
                  className="group cursor-pointer transition-colors duration-300 w-8 h-8"
                  size="icon"
                  onClick={() =>
                    savedMovies.some(
                      (savedMovie) => savedMovie.imdbID === content.imdbID
                    )
                      ? handleRemoveMovie(content)
                      : handleSaveMovie(content)
                  }
                >
                  <Star
                    className={`cursor-pointer transition-colors duration-300 ${
                      savedMovies.some(
                        (savedMovie) => savedMovie.imdbID === content.imdbID
                      )
                        ? "fill-yellow-300"
                        : "text-gray-400"
                    }`}
                  />
                </Button>
                {/* Botão com ícone de TV */}
                <Button
                  variant="outline"
                  className="group cursor-pointer transition-colors duration-300 w-8 h-8"
                  size="icon"
                >
                  <Tv className="text-gray-400 group-hover:fill-sky-300 transition-colors duration-300" />
                </Button>
              </div>

              {/* Conteúdo principal */}
              <CardContent className="h-[250px] sm:h-[300px] md:h-[400px] aspect-[2/3] p-0 pb-2">
                <img
                  src={content.Poster}
                  alt={content.Title}
                  className="w-full h-full object-cover mx-auto"
                />
              </CardContent>

              {/* Rodapé do card */}
              <CardFooter className="flex flex-col w-64 items-start pb-2 px-2">
                <CardTitle className="text-lg font-medium break-words whitespace-normal">
                  {content.Title}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 flex flex-row gap-2 mt-2">
                  <p>
                    <span className="text-primary">Year: </span>
                    {content.Year}
                  </p>
                  <p>
                    <span className="text-primary">Type: </span>
                    {content.Type}
                  </p>
                </CardDescription>
              </CardFooter>
            </Card>
          ))}
          {!midiaContent && (
            <p className="text-center text-gray-500 dark:text-gray-300 mt-4">
              No results found. Showing initial recommendations.
            </p>
          )}
        </MidiaContentSection>
      )}
    </>
  );
}
