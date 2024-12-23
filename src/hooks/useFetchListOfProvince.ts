import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@infra/api/axios.instance";
import API_ENDPOINTS from "@infra/api/endPoints";
import { AxiosError } from "axios";

interface GetProvincesResponse {
  code: string;
  country: number;
  creator_user: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
  };
  id: string;
  is_active: boolean;
  name: string;
  name_split: string;
}

export const useFetchListOfProvinces = (options?: any) => {
  return useQuery<Array<GetProvincesResponse>, AxiosError<Error>>({
    queryKey: ["getProvinces"],
    queryFn: async () => {
      const response = await axiosInstance.get(API_ENDPOINTS.listOfProvinces);
      return response.data;
    },
    ...options,
  });
};
