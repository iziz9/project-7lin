import { HttpStatusCode } from "axios";
import { axiosInstance } from "./instance";
import { ProductRequestType, ProductResponseType } from "../@types/data";

export const getTestResult = async (category: string) => {
  const res = await axiosInstance.post("/products?size=3", {
    categories: [
      {
        mainCategory: "THEME",
        middleCategory: category,
      },
    ],
  });
  console.log(res);
  return res.data;
};

// 상품 조회 api
export const postProductResult = async (
  testdata: ProductRequestType,
  page: number,
) => {
  try {
    const res: ProductResponseType = await axiosInstance.post(
      `/products?page=${page}`,
      {
        categories: [
          {
            mainCategory: testdata.category[0].mainCategory,
            middleCategory: testdata.category[0].middleCategory,
          },
        ],
        sort: testdata.sort,
      },
    );
    console.log(res);
    return res;
  } catch (error: any) {
    return error.message;
  }
};
