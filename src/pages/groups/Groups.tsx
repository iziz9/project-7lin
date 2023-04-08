import React from "react";
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import SubMenu from "./SubMenu";
import Product from "./Product";
import Filter from "./Filter";
import { postProductResult } from "../../apis/request";
import { ProductRequestType } from "../../@types/data";
import { Link, useLocation } from "react-router-dom";

// 목업 데이터
const mockupData = [
  {
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
];

// 페이지네이션 함수
const pagenation = (
  pages: number,
  currentPage: number,
  setCurrentPage: Function,
) => {
  let arr = [];
  for (let i = 1; i <= pages; i++) {
    arr.push(
      <Link
        to={`/groups/${i}`}
        key={i}
        onClick={() => setCurrentPage(i)}
        className={i === currentPage ? "selected" : ""}
      >
        {i}
      </Link>,
    );
  }
  return arr;
};

// 주소로 요청 카테고리명 받아오기
const getCategoryName = (pathname: string) => {
  switch (pathname) {
    // main category: 그룹별 여행 , 테마별 여행, 지역별 여행
    case "groups":
      return "GROUP";
    case "themes":
      return "THEME";
    case "destination":
      return "REGION";
    // 예외
    default:
      return null;
  }
};

// 자식인 Product 컴포넌트로 넘겨주기 위해 export
export type ProductType = {
  briefExplanation: string;
  period: number;
  productId: number;
  productName: string;
  productPrice: number;
  thumbnail: string;
};

const Groups = () => {
  // 주소로 메인 카테고리명 받아오기
  const mainCategoryName = getCategoryName(
    useLocation().pathname.split("/")[1],
  );
  // 주소로 미들 카테고리명 받아오기(해야함)

  // 그룹별 상품 조회 API request 데이터
  let testdata: ProductRequestType = {
    category: [
      {
        mainCategory: mainCategoryName,
      },
    ],
  };

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [pages, setPages] = useState(1); // 총 페이지 수
  const [items, setItems] = useState<ProductType[]>(mockupData); // product 컴포넌트로 내려줄 상품 (response data의 상품 데이터)

  const renderProduct = async () => {
    const result = await postProductResult(testdata, currentPage);
    // 네트워크 에러시
    if (result === "Network Error") {
      console.log("네트워크 에러");
      return;
    } else {
      // items에 상품 데이터 저장
      setItems(result.data.products);
      // 총 페이지 개수 저장
      setPages(Math.round(result.data.totalElements / 12));
    }
  };

  useEffect(() => {
    renderProduct();
  }, [currentPage]);

  return (
    <Container>
      <SubMenu />
      <div className="body">
        <Filter />
        <ProductContainer>
          {items.map((value) => (
            <Product key={value.productId} product={value} />
          ))}
        </ProductContainer>
      </div>
      <Pages>
        <li>{"<"}</li>
        {pagenation(pages, currentPage, setCurrentPage)}
        <li>{">"}</li>
      </Pages>
    </Container>
  );
};

// 임시 컴포넌트
const Container = styled.div`
  padding-top: 30px;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  h1 {
    width: 298px;
    font-weight: 700;
    font-size: 20px;
  }

  .body {
    display: flex;
    gap: 20px;
    justify-content: space-between;
  }

  @media (max-width: 850px) {
    align-items: center;
    margin: 0;
    gap: 18px;

    .body {
      flex-direction: column;
    }
  }

  .selected {
    font-weight: 700;
  }
`;

const ProductContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(auto, 310px));
  grid-auto-rows: auto;
  gap: 20px;
  row-gap: 40px;
  max-width: 970px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  // 모바일 환경
  @media (max-width: 850px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, minmax(auto, 310px));
  }
`;

const Pages = styled.ul`
  display: flex;
  justify-content: center;
  gap: 16px;

  @media (max-width: 850px) {
    justify-content: space-between;
    font-size: 14px;
  }
`;

export default Groups;
