import React, { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, itemState, pageState } from "../../store/categoryAtom";
import {
  getMainCategoryName,
  getMiddleCategoryName,
} from "../../utils/category";
import { ProductRequestType } from "../../@types/data";
import { postProductResult } from "../../apis/request";

const subMenu = {
  groups: ["5070", "gentlemen", "ladies", "family", "anyone"],
  themes: ["culture", "golf", "vacation", "trekking", "pilgrimage"],
  destination: ["asia", "india", "africa", "europe", "america"],
};

interface ContainerProps {
  length: number;
}

const SubMenu = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useRecoilState(categoryState);
  const { mainCategory } = category.categories;
  const [items, setItems] = useRecoilState(itemState);
  const setPage = useSetRecoilState(pageState);

  // 상품 조회 api 호출 및 state 변경
  const getProductsData = async (changePage: number) => {
    // Api request 데이터
    const requestData: ProductRequestType = {
      category: [
        {
          mainCategory: getMainCategoryName(category.categories.mainCategory),
          middleCategory: getMiddleCategoryName(
            category.categories.middleCategory,
          ),
        },
      ],
    };

    const result = await postProductResult(requestData, changePage);
    // 네트워크 에러시
    if (result === "Network Error") {
      console.log("네트워크 에러");
      return;
    } else {
      // 현재 카테고리 값 저장
      const { pageNumber, totalPages } = result.data;
      // console.log("test..", pageNumber, totalPages);
      setPage({
        pageNumber,
        totalPages: result.data.totalPages,
      });
      // console.log("test..", page);

      // 상품 저장
      setItems(result.data.products);
    }
  };

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    console.log("클릭됐땅", event.currentTarget.id);

    setCategory({
      categories: {
        mainCategory: mainCategory,
        middleCategory: event.currentTarget.id,
      },
    });

    // api 호출
    getProductsData(1);

    // Link to가 안먹혀서 작성
    navigate(`/${mainCategory}/${event.currentTarget.id}`);
  };

  return (
    <>
      {/* 반복문을 어떻게 돌려야할지 몰라서 하드코딩 */}
      {mainCategory === "groups" && (
        <Container length={subMenu["groups"].length}>
          {subMenu["groups"].map((value) => (
            <Link
              className="submenu"
              to={`/${mainCategory}/${value}`}
              id={value}
              key={value}
              onClick={onClick}
            >
              {getMiddleCategoryName(value)}
            </Link>
          ))}
        </Container>
      )}
      {mainCategory === "themes" && (
        <Container length={subMenu["themes"].length}>
          {subMenu["themes"].map((value) => (
            <Link
              className="submenu"
              to={`/${mainCategory}/${value}`}
              id={value}
              key={value}
              onClick={onClick}
            >
              {getMiddleCategoryName(value)}
            </Link>
          ))}
        </Container>
      )}
      {mainCategory === "destination" && (
        <Container length={subMenu["destination"].length}>
          {subMenu["destination"].map((value) => (
            <Link
              className="submenu"
              to={`/${mainCategory}/${value}`}
              id={value}
              key={value}
              onClick={onClick}
            >
              {getMiddleCategoryName(value)}
            </Link>
          ))}
        </Container>
      )}

      <Line></Line>
    </>
  );
};

const Container = styled.div<ContainerProps>`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(${(props) => props.length}, 1fr);
  grid-auto-rows: 50px;
  position: sticky;
  background-color: rgba(255, 255, 255, 0.7);

  @supports (position: sticky) or (position: -webkit-sticky) {
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }

  .submenu {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin: 0 -1px 0 0;
    font-size: 20px;
    &:hover {
      color: #0080c6;
      background-color: #e9e9e9;
    }
  }

  // 모바일 환경
  @media (max-width: 850px) {
    position: absolute;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 40px;
    width: 100%;

    .submenu {
      font-size: 16px;
      border: 1px solid var(--color-grayscale10);
      &:nth-child(4),
      &:nth-child(5),
      &:nth-child(6) {
        margin-top: -1px;
      }
    }
  }
`;

const Line = styled.div`
  margin-top: -30px;
  border-top: 1px solid var(--color-grayscale10);

  @media (max-width: 850px) {
    margin-top: 36px;
    border-top: none;
  }
`;

export default SubMenu;
