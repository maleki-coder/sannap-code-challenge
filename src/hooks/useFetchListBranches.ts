import { useQuery } from "@tanstack/react-query";
import axiosInstance, { ErrorData } from "@infra/api/axios.instance";
import API_ENDPOINTS from "@infra/api/endPoints";
import { AxiosError } from "axios";

interface FetchBranchesListResponse {
  county: number;
  id: number;
  insurance: number;
  name: string;
  province: number;
}

export const useFetchListBranches = (name: string, options?: any) => {
  return useQuery<Array<FetchBranchesListResponse>, AxiosError<ErrorData>>({
    queryKey: ["getBranches", name],
    queryFn: async () => {
      const response = await axiosInstance.get(API_ENDPOINTS.listOfBranches, {
        params: {
          province: 8,
          name: name,
          insurance: "DEY",
        },
      });
      return response.data['response'];
    },
    enabled: !!name,
    ...options,
  });
};
