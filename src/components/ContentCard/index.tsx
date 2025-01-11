import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Tv } from "lucide-react";
import { IMidiaContent } from "@/interfaces/IMidiaContentResponse";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import default_image_content from "@/assets/photos/default-content-image.png";

interface ContentCardProps {
  id: string;
  title: string;
  image: string;
  year: string;
  type: string;
}

export const ContentCard = ({
  id,
  title,
  image,
  year,
  type,
}: ContentCardProps) => {
  const { getItem, removeItem, addItem } = useLocalStorage("midia_contents");
  const {
    getItem: getWatchedItem,
    addItem: addWatchedItem,
    removeItem: removeWatchedItem,
  } = useLocalStorage("watched_contents");

  const [savedMidiaContent, setSavedMidiaContent] = useState<IMidiaContent[]>(
    () => getItem() || []
  );
  const [watchedContent, setWatchedContent] = useState<IMidiaContent[]>(
    () => getWatchedItem() || []
  );

  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isWatched, setIsWatched] = useState<boolean>(false);

  const handleSaveMidiaContent = (content: IMidiaContent) => {
    try {
      const updatedMidiaContent = [...savedMidiaContent, content];
      setSavedMidiaContent(updatedMidiaContent);
      addItem(content);
      toast.success("This content was saved successfully");
    } catch (error) {
      console.error("Failed to save content:", error);
    }
  };

  const handleRemoveMidiaContent = (content: IMidiaContent) => {
    try {
      const updatedMidiaContent = savedMidiaContent.filter(
        (item) => item.imdbID !== content.imdbID
      );

      if (updatedMidiaContent.length !== savedMidiaContent.length) {
        setSavedMidiaContent(updatedMidiaContent);
        removeItem(content);
        toast.success("This content was removed successfully");
      } else {
        toast.error("Content not found, cannot remove");
      }
    } catch (error) {
      console.error("Failed to remove content:", error);
    }
  };

  const handleMarkAsWatched = (content: IMidiaContent) => {
    try {
      if (!watchedContent.some((item) => item.imdbID === content.imdbID)) {
        const updatedWatchedContent = [...watchedContent, content];
        setWatchedContent(updatedWatchedContent);
        addWatchedItem(content);
        toast.success("Content marked as watched");
      } else {
        toast.error("Content already marked as watched");
      }
    } catch (error) {
      console.error("Failed to mark content as watched:", error);
    }
  };

  const handleUnmarkAsWatched = (content: IMidiaContent) => {
    try {
      const updatedWatchedContent = watchedContent.filter(
        (item) => item.imdbID !== content.imdbID
      );

      if (updatedWatchedContent.length !== watchedContent.length) {
        setWatchedContent(updatedWatchedContent);
        removeWatchedItem(content);
        toast.success("Content unmarked as watched");
      } else {
        toast.error("Content not found in watched list");
      }
    } catch (error) {
      console.error("Failed to unmark content as watched:", error);
    }
  };

  useEffect(() => {
    setIsSaved(savedMidiaContent.some((saved) => saved.imdbID === id));
    setIsWatched(watchedContent.some((watched) => watched.imdbID === id));
  }, [savedMidiaContent, watchedContent, id]);

  const midia_content = {
    imdbID: id,
    Title: title,
    Poster: image,
    Year: year,
    Type: type,
  };

  return (
    <Card
      key={id}
      className="relative dark:bg-slate-900 rounded-md shadow-md overflow-hidden w-fit"
    >
      <div className="absolute right-2 top-2 flex flex-row gap-2">
        <Button
          variant="outline"
          className="group cursor-pointer transition-colors duration-300 w-8 h-8"
          size="icon"
          onClick={() =>
            isSaved
              ? handleRemoveMidiaContent(midia_content)
              : handleSaveMidiaContent(midia_content)
          }
        >
          <Star
            className={`cursor-pointer transition-colors duration-300 ${
              isSaved ? "fill-yellow-300" : "text-gray-400"
            }`}
          />
        </Button>
        <Button
          variant="outline"
          className="group cursor-pointer transition-colors duration-300 w-8 h-8"
          size="icon"
          onClick={() =>
            isWatched
              ? handleUnmarkAsWatched(midia_content)
              : handleMarkAsWatched(midia_content)
          }
        >
          <Tv
            className={`cursor-pointer transition-colors duration-300 ${
              isWatched ? "fill-sky-300" : "text-gray-400"
            }`}
          />
        </Button>
      </div>
      <CardContent className="h-[250px] sm:h-[300px] md:h-[400px] aspect-[2/3] p-0 pb-2">
        <img
          src={image === "N/A" ? default_image_content : image}
          alt="Card Image"
          className="w-full h-full object-cover mx-auto"
        />
      </CardContent>
      <CardFooter className="flex flex-col w-64 items-start pb-2 px-2 overflow-hidden">
        <CardTitle className="text-lg font-medium break-words whitespace-normal">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 flex flex-row gap-2 mt-2">
          <p>
            <span className="text-primary">Year: </span>
            {year}
          </p>
          <p>
            <span className="text-primary">Type: </span>
            {type}
          </p>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};
