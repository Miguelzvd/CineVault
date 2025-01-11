import { IMidiaContent } from "@/interfaces/IMidiaContentResponse";

export const useLocalStorage = (key: string) => {
  const getItem = (): IMidiaContent[] => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error("Failed to retrieve data from localStorage:", error);
      return [];
    }
  };

  const setItem = (midiaContent: IMidiaContent[]) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(midiaContent));
    } catch (error) {
      console.error("Failed to save data to localStorage:", error);
    }
  };

  const addItem = (midiaContent: IMidiaContent) => {
    const existingItems = getItem();
    if (!existingItems.some((item) => item.imdbID === midiaContent.imdbID)) {
      setItem([...existingItems, midiaContent]);
    }
  };

  const removeItem = (midiaContent: IMidiaContent) => {
    const existingItems = getItem();
    const updatedItems = existingItems.filter(
      (item) => item.imdbID !== midiaContent.imdbID
    );
    setItem(updatedItems);
  };

  return { getItem, setItem, addItem, removeItem };
};
