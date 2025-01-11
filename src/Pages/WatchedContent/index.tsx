import { ContentCard } from "@/components/ContentCard";
import { MidiaContentSection } from "@/components/MidiaContentSection";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IMidiaContent } from "@/interfaces/IMidiaContentResponse";
import { useState } from "react";

export function WatchedContent() {
  const { getItem: getWatchedItem } = useLocalStorage("watched_contents");
  const [watchedContent] = useState<IMidiaContent[]>(
    () => getWatchedItem() || []
  );

  return (
    <MidiaContentSection title="Your watched content 📺">
      {watchedContent.map((content) => (
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
  );
}
