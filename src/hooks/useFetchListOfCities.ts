import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axiosInstance from "@infra/api/axios.instance";
import API_ENDPOINTS from "@infra/api/endPoints";

interface GetCitiesResponse {
  success: boolean;
  message: string;
  data?: Array<{
    code: string;
    name: string;
    translation?: string;
  }>;
}

export const useFetchListOfCities = (
  province_code: string,
  options?: UseQueryOptions<GetCitiesResponse, Error>
) => {
  return useQuery<GetCitiesResponse, Error>({
    queryKey: ["getCities", province_code],
    queryFn: async () => {
      if (!province_code) {
        return { success: true, message: "No province selected", data: [] };
      }
      const response = await axiosInstance.get(API_ENDPOINTS.listOfCities, {
        params: { province_code: province_code },
      });
      return response.data;
    },
    enabled: !!province_code,
    ...options,
  });
};
