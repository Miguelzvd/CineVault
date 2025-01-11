import { fetchMidiaContent } from "@/services/fetchMidiaContent";
import { useQuery } from "@tanstack/react-query";

export function useMidiaData(title: string | undefined) {
  const query = useQuery({
    queryFn: () => fetchMidiaContent(title),
    queryKey: ["midia", { title }],
    staleTime: Infinity,
    retry: 2,
  });
  return query;
}
