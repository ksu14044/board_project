import { useQuery } from "@tanstack/react-query";
import { getCategoriesApi } from "../apis/boardApi";

export const useGetCategoryies = () => useQuery({
    queryKey: ["useGetCategories"],
    queryFn: getCategoriesApi,
    retry: 0,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 & 5,
})