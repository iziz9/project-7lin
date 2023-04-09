import { atom } from "recoil";
import { ProductType } from "../@types/data";

interface PageState {
  pageNumber: number;
  totalPages: number;
}

interface CategoryState {
  // categories: [
  //   { mainCategory?: string; middleCategory?: string },
  //   { mainCategory?: string; middleCategory?: string },
  //   { mainCategory?: string; middleCategory?: string },
  // ];
  categories: { mainCategory: string; middleCategory: string | null };
}

export const pageState = atom<PageState>({
  key: "pageState",
  default: {
    pageNumber: 1,
    totalPages: 1,
  },
});

export const categoryState = atom<CategoryState>({
  key: "categoryState",
  default: {
    // categories: [{}, {}, {}],
    categories: {
      mainCategory: "main",
      middleCategory: null,
    },
  },
});

export const itemState = atom({
  key: "itemState",
  default: [<ProductType>{}],
});
