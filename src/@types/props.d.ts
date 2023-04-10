import { IProductDetailSelectOptionData } from "../pages/product-detail/ProductDetailModal";
import {
  IProductDetailDataOptions,
  IProductDetailDataPeriod,
  ReviewContentDtolist,
} from "./data";
import { IProductDetailSelectOptionData } from "./../pages/product-detail/ProductDetailModal";

export interface IReviewModalProps {
  title: string;
}

export interface IReviewFilterItemProps {
  title: string;
  content: string[];
}

export interface IMainContentsProps {
  data: ReviewContentDtolist[];
  tag: string[];
}

export interface IProductDetailModalOptionProps {
  data:
    | IProductDetailDataOptionsFilter[]
    | IProductDetailDataPeriod[]
    | undefined;
  type: string;
  isChange?: boolean;
  selectItem: IProductDetailSelectOptionData;
  setSelectItem: React.Dispatch<
    React.SetStateAction<IProductDetailSelectOptionData>
  >;
}

export interface IProductDetailModalProps {
  id: number;
  image: string;
  title: string;
  price: number;
  closeModal: () => any;
  type: string;
  funcType?: string;
  options: IProductDetailDataOptions[] | undefined;
  period: IProductDetailDataPeriod[] | undefined;
}

export interface IProductDetailModalOptionCardProps {
  title: string | undefined;
  type: string;
  basicPrice?: number;
  selectItem: IProductDetailSelectOptionData;
  setSelectItem: React.Dispatch<
    React.SetStateAction<IProductDetailSelectOptionData>
  >;
}

export interface IBreadCrumbProps {
  data: {
    title: string;
    link: string;
  }[];
}

export interface IProductDetailReviewsProps {
  reviewData: IProductDetailReviewData[];
  thumnail: string;
}
