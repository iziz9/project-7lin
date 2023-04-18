import { HttpStatusCode } from "axios";
import { axiosInstance } from "./instance";
import {
  GetAllReviewsRes,
  IProductDetailDataResponse,
  ProductRequestType,
  ProductResponseType,
  SearchProductResponse,
} from "../@types/data";

export const getTestResult = async (category: string, size: number) => {
  try {
    const res = await axiosInstance.post("/products?size=" + size, {
      categories: [
        {
          mainCategory: "THEME",
          middleCategory: category,
        },
      ],
    });
    console.log(res);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// 상품 조회 api
export const postProductResult = async (
  testdata: ProductRequestType,
  page: number,
) => {
  try {
    const res: ProductResponseType = await axiosInstance.post(
      `/products?page=${page}`,
      testdata,
    );
    return res;
  } catch (error: any) {
    return error.message;
  }
};

// 상품 상세 조회
export const getProductDetail = async (id: string) => {
  try {
    const res: IProductDetailDataResponse = await axiosInstance.get(
      `/products/${id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 상품 상세 후기 조회 (상세페이지)
export const getProductDetailReview = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/products/reviews/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 카테고리별 상품 조회 (상세페이지)
export const getRelatedProducts = async (
  mainCategory?: string,
  middleCategory?: string,
) => {
  try {
    const res = await axiosInstance.post("/products?page=1", {
      categories: [
        {
          mainCategory,
          middleCategory,
        },
      ],
    });
    console.log(res);
    return res.data.products;
  } catch (err) {
    throw err;
  }
};

// 후기 전체 조회
export const getAllReviews = async () => {
  try {
    const res: GetAllReviewsRes = await axiosInstance.get(`/reviews`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 후기 상세 조회
export const getReviewDetail = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/reviews/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 후기 작성
export const postReviewDetail = async (formData: FormData) => {
  console.log(formData);

  try {
    const res = await axiosInstance.post(`/reviews`, {
      ...formData,
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    // throw error;
  }
};

export const getSearchProduct = async (keyWord: string) => {
  const data: SearchProductResponse = await axiosInstance.get(
    `/search?keyWord=${keyWord}`,
  );
  return data;
};
