import { MidiaContentSection } from "@/components/MidiaContentSection";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { IMidiaContent } from "@/constants/movies";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Star, Tv } from "lucide-react";
import { useEffect, useState } from "react";

export function WatchedContent() {
  const { getItem, removeItem } = useLocalStorage("movies");
  const [savedMovies, setSavedMovies] = useState<IMidiaContent[]>([]);

  useEffect(() => {
    const savedItems = getItem();
    setSavedMovies(savedItems || []);
  }, []);

  const handleRemoveMovie = (movie: IMidiaContent) => {
    removeItem();
    setSavedMovies((prev) =>
      prev.filter((item) => item.imdbID !== movie.imdbID)
    );
  };
  return (
    <MidiaContentSection title="Your watched content 😎">
      {savedMovies.map((movie) => (
        <Card
          key={movie.imdbID}
          className="relative dark:bg-slate-900 rounded-md shadow-md overflow-hidden w-fit"
        >
          <div className="absolute right-2 top-2 flex flex-row gap-2">
            <Button
              variant="outline"
              className="group cursor-pointer transition-colors duration-300 w-8 h-8"
              size="icon"
              onClick={() => handleRemoveMovie(movie)}
            >
              <Star
                className={`cursor-pointer transition-colors duration-300 ${
                  savedMovies.some(
                    (savedMovie) => savedMovie.imdbID === movie.imdbID
                  )
                    ? "fill-yellow-300"
                    : "text-gray-400"
                }`}
              />
            </Button>
            <Button
              variant="outline"
              className="group cursor-pointer transition-colors duration-300 w-8 h-8"
              size="icon"
            >
              <Tv className=" text-gray-400 group-hover:fill-sky-300 transition-colors duration-300" />
            </Button>
          </div>
          <CardContent className="h-[250px] sm:h-[300px] md:h-[400px] aspect-[2/3] p-0 pb-2">
            <img
              src={movie.Poster}
              alt="Card Image"
              className="w-full h-full object-cover mx-auto"
            />
          </CardContent>
          <CardFooter className="flex flex-col w-64 items-start pb-2 px-2 overflow-">
            <CardTitle className="text-lg font-medium break-words whitespace-normal">
              {movie.Title}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 flex flex-row gap-2 mt-2">
              <p>
                <span className="text-primary">Year: </span>
                {movie.Year}
              </p>
              <p>
                <span className="text-primary">Type: </span>
                {movie.Type}
              </p>
            </CardDescription>
          </CardFooter>
        </Card>
      ))}
    </MidiaContentSection>
  );
}
