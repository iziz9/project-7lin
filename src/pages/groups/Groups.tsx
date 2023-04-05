import React from "react";
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useMediaQuery } from "react-responsive";
import SubMenu from "./SubMenu";
import Product from "./Product";
import Filter from "./Filter";
import { postProductResult } from "../../apis/request";
import { postProductResultType } from "../../@types/data";

const Groups = () => {
  let testdata: postProductResultType = {
    category: [
      {
        mainCategory: "GROUP",
      },
    ],
  };

  const [currentPage, setCurrentPage] = useState(2);
  const [pages, setPages] = useState(1);

  const renderProduct = async () => {
    const result = await postProductResult(testdata, currentPage);

    setPages(Math.round(result.data.totalElements / 12));
  };

  // 페이지네이션 함수
  const pagenation = () => {
    let arr = [];
    for (let i = 1; i <= pages; i++) {
      arr.push(
        <li
          key={i}
          onClick={() => setCurrentPage(i)}
          className={i === currentPage ? "selected" : ""}
        >
          {i}
        </li>,
      );
    }
    return arr;
  };

  renderProduct();

  return (
    <Container>
      <SubMenu />
      <div className="body">
        <Filter />
        <div>
          <Product />
        </div>
      </div>
      <Pages>
        <li>{"<"}</li>
        {pagenation()}
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
    color: red;
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
