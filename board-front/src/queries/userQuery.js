import { useQuery } from "@tanstack/react-query";
import { getUserMe, getUserMeApi } from "../apis/userApi";

export const useuserMeQuery = () => useQuery({
    queryKey: ["userMeQuery"],
    queryFn: getUserMeApi,
    staleTime: 1000 * 60 * 20, // 데이터가 fresh한 시간
    gcTime: 1000 * 60 * 10, // 상한 데이터를 지우는 시간
});