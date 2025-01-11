import { Search, Star, Tv } from "lucide-react";
import { Header } from "./components/Header";
import { Input } from "./components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import { ThemeProvider } from "@/components/theme-provider";
import BoxReveal from "./components/ui/box-reveal";
import { IMovies, movies } from "./constants/movies";
import { Button } from "./components/ui/button";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useEffect, useState } from "react";

function App() {
  const { setItem, getItem, removeItem } = useLocalStorage("movies");
  const [savedMovies, setSavedMovies] = useState<IMovies[]>([]);

  // Carrega os filmes salvos do localStorage quando o componente é montado
  useEffect(() => {
    const savedItems = getItem();
    setSavedMovies(savedItems || []);
  }, [getItem]);

  const handleSaveMovie = (movie: IMovies) => {
    setItem(movie);
    setSavedMovies((prev) => [...prev, movie]); // Atualiza a lista de filmes salvos
  };

  const handleRemoveMovie = (movie: IMovies) => {
    removeItem();
    setSavedMovies((prev) => prev.filter((item) => item.imdbID !== movie.imdbID)); // Remove o filme da lista
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col gap-16 ">
        <Header />

        {/* Search */}
        <div className="w-fit m-auto flex flex-col gap-2 items-center relative">
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <h2 className="text-xl font-bold">What is your next title ?</h2>
          </BoxReveal>

          <div className="w-96">
            <Input
              className="shadow-sm"
              icon={
                <Search className="group-hover:text-gray-900 dark:group-hover:text-gray-50 transition-colors duration-300" />
              }
            />
          </div>
        </div>

        {/* CardContentGroup */}
        <div className="m-auto w-[95%] h-fit flex flex-col gap-8 p-6 mb-8 border-[0.5px] rounded-md">
          {/* Title */}
          <h2 className="text-xl font-bold w-full text-center">
            What about these films and series?
          </h2>

          {/* Cards*/}
          <div className="grid items-center justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 max-w-full">
            {movies.map((movie) => (
              <Card key={movie.imdbID} className="relative dark:bg-slate-900 rounded-md shadow-md overflow-hidden w-fit">
                <div className="absolute right-2 top-2 flex flex-row gap-2">
                  <Button
                    variant="outline"
                    className="group cursor-pointer transition-colors duration-300 w-8 h-8"
                    size="icon"
                    onClick={() =>
                      savedMovies.some((savedMovie) => savedMovie.imdbID === movie.imdbID)
                        ? handleRemoveMovie(movie)
                        : handleSaveMovie(movie)
                    }
                  >
                    <Star
                      className={`cursor-pointer transition-colors duration-300 ${
                        savedMovies.some((savedMovie) => savedMovie.imdbID === movie.imdbID)
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
                <CardContent className="w-[200px] sm:w-[230px] md:w-[265px] aspect-[2/3] p-0 pb-2">
                  <img
                    src={movie.Poster}
                    alt="Card Image"
                    className="w-full h-full object-cover mx-auto"
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-start pb-2 px-2">
                  <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
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
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
