import { fetchMidiaContent } from "@/services/fetchMidiaContent";
import { useQuery } from "@tanstack/react-query";

export function useMidiaData(title: string | undefined, page: number) {
  const query = useQuery({
    queryFn: () => fetchMidiaContent(title, page),
    queryKey: ["midia", { title, page }],
    staleTime: Infinity,
    retry: 2,
  });
  return query;
}
