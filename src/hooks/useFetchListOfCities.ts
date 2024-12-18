import { useQuery } from "@tanstack/react-query";
import axiosInstance, { ErrorData } from "@infra/api/axios.instance";
import API_ENDPOINTS from "@infra/api/endPoints";
import { AxiosError } from "axios";

interface GetCitiesResponse {
  code: string;
  country: number;
  creator_user: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
  };
  id: number;
  is_active: boolean;
  name: string;
  name_split: string;
}

export const useFetchListOfCities = (province_code: number, options?: any) => {
  return useQuery<Array<GetCitiesResponse>, AxiosError<ErrorData>>({
    queryKey: ["getCities", province_code],
    queryFn: async () => {
      if (!province_code) {
        return { success: true, message: "No province selected", data: [] };
      }
      const response = await axiosInstance.get(API_ENDPOINTS.listOfCities, {
        params: { province_code: province_code },
        // params: { province_code: 2 },
      });
      return response.data;
    },
    enabled: !!province_code,
    ...options,
  });
};
