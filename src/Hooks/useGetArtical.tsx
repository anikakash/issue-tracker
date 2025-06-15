import api from "./apiClient";
import { useQuery } from "@tanstack/react-query";

interface ArticleType {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

export const useGetArtical =  () => {
    const {data, isLoading, error} = useQuery<ArticleType[]>({
        queryKey: ["getArtical"],
        queryFn: async () => {
            const response = await api.get("/blog");
            return response.data;
        },
    })
    return { data, isLoading, error };
}
