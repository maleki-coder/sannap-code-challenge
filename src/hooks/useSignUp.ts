import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@infra/api/axios.instance";
import API_ENDPOINTS from "@infra/api/endPoints";
import { RepresentativeRegistration } from "@/models/index";
interface SignUpPayload extends RepresentativeRegistration {}

interface SignUpResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const useSignUp = (
  options?: any
) => {
  return useMutation<SignUpResponse, Error, SignUpPayload>({
    mutationFn: async (payload: SignUpPayload) => {
      const response = await axiosInstance.post(
        API_ENDPOINTS.signUp,
        payload
      );
      return response.data;
    },
    ...options,
  });
};
