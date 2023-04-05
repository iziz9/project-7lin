import React from "react";
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useMediaQuery } from "react-responsive";
import SubMenu from "./SubMenu";
import Product from "./Product";
import Filter from "./Filter";

const Groups = () => {
  return (
    <Container>
      {/* <Description>
        <h2>여행지보다 동행자가 중요한 당신!</h2>
        <h3>함께가고 싶은 동행그룹을 찾아보세요.</h3>
      </Description> */}
      <SubMenu />
      {/* <h1>그룹별 여행</h1> */}
      {/* {!isMobile && (
          <FilterList>
            <li>액티브 시니어</li>
            <li>휴양지 러버</li>
            <li>영화 마니아</li>
            <li>미식가 시니어</li>
            <li>자연 마니아</li>
            <li>역사 마니아</li>
            <li>스포츠 마니아</li>
            <li>호캉스 마니아</li>
          </FilterList>
        )} */}
      {/* 상품 리스트 */}
      {/* <ProductList isMobile={isMobile}>
        {mockupData.map((props) => (
          <Link
            key={props.id}
            to={`/product/${props.id}`}
            state={{
              image: props.image,
              title: props.title,
              price: props.price,
              discription: props.discription,
            }}
          >
            <Product isMobile={isMobile}>
              <img className="image" src={props.image} alt={props.title} />
              <AiOutlineHeart />
              <h3 className="title">{props.title}</h3>
              <span className="price">
                {props.price.toLocaleString("ko-KR")}원
              </span>
              <p className="body">{props.discription}</p>
            </Product>
          </Link>
        ))}
      </ProductList>
      <Pages isMobile={isMobile}> */}
      <div className="body">
        <Filter />
        <div>
          <Product />
        </div>
      </div>
      <Pages>
        <li>{"<"}</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>{">"}</li>
      </Pages>
    </Container>
  );
};

const Description = styled.div`
  h2 {
    font-size: 35px;
    margin-bottom: 14px;
  }
  h3 {
    font-size: 30px;
  }
`;

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
`;

const FilterList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 184px);
  grid-auto-rows: 62px;
  column-gap: 20px;
  row-gap: 16px;
  margin: 0 auto;

  li {
    height: 100%;
    font-size: 23px;
    background-color: #ddd;
    border-radius: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
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
