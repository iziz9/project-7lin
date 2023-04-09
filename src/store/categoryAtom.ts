import { atom } from "recoil";
import { ProductType } from "../@types/data";

interface SortState {
  sort: string | null;
}

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

export const sortState = atom<SortState>({
  key: "sortState",
  default: {
    sort: null,
  },
});

export const itemState = atom({
  key: "itemState",
  default: [
    <ProductType>{
      briefExplanation:
        "5070 누구나 참가하는 중앙아시아 3국 일주 여행<br/>3국 중 가장 아름다운 키르키즈스탄 특화 여행상품<br/>힘들지 않는 가벼운 트레킹 및 하이킹 포함 일정",
      period: 15,
      productId: 1111,
      productName: "중앙아시아 3국 15일",
      productPrice: 5790000,
      thumbnail: "https://cdn.imweb.me/thumbnail/20220330/ea0dbb6095678.png",
    },
    {
      briefExplanation:
        "#스페인 #산티아고 #산티아고순례길 #250Km #까미노 #카미노데산티아고 #생쟝 #피니스테라 #사리아 #피스테라 #피레네산맥 #무시아 #마드리드",
      period: 17,
      productId: 2222,
      productName: "스페인 산티아고 순례길 하이라이트 17일",
      productPrice: 5290000,
      thumbnail: "https://cdn.imweb.me/thumbnail/20220804/b2c35e3dc9f22.jpg",
    },
    {
      briefExplanation:
        "#스위스 #이지워킹 #트레킹 #리기산 #엥겔베르그 #피르스트 #뮈렌 #라보 #레만호수 #취리히 #루체른 #인터라켄 #베른 #로쟌 #체르마트 #마조레",
      period: 10,
      productId: 3333,
      productName: "누구나 가능한 이지워킹 스위스 알프스 초급 트레킹 10일",
      productPrice: 4990000,
      thumbnail: "https://cdn.imweb.me/thumbnail/20220830/6d1a7d5c70594.jpg",
    },
    {
      briefExplanation:
        "와인을 최초로 만들기 시작한 코카서스 지역 여행<br/>와이너리 방문, 가정집 하우스와인, 꼬냑 제조장 방문<br/>오래된 성을 호텔로 사용하는 고성호텔 숙박 체험",
      period: 12,
      productId: 4444,
      productName: "코카서스 12일 풀패키지 ",
      productPrice: 5590000,
      thumbnail: "https://cdn.imweb.me/thumbnail/20220507/59b9d6e747e98.png",
    },
    {
      briefExplanation:
        "와인 애주가들끼리 떠나는 코카서스 3국 일주<br/>코카서스의 백미 조지아를 샅샅히 둘러보는 상품<br/>패키지의 안전함과 자유여행의 즐거움을 동시에~",
      period: 18,
      productId: 5555,
      productName: "와인러버들끼리 코카서스 3국 일주 18일  ",
      productPrice: 6390000,
      thumbnail: "https://cdn.imweb.me/thumbnail/20220330/1242df3a189a7.png",
    },
  ],
});
