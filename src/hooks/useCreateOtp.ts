import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axiosInstance, { ErrorData } from "@infra/api/axios.instance";
import API_ENDPOINTS from "@infra/api/endPoints";
import { AxiosError } from "axios";
interface CreateOtpPayload {
  phone_number: string;
}

interface CreateOtpResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface CreateOtpPayload {
  phone_number: string;
}

export const useCreateOtp = (
  options?: UseMutationOptions<
    CreateOtpResponse,
    AxiosError<ErrorData>,
    CreateOtpPayload,
    unknown
  >
) => {
  return useMutation<CreateOtpResponse, AxiosError<ErrorData>, CreateOtpPayload>({
    mutationFn: async (payload: CreateOtpPayload) => {
      const response = await axiosInstance.post(
        API_ENDPOINTS.sendOtpSms,
        payload
      );
      return response.data;
    },
    ...options,
  });
};
