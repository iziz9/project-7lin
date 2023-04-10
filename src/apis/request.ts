import { HttpStatusCode } from "axios";
import { axiosInstance } from "./instance";
import {
  IProductDetailDataResponse,
  ProductRequestType,
  ProductResponseType,
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

// 상품 상세 후기 조회
export const getProductDetailReview = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/products/reviews/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
