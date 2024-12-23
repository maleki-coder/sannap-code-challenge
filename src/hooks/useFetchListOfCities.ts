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

export const useFetchListOfCities = (province: string, options?: any) => {
  return useQuery<Array<GetCitiesResponse>, AxiosError<ErrorData>>({
    queryKey: ["getCities", province],
    queryFn: async () => {
      if (!province) {
        return { success: true, message: "No province selected", data: [] };
      }
      const response = await axiosInstance.get(API_ENDPOINTS.listOfCities, {
        params: { province: province }
      });
      return response.data;
    },
    enabled: !!province,
    ...options,
  });
};
