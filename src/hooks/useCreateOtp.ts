  import { useMutation, UseMutationOptions } from "@tanstack/react-query";
  import axiosInstance from "@infra/api/axios.instance";
  import API_ENDPOINTS from "@infra/api/endPoints";
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

  interface CreateOtpResponse {
    success: boolean;
    message: string;
    data?: any;
  }

  export const useCreateOtp = (
    options?: UseMutationOptions<
      CreateOtpResponse,
      Error,
      CreateOtpPayload,
      unknown
    >
  ) => {
    return useMutation<CreateOtpResponse, Error, CreateOtpPayload>({
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
