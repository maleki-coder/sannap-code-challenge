import axios, { AxiosError } from "axios";

interface ErrorDetails {
  type?: string;
  code?: string;
  attr?: string;
  detail?: string;
  fa_details?: string;
}

export interface ErrorData {
  message?: string;
  is_success?: boolean;
  error_details?: ErrorDetails;
}

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  async (response) => {
    // For successful responses, return the response as-is
    return response;
  },
  (error: AxiosError): Promise<AxiosError<ErrorData>> => {
    const responseData = error.response.data as ErrorData;

    // Restructure the error object
    const customError: AxiosError<ErrorData> = {
      ...error,
      response: {
        ...error.response,
        data: {
          ...responseData,
          message: responseData.message || error.message,
          is_success: responseData.is_success || false,
        },
      },
    };

    return Promise.reject(customError);
  }
);

export default axiosInstance;
