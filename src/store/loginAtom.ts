import { atom } from "recoil";
import { getLocalStorage } from "../utils/localStorage";

interface LoginState {
  isLogin: boolean;
}

export const loginState = atom<LoginState>({
  key: "loginState",
  default: {
    isLogin: getLocalStorage("loginStatus").isLogin || false,
  },
});
