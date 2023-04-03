import {
  FindIdFormValue,
  FindPwFormValue,
  LoginFormValue,
  SignUpRequest,
} from "../@types/data";
import { axiosInstance } from "./instance";

export const signUp = async (arg: SignUpRequest) => {
  const data = await axiosInstance.post("/signUp", arg);
  console.log(data);
  return data;
};

export const idCheck = async (email: string) => {
  const data = await axiosInstance.post("/signUp/checkId", { email });
  console.log(data);
  return data;
};

export const login = async (arg: LoginFormValue) => {
  const data = await axiosInstance.post("/login", arg);
  console.log(data);
  return data;
};

export const findId = async (arg: FindIdFormValue) => {
  const data = await axiosInstance.get(
    `/finId?name=${arg.name}&phone=${arg.phone}`,
  );
  console.log(data);
  return data;
};

export const findPw = async (arg: FindPwFormValue) => {
  const data = await axiosInstance.post(
    `/sendEmail?email=${arg.email}&phone=${arg.phone}`,
  );
  console.log(data);
  return data;
};

// export const logout = async () => {
//     const data = await axiosInstance.post(
//       `/logout`,
//     );
//     console.log(data);
//     return data;
//   };

export const widthdrawal = async (id: string) => {
  const data = await axiosInstance.put(`/deleteMember?id=${id}`);
  console.log(data);
  return data;
};
