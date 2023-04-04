import { atom } from "recoil";
import { getLocalStorage } from "../utils/localStorage";

interface UserInfoState {
  name: string;
  email: string;
  gender: string;
  age: number;
}

export const userInfoState = atom<UserInfoState>({
  key: "userInfoState",
  default: {
    name: getLocalStorage("userInfo").name || "",
    email: getLocalStorage("userInfo").email || "",
    gender: getLocalStorage("userInfo").gender || "",
    age: getLocalStorage("userInfo").age || 0,
  },
});
