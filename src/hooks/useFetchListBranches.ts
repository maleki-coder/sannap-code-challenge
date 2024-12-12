import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axiosInstance from "@infra/api/axios.instance";
import API_ENDPOINTS from "@infra/api/endPoints";

interface FetchBranchesListResponse {
  success: boolean;
  message: string;
  data?: Array<{
    code: string;
    name: string;
    translation?: string;
  }>;
}

export const useFetchListBranches = (
  province_code: string,
  search_query: string,
  options?: UseQueryOptions<FetchBranchesListResponse, Error>
) => {
  return useQuery<FetchBranchesListResponse, Error>({
    queryKey: ["getBranches", province_code, search_query],
    queryFn: async () => {
      if (!province_code) {
        return { success: true, message: "No province selected", data: [] };
      }
      if (!search_query) {
        return { success: true, message: "No Search query", data: [] };
      }
      const response = await axiosInstance.get(API_ENDPOINTS.listOfBranches, {
        params: { province_code: province_code, search_query: search_query },
      });
      return response.data;
    },
    enabled: !!province_code,
    ...options,
  });
};
