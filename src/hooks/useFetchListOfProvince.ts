import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axiosInstance from "@infra/api/axios.instance";
import API_ENDPOINTS from "@infra/api/endPoints";

interface GetProvincesResponse {
  success: boolean;
  message: string;
  data?: Array<{
    code: string;
    name: string;
    translation?: string;
  }>;
}

export const useFetchListOfProvinces = (
  options?: UseQueryOptions<GetProvincesResponse, Error>
) => {
  return useQuery<GetProvincesResponse, Error>({
    queryKey: ["getProvinces"],
    queryFn: async () => {
      const response = await axiosInstance.get(API_ENDPOINTS.listOfProvinces);
      return response.data;
    },
    ...options,
  });
};
