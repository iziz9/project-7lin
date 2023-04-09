import {
  AddReservationRequest,
  FindIdFormValue,
  FindPwFormValue,
  LoginFormValue,
  MemberInfoResponse,
  MemberReservationDetailResponse,
  MemberReservationResponse,
  NonMemberFormValue,
  Product,
  SignUpRequest,
  UpdateMemberRequest,
  WishListProductResponse,
} from "../@types/data";
import { axiosInstance } from "./instance";

// 회원가입
export const signUp = async (arg: SignUpRequest) => {
  const data = await axiosInstance.post("/signUp", arg);
  console.log(data);
  return data;
};

// 아이디 중복 체크
export const idCheck = async (email: string) => {
  const data: boolean = await axiosInstance.post("/signUp/checkId", { email });
  console.log(data);
  return data;
};

// 전화번호 중복 체크
export const phoneCheck = async (phone: string) => {
  const data: boolean = await axiosInstance.post("/signUp/checkPhone", {
    phone,
  });
  console.log(data);
  return data;
};

// 로그인
export const login = async (arg: LoginFormValue) => {
  const data = await axiosInstance.post("/login", arg);
  console.log(data);
  return data;
};

// 아이디 찾기
export const findId = async (arg: FindIdFormValue) => {
  const data = await axiosInstance.get(
    `/findId?name=${arg.name}&phone=${arg.phone}`,
    {},
  );
  console.log(data);
  return data;
};

// 비밀번호 찾기
export const findPassword = async (arg: FindPwFormValue) => {
  const data = await axiosInstance.post(
    `/sendEmail?email=${arg.email}&phone=${arg.phone}`,
    {},
  );
  console.log(data);
  return data;
};

// 회원정보 조회
export const getMemberInfo = async (email: string) => {
  const data: MemberInfoResponse = await axiosInstance.get(
    `/member?email=${email}`,
  );
  console.log(data);
  return data;
};

// 회원정보 수정
export const updateMemberInfo = async (arg: UpdateMemberRequest) => {
  const data = await axiosInstance.put(`/member/update?email=${arg.email}`, {
    newPassword: arg.newPassword,
    validNewPassword: arg.validNewPassword,
    phone: arg.phone,
  });
  console.log(data);
  return data;
};

// 로그아웃
export const logout = async () => {
  const data: string = await axiosInstance.post(`/logouts`);
  console.log(data);
  return data;
};

// 회원 탈퇴
export const widthdrawal = async (email: string) => {
  const data = await axiosInstance.put(`/deleteMember?email=${email}`, {});
  console.log(data);
  return data;
};

// 예약 조회(회원)
export const getMemberReservation = async () => {
  const data: MemberReservationResponse = await axiosInstance.get(
    "/my/reservation",
  );
  console.log(data);
  return data;
};

// 예약 단건 조회(비회원)
export const getNonMemberReservation = async (arg: NonMemberFormValue) => {
  const data: MemberReservationDetailResponse = await axiosInstance.post(
    "/reservation/check",
    arg,
  );
  console.log(data);
  return data;
};

// 예약 상세 조회(회원)
export const getMemberReservationDetail = async (id: number) => {
  const data: MemberReservationDetailResponse = await axiosInstance.get(
    `/my/reservation/${id}`,
  );
  console.log(data);
  return data;
};

// 예약 추가
export const addReservation = async (arg: AddReservationRequest) => {
  const data = await axiosInstance.post(`/reservation`, arg);
  console.log(data);
  return data;
};

// 예약 취소
export const deleteReservation = async (code: string) => {
  const data = await axiosInstance.delete(`/reservation`, {
    data: { reservationCode: code },
  });
  console.log(data);
  return data;
};

// 다시 예약하기
export const reservateAgain = async (code: string) => {
  const data = await axiosInstance.post(`/reservation/undo`, {
    reservationCode: code,
  });
  console.log(data);
  return data;
};

// 찜 조회
export const getWishList = async () => {
  const data: WishListProductResponse = await axiosInstance.get("/mywishlist");
  console.log(data);
  return data;
};

// 찜 등록
export const addWishList = async (productId: number) => {
  const data: { status: number; message: string; dataSize: number } =
    await axiosInstance.post("/wishlist", { productId });
  console.log(data);
  return data;
};

// 찜 삭제
export const deleteWishList = async (productId: number) => {
  const data: { status: number; message: string; dataSize: number } =
    await axiosInstance.delete("/wishlist", { data: { productId } });
  console.log(data);
  return data;
};

// 찜 전체 삭제
export const deleteAllWishList = async () => {
  const data: { httpStatus: string; message: string } =
    await axiosInstance.delete("/wishlistall");
  console.log(data);
  return data;
};
