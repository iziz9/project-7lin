import {
  AddReservationRequest,
  AddReservationRespose,
  FindIdFormValue,
  FindPwFormValue,
  LoginFormValue,
  MemberInfoResponse,
  MemberReservationDetailResponse,
  MemberReservationResponse,
  NonMemberFormValue,
  Product,
  SignUpRequest,
  SignUpResponse,
  UpdateMemberRequest,
  WishListProductResponse,
} from "../@types/data";
import { axiosInstance } from "./instance";

// 회원가입
export const signUp = async (arg: SignUpRequest) => {
  const data: SignUpResponse = await axiosInstance.post("/signUp", arg);
  return data;
};

// 아이디 중복 체크
export const idCheck = async (email: string) => {
  const data: boolean = await axiosInstance.post("/signUp/checkId", { email });
  return data;
};

// 전화번호 중복 체크
export const phoneCheck = async (phone: string) => {
  const data: boolean = await axiosInstance.post("/signUp/checkPhone", {
    phone,
  });
  return data;
};

// 정보 수정 시 전화번호 중복 체크
export const phoneCheckUpdate = async (phone: string) => {
  const data: boolean = await axiosInstance.post("/member/update/checkPhone", {
    phone,
  });
  return data;
};

// 로그인
export const login = async (arg: LoginFormValue) => {
  const data = await axiosInstance.post("/login", arg);
  return data;
};

// 아이디 찾기
export const findId = async (arg: FindIdFormValue) => {
  const data = await axiosInstance.get(
    `/findId?name=${arg.name}&phone=${arg.phone}`,
  );
  return data;
};

// 비밀번호 찾기
export const findPassword = async (arg: FindPwFormValue) => {
  const data = await axiosInstance.post(
    `/sendEmail?email=${arg.email}&phone=${arg.phone}`,
    {},
  );
  return data;
};

// 회원정보 조회
export const getMemberInfo = async () => {
  const data: MemberInfoResponse = await axiosInstance.get(`/member`);
  return data;
};

// 회원정보 수정
export const updateMemberInfo = async (arg: UpdateMemberRequest) => {
  const data = await axiosInstance.put(`/member/update`, arg);
  return data;
};

// 로그아웃
export const logout = async () => {
  const data: string = await axiosInstance.post(`/logouts`, {});
  return data;
};

// 회원 탈퇴
export const widthdrawal = async () => {
  const data = await axiosInstance.put(`/deleteMember`, {});
  return data;
};

// 예약 조회(회원)
export const getMemberReservation = async () => {
  const data: MemberReservationResponse = await axiosInstance.get(
    "/my/reservation",
  );
  return data;
};

// 예약 단건 조회(비회원)
export const getNonMemberReservation = async (arg: NonMemberFormValue) => {
  const data: MemberReservationDetailResponse = await axiosInstance.post(
    "/reservation/check",
    arg,
  );
  return data;
};

// 예약 상세 조회(회원)
export const getMemberReservationDetail = async (id: number) => {
  const data: MemberReservationDetailResponse = await axiosInstance.get(
    `/my/reservation/${id}`,
  );
  return data;
};

// 예약 추가
export const addReservation = async (arg: AddReservationRequest) => {
  const data: AddReservationRespose = await axiosInstance.post(
    `/reservation`,
    arg,
  );
  return data;
};

// 예약 취소
export const deleteReservation = async (code: string) => {
  const data = await axiosInstance.delete(`/reservation`, {
    data: { reservationCode: code },
  });
  return data;
};

// 다시 예약하기
export const reservateAgain = async (code: string) => {
  const data = await axiosInstance.post(`/reservation/undo`, {
    reservationCode: code,
  });
  return data;
};

// 찜 조회
export const getWishList = async () => {
  const data: WishListProductResponse = await axiosInstance.get("/mywishlist");
  return data;
};

// 찜 등록
export const addWishList = async (productId: number) => {
  const data: { status: number; message: string; dataSize: number } =
    await axiosInstance.post("/wishlist", { productId });
  return data;
};

// 찜 삭제
export const deleteWishList = async (productId: number) => {
  const data: { status: number; message: string; dataSize: number } =
    await axiosInstance.delete("/wishlist", { data: { productId } });
  return data;
};

// 찜 전체 삭제
export const deleteAllWishList = async () => {
  const data: { httpStatus: string; message: string } =
    await axiosInstance.delete("/wishlistall");
  return data;
};
