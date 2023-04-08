import {
  FindIdFormValue,
  FindPwFormValue,
  LoginFormValue,
  SignUpRequest,
  UpdateMemberRequest,
} from "../@types/data";
import { axiosInstance } from "./instance";

export const signUp = async (arg: SignUpRequest) => {
  const data = await axiosInstance.post("/signUp", arg);
  console.log(data);
  return data;
};

export const idCheck = async (email: string) => {
  const data: boolean = await axiosInstance.post("/signUp/checkId", { email });
  console.log(data);
  return data;
};

export const phoneCheck = async (phone: string) => {
  const data: boolean = await axiosInstance.post("/signUp/checkPhone", {
    phone,
  });
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
    `/findId?name=${arg.name}&phone=${arg.phone}`,
    {},
  );
  console.log(data);
  return data;
};

export const findPassword = async (arg: FindPwFormValue) => {
  const data = await axiosInstance.post(
    `/sendEmail?email=${arg.email}&phone=${arg.phone}`,
    {},
  );
  console.log(data);
  return data;
};

export const getMemberInfo = async (email: string) => {
  const data = await axiosInstance.get(`/member?email=${email}`);
  console.log(data);
  return data;
};

export const updateMemberInfo = async (arg: UpdateMemberRequest) => {
  const data = await axiosInstance.put(`/member/update?email=${arg.email}`, {
    newPassword: arg.newPassword,
    validNewPassword: arg.validNewPassword,
    phone: arg.phone,
  });
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

export const widthdrawal = async (email: string) => {
  const data = await axiosInstance.put(`/deleteMember?email=${email}`, {});
  console.log(data);
  return data;
};
