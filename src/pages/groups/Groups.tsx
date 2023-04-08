import React from "react";
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import SubMenu from "./SubMenu";
import Product from "./Product";
import Filter from "./Filter";
import { postProductResult } from "../../apis/request";
import { ProductRequestType } from "../../@types/data";
import { Link, useLocation } from "react-router-dom";

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
      return "NONE";
  }
};

const Groups = () => {
  const mainCategoryName = getCategoryName(
    useLocation().pathname.split("/")[1],
  );

  let testdata: ProductRequestType = {
    category: [
      {
        mainCategory: mainCategoryName,
      },
    ],
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [count, setCount] = useState(0);

  const renderProduct = async () => {
    const result = await postProductResult(testdata, currentPage);

    if (result === "Network Error") {
      setCount(13);
      return;
    }

    if (!result.dataSize) {
      throw new Error("값이 없습니다.");
    }

    for (let i = 0; i < result.dataSize; i++) {
      // 세션 스토리지에 상품 저장
      sessionStorage.setItem(
        `product${i}`,
        JSON.stringify(result.data.products[i]),
      );
    }

    // 총 상품 개수
    setCount(result.dataSize);
    // 총 페이지 개수
    setPages(Math.round(result.data.totalElements / 12));
  };

  renderProduct();

  return (
    <Container>
      <SubMenu />
      <div className="body">
        <Filter />
        <div>
          <Product count={count} />
        </div>
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

const Pages = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 16px;

  @media (max-width: 850px) {
    width: 243px;
    justify-content: space-between;
    font-size: 10px;
  }
`;

export default Groups;
