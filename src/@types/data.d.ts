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
  reservationCode: string;
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
      mainCategory: string | null;
      middleCategory: string | null;
    },
  ];
  minPeriod?: number | null;
  maxPeriod?: number | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  sort?: string | null;
}

// 상품 조회 response
export interface ProductResponseType {
  dataSize: number;
  data: { products: ProductType[]; totalElements: number };
}

export interface ProductType {
  briefExplanation: string;
  period: number;
  productId: number;
  productName: string;
  productPrice: number;
  thumbnail: string;
}

// 상품 상세 조회 response
export interface IProductDetailDataResponse {
  httpStatus: string;
  message: string;
  dataSize: number;
  data: IProductDetailData;
  response: null;
}

export interface IProductDetailData {
  productId: number;
  thumbnail: string;
  productName: string;
  price: number;
  briefExplanation: string;
  region: string;
  feature: string;
  flight: string;
  period: IProductDetailDataPeriod[];
  contents: IProductDetailDataContents[];
  options: IProductDetailDataOptions[];
}

export interface IProductDetailDataPeriod {
  productPeriodId: number;
  startDate: string;
  endDate: string;
}
export interface MemberInfoResponse {
  email: string;
  name: string;
  gender: string;
  age: number;
  phone: string;
}

export interface ReservationProduct {
  reservationId: number;
  date: string;
  status: string;
  productInfo: ProductInfo[];
  reservationCode: string;
  people: number;
}

export interface ProductInfo {
  product: Product;
}

export interface Product {
  productId: number;
  thumbnail: string;
  productName: string;
  productPrice: number;
  briefExplanation: string;
  period: number;
}

export interface MemberReservationResponse {
  data: ReservationProduct[];
  dataSize: number;
  httpStatus: string;
  message: string;
  response: any;
}

export interface MemberReservationDetailResponse {
  httpStatus: string;
  message: string;
  dataSize: number;
  data: Data;
  response: any;
}

export interface Data {
  reservationId: number;
  periods: Period[];
  options: Option[];
  product: Product;
  totalPrice: number;
  name: string;
  phone: string;
  email: string;
  people: string;
  reservationCode?: string;
}

export interface Period {
  period: Period2;
  amount: number;
}

export interface Period2 {
  productPeriodId: number;
  startDate: string;
  endDate: string;
}

export interface IProductDetailDataContents {
  content: string;
  type: string;
  priority: number;
}

export interface IProductDetailDataOptions {
  productOptionId: number;
  content: string;
  price: number;
  type: string;
}
export interface Option {
  option: Option2;
  amount: number;
}

export interface Option2 {
  productOptionId: number;
  content: string;
  price: number;
  type: string;
}

export interface IProductDetailDataOptionsFilter {
  content: string;
  price: number;
  productOptionId: number;
  type: string;
}

export interface IProductDetailSelectOptionData {
  period: {
    periodId: number;
    content: string;
    amount: number;
  };
  optionRoom: {
    optionId: number;
    content: string;
    price: number;
    amount: number;
  };
  optionFlight: {
    optionId: number;
    content: string;
    price: number;
    amount: number;
  };
}

export interface Product {
  productId: number;
  thumbnail: string;
  productName: string;
  productPrice: number;
  briefExplanation: string;
  period: number;
}

export interface AddReservationRequest {
  periods: Period3[];
  options: Option3[];
  name: string;
  phone: string;
  email: string;
  totalPrice: number;
  people: number;
}

export interface Period3 {
  periodId: number;
  amount: number;
}

export interface Option3 {
  optionId: number;
  amount: number;
}

export interface WishListProductResponse {
  httpStatus: string;
  message: string;
  dataSize: number;
  data: WishListProduct[];
}

export interface WishListProduct {
  productId: number;
  thumbnail: string;
  productName: string;
  productPrice: number;
  tagList: string[];
}
