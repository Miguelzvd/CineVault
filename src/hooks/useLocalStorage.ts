export const useLocalStorage = (key: string) => {
  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        return Array.isArray(JSON.parse(item)) ? JSON.parse(item) : [];
      }
      return [];
    } catch (error) {
      console.log("Erro ao recuperar do localStorage:", error);
      return [];
    }
  };

  const setItem = (value: unknown) => {
    try {
      const existingItems = getItem();
      console.log(existingItems);
      if (value !== null && value !== undefined) {
        existingItems.push(value);
      }

      window.localStorage.setItem(key, JSON.stringify(existingItems));
    } catch (error) {
      console.log("Erro ao salvar no localStorage:", error);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.getItem(key);

    } catch (error) {
      console.log(error);
    }
  };

  return { setItem, getItem, removeItem };
};
