import { Progress } from "@/components/ui/progress";
import { MidiaContentSection } from "@/components/MidiaContentSection";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState } from "react";
import { IMidiaContent } from "@/interfaces/IMidiaContentResponse";
import { ContentCard } from "@/components/ContentCard";

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

  console.log(localStorage.getItem("midia_contents"));

  const total_content = 10;

  const watched_content = 6;

  const percentage = (watched_content * 100) / total_content;

  return (
    <>
      <div className="w-[50%] h-fit mx-auto flex flex-col gap-2">
        <p className="font-bold">
          How much you've watched:{" "}
          <span className="font-normal">
            {watched_content}/{total_content}
          </span>
        </p>
        <Progress value={percentage} className="h-3" />
      </div>
      <MidiaContentSection title="Your saved content ⭐">
        {savedMidiaContent.map((content) => (
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
