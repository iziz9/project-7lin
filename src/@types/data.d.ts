export interface ReviewSelectState {
  name: string | undefined;
  isOpen: boolean;
}

export interface ReviewFilterData {
  [key: string]: {
    content: string[];
  };
}
export interface SignupFormValue {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
  confirmPhone: string;
  year: string;
  month: string;
  day: string;
  gender: string;
  acceptTerms: boolean;
}

export interface LoginFormValue {
  email: string;
  password: string;
}

export interface NonMemberFormValue {
  orderNum: string;
  phone: string;
}

export interface FindIdFormValue {
  name: string;
  phone: string;
}

export interface FindPwFormValue {
  email: string;
  phone: string;
}

export interface ChangeInfoFormValue {
  password: string;
  confirmPassword: string;
  phone: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  validPassword: string;
  name: string;
  phone: string;
  birth: string;
  gender: string;
  age: string;
}

export interface UpdateMemberRequest {
  email: string;
  newPassword: string;
  validNewPassword: string;
  phone: string;
}

export interface ResultPackageType {
  title: string;
  image: string;
  desc: string;
  category: string;
  backgroundImg: string;
}

export interface lastAnswersType {
  golf: string;
  trekking: string;
  ocean: string;
  culture: string;
}

export interface TestResultProductType {
  productId: number;
  productName: string;
  productPrice: number;
  period: number;
  briefExplanation: string;
  thumbnail: string;
}

// 상품 조회 request
export interface ProductRequestType {
  category: [
    {
      mainCategory: string;
    },
  ];
  minPeriod?: number;
  maxPeriod?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

// 상품 조회 response
export interface ProductResponseType {
  dataSize: number;
  data: { products: object[]; totalElements: number };
}

export interface MemberInfoResponse {
  email: string;
  name: string;
  gender: string;
  age: number;
  phone: string;
}
