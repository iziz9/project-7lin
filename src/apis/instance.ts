import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getCookie, removeCookie, setCookie } from "../utils/cookie";

const API_BASE_URL: string = import.meta.env.VITE_BASE_URL;

const axiosApi = (url: string) => {
  const instance: AxiosInstance = axios.create({
    baseURL: url,
    timeout: 10000,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const accessToken = getCookie("accessToken");
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.status === 200) return response.data;
    },
    async (error) => {
      const originalRequest = error.config;

      switch (error.response?.status) {
        case 400:
          switch (error.response.data.code) {
            case "DUPLICATE_ID":
              return Promise.reject("이미 존재하는 아이디 입니다");
            case "ENTITY_NOT_FOUND":
              return Promise.reject("존재하지 않는 회원입니다");
            case "PASSWORD_NOT_MATCHS":
              return Promise.reject("비밀번호를 잘못 입력했습니다");
            default:
              break;
          }
          break;
        case 401:
          if (!originalRequest?._retry) {
            originalRequest._retry = true;
            try {
              const { data } = await axios.post(
                `${url}/reissue`,
                {},
                {
                  withCredentials: true,
                },
              );
              // access token과 refresh token 저장
              setCookie("accessToken", data.accessToken, {
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
                secure: true,
              });

              // 새로 발급받은 access token으로 요청 retry
              originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
              return instance(originalRequest);
            } catch (refreshTokenError) {
              // refresh token이 만료되거나 잘못된 경우 로그인 페이지로 이동 또는 다른 로직 수행
              removeCookie("accessToken", { path: "/" });
              alert("로그인시간 만료");
              return (window.location.href = "/login");
            }
          }
          break;
        case 404:
          switch (error.response.data.code) {
            case "PASSWORD_NOT_MATCHS":
              return Promise.reject("비밀번호를 잘못 입력했습니다");
            case "ENTITY_NOT_FOUND":
              return Promise.reject("해당하는 아이디가 존재하지 않습니다");
            case "RESERVATION-002":
              return Promise.reject("존재하지 않는 예약 내역 입니다.");
            default:
              break;
          }
          break;
        case 500:
          alert("서버 에러 ");
          removeCookie("accessToken", { path: "/" });
          return (window.location.href = "/login");
        default:
          break;
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export const axiosInstance = axiosApi(API_BASE_URL);
