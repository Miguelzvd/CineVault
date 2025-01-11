import { IMidiaContentResponse } from "@/constants/movies";
import axios from "axios";

const baseURL = "http://www.omdbapi.com/"
const key = import.meta.env.VITE_API_KEY

export const fetchMidiaContent = async (title:string | undefined): Promise<IMidiaContentResponse | undefined> => {
  const midia = await axios
    .get<IMidiaContentResponse>(`${baseURL}?s=${title}&apikey=${key}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error when fetching media data:", error);
      throw new Error("Error when fetching media data");
    });
    console.log("midia testing: ", midia)

  return midia;
};
