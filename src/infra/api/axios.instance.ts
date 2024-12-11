
import axios, { AxiosError } from "axios";
export interface CustomAxiosError extends AxiosError {
  handled?: boolean;
}
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  httpsAgent: false,
});
axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: CustomAxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
