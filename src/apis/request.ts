import { HttpStatusCode } from "axios";
import { axiosInstance } from "./instance";
import { postProductResultType } from "../@types/data";

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
  testdata: postProductResultType,
  page: number,
) => {
  const res = await axiosInstance.post(`/products?page=${page}`, {
    categories: [
      {
        mainCategory: testdata.category[0].mainCategory,
      },
    ],
  });
  console.log(res);

  return res;
};
