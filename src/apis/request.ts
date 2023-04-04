import { HttpStatusCode } from "axios";
import { axiosInstance } from "./instance";

export const getTestResult = async (category: string) => {
  const res = await axiosInstance.post("/products?size=4", {
    categories: [
      {
        mainCategory: "THEME",
        middleCategory: category,
      },
    ],
  });
  return res.data;
};
