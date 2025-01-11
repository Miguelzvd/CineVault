import { IMidiaContentResponse } from "@/interfaces/IMidiaContentResponse";
import axios from "axios";

const baseURL = "http://www.omdbapi.com/";
const key = import.meta.env.VITE_API_KEY;

export const fetchMidiaContent = async (
  title?: string,
  page: number = 1, // Parâmetro da página
): Promise<IMidiaContentResponse | undefined> => {
  let queryString: string;

  // Verificando se o título foi passado
  if (!title) {
    queryString = `s=movie&type=movie&y=2024&apikey=${key}&page=${page}&r=json`;
  } else {
    const queryParams = [`s=${title}`, `apikey=${key}`, `page=${page}`, `r=json`];
    queryString = queryParams.join("&");
  }

  const midia = await axios
    .get<IMidiaContentResponse>(`${baseURL}?${queryString}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error when fetching media data:", error);
      throw new Error("Error when fetching media data");
    });

  console.log("midia testing: ", midia);
  console.log(`${baseURL}?${queryString}`);
  return midia;
};
