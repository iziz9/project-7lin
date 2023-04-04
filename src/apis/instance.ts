import axios, { AxiosError } from "axios";
import { getCookie, setCookie } from "../utils/cookie";

const API_BASE_URL: string = import.meta.env.VITE_BASE_URL;

const axiosApi = (url: string) => {
  const instance = axios.create({ baseURL: url });
  instance.defaults.timeout = 5000;

  instance.interceptors.request.use(
    (config) => {
      const accessToken = getCookie("accessToken");
      if (accessToken)
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      console.log(response);
      if (response.status === 200) return response.data;
      // else throw AxiosError;
    },
    async (error: AxiosError) => {
      console.log(error);
      const originalConfig = error.config;

      // if (error.response) {
      //   // Access Token was expired
      //   if (error.response.status === 401) {
      //     try {
      //       const res = await refreshToken();
      //       const { accessToken } = res.data;
      //       setCookie("accessToken", accessToken, {
      //         path: "/",
      //         maxAge: 1800,
      //       });
      //       instance.defaults.headers.common["Authorization"] = accessToken;

      //       return await instance(originalConfig!);
      //     } catch (_error: any) {
      //       //
      //       return (window.location.href = "/login");
      //     }
      //   }

      //   if (error.response.status === 403 && error.response.data) {
      //     return Promise.reject(error.response.data);
      //   }
      // }
      return Promise.reject(error);
    },
  );

  return instance;
};

export const axiosInstance = axiosApi(API_BASE_URL);
