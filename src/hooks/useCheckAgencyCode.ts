import { useMutation } from "@tanstack/react-query";
import axiosInstance, { ErrorData } from "@infra/api/axios.instance";
import API_ENDPOINTS from "@infra/api/endPoints";
import { AxiosError } from "axios";
interface CheckAgencyCodePayload {
  agent_code: string;
}

interface CheckAgencyCodeResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const useCheckAgencyCode = (
  options?: any
) => {
  return useMutation<CheckAgencyCodeResponse, AxiosError<ErrorData>, CheckAgencyCodePayload>({
    mutationFn: async (payload: CheckAgencyCodePayload) => {
      const response = await axiosInstance.post(
        API_ENDPOINTS.checkAgencyCode,
        payload
      );
      return response.data;
    },
    ...options,
  });
};
