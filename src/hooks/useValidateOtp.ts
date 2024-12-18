import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axiosInstance, { ErrorData } from "@infra/api/axios.instance";
import API_ENDPOINTS from "@infra/api/endPoints";
import { AxiosError } from "axios";
interface ValidateOtpPayload {
  phone_number: string;
  code :number;
}

interface ValidateOtpResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface ValidateOtpResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const useValidateOtp = (
  options?: UseMutationOptions<
    ValidateOtpResponse,
    AxiosError<ErrorData>,
    ValidateOtpPayload,
    unknown
  >
) => {
  return useMutation<ValidateOtpResponse, AxiosError<ErrorData>, ValidateOtpPayload>({
    mutationFn: async (payload: ValidateOtpPayload) => {
      const response = await axiosInstance.post(
        API_ENDPOINTS.validateOtp,
        payload
      );
      return response.data;
    },
    ...options,
  });
};
