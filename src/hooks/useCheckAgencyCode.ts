import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "@infra/api/axios.instance";
import API_ENDPOINTS from "@infra/api/endPoints";
interface CheckAgencyCodePayload {
  agent_code: string;
}

interface CheckAgencyCodeResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const useCheckAgencyCode = (
  options?: UseMutationOptions<
    CheckAgencyCodeResponse,
    Error,
    CheckAgencyCodePayload,
    unknown
  >
) => {
  return useMutation<CheckAgencyCodeResponse, Error, CheckAgencyCodePayload>({
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
