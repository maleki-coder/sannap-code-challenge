import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "@infra/api/axios.instance";
import API_ENDPOINTS from "@infra/api/endPoints";
import { RepresentativeRegistration } from "@store/useRepresentativeStore";
interface SignUpPayload extends RepresentativeRegistration {}

interface SignUpResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const useSignUp = (
  options?: UseMutationOptions<SignUpResponse, Error, SignUpPayload, unknown>
) => {
  return useMutation<SignUpResponse, Error, SignUpPayload>({
    mutationFn: async (payload: SignUpPayload) => {
        console.log(payload);
      const response = await axiosInstance.post(
        API_ENDPOINTS.signUp,
        payload
      );
      return response.data;
    },
    ...options,
  });
};
