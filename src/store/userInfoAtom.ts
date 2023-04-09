import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface UserInfoState {
  name: string;
  email: string;
  gender: string;
  age: number;
  phone: string;
}
const { persistAtom } = recoilPersist({
  key: "userInfoLocal",
  storage: localStorage,
});

export const userInfoState = atom<UserInfoState>({
  key: "userInfoState",
  default: {
    name: "",
    email: "",
    gender: "",
    age: 0,
    phone: "",
  },
  effects_UNSTABLE: [persistAtom],
});
