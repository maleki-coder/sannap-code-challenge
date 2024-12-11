import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "@infra/api/axios.instance";
import API_ENDPOINTS from "@infra/api/endPoints";
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
    Error,
    ValidateOtpPayload,
    unknown
  >
) => {
  return useMutation<ValidateOtpResponse, Error, ValidateOtpPayload>({
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
