import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, arg: any, option?: object) => {
  return cookies.set(name, arg, option);
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  return cookies.remove(name);
};
