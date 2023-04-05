import React from "react";
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const Groups = () => {
  // 반응형
  const isMobile = useMediaQuery({ query: "(max-width:390px)" });

  // 목업 데이터
  const mockupData = [
    {
      id: "123",
      image: "https://cdn.imweb.me/thumbnail/20220330/ea0dbb6095678.png",
      title: "중앙아시아 3국 15일",
      price: 5790000,
      discription:
        "5070 누구나 참가하는 중앙아시아 3국 일주 여행 3국 중 가장 아름다운 키르키즈스탄 특화 여행상품 힘들지 않는 가벼운 트레킹 및 하이킹 포함 일정",
    },
    {
      id: "456",
      image: "https://cdn.imweb.me/thumbnail/20220804/b2c35e3dc9f22.jpg",
      title: "스페인 산티아고 순례길 하이라이트 17일",
      price: 5290000,
      discription:
        "#스페인 #산티아고 #산티아고순례길 #250Km #까미노 #카미노데산티아고 #생쟝 #피니스테라 #사리아 #피스테라 #피레네산맥 #무시아 #마드리드",
    },
    {
      id: "789",
      image: "https://cdn.imweb.me/thumbnail/20220830/6d1a7d5c70594.jpg",
      title: "누구나 가능한 이지워킹 스위스 알프스 초급 트레킹 10일",
      price: 4990000,
      discription:
        "#스위스 #이지워킹 #트레킹 #리기산 #엥겔베르그 #피르스트 #뮈렌 #라보 #레만호수 #취리히 #루체른 #인터라켄 #베른 #로쟌 #체르마트 #마조레",
    },
    {
      id: "101112",
      image: "https://cdn.imweb.me/thumbnail/20220507/59b9d6e747e98.png",
      title: "코카서스 12일 풀패키지 ",
      price: 5590000,
      discription:
        "와인을 최초로 만들기 시작한 코카서스 지역 여행 와이너리 방문, 가정집 하우스와인, 꼬냑 제조장 방문 오래된 성을 호텔로 사용하는 고성호텔 숙박 체험",
    },
    {
      id: "131415",
      image: "https://cdn.imweb.me/thumbnail/20220330/1242df3a189a7.png",
      title: "와인러버들끼리 코카서스 3국 일주 18일  ",
      price: 6390000,
      discription:
        "와인 애주가들끼리 떠나는 코카서스 3국 일주 코카서스의 백미 조지아를 샅샅히 둘러보는 상품 패키지의 안전함과 자유여행의 즐거움을 동시에~",
    },
  ];

  return (
    <Container isMobile={isMobile}>
      {isMobile && <h1>그룹별 여행</h1>}
      <GroupsList isMobile={isMobile}>
        <li>5070끼리</li>
        <li>남자끼리</li>
        <li>여자끼리</li>
        <li>가족끼리</li>
        <li>누구든지</li>
      </GroupsList>
      {!isMobile && (
        <div className="description">
          <h2>여행지보다 동행자가 중요한 당신!</h2>
          <h3>함께가고 싶은 동행그룹을 찾아보세요.</h3>
        </div>
      )}
      {!isMobile && (
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
      )}
      {/* 상품 리스트 */}
      <ProductList isMobile={isMobile}>
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
      <Pages isMobile={isMobile}>
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

// 임시 컴포넌트
const Container = styled.div<{ isMobile: boolean }>`
  max-width: 1024px;
  padding-top: 30px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  h1 {
    width: 298px;
    font-weight: 700;
    font-size: 20px;
  }
  .description {
    h2 {
      font-size: 35px;
      margin-bottom: 14px;
    }
    h3 {
      font-size: 30px;
    }
  }

  ${(props) =>
    props.isMobile
      ? css`
          max-width: 390px;
          min-width: 300px;
          align-items: center;
        `
      : css``}
`;

const GroupsList = styled.ul<{ isMobile: boolean }>`
  display: grid;
  justify-content: center;
  box-sizing: border-box;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 70px;

  li {
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    box-sizing: border-box;
    border: 1px solid #e4e4e4;
    color: #757575;
    margin: 0 -1px 0 0;
    font-size: 27px;
    &:hover {
      background-color: var(--color-blue);
      color: #fff;
    }
  }

  // 모바일 환경
  ${(props) =>
    props.isMobile
      ? css`
          grid-template-columns: repeat(3, 100px);
          grid-auto-rows: 48px;
          li {
            font-size: 14px;
            &:nth-child(4),
            &:nth-child(5),
            &:nth-child(6) {
              margin-top: -1px;
            }
          }
        `
      : css``}
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

const ProductList = styled.ul<{ isMobile: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, 330px);
  grid-auto-rows: 500px;
  row-gap: 30px;
  justify-content: space-between;

  ${(props) =>
    props.isMobile
      ? css`
          grid-template-columns: repeat(1, 243px);
          grid-auto-rows: auto;
        `
      : css``}
`;

const Product = styled.li<{ isMobile: boolean }>`
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  line-height: 1.1;

  svg {
    position: absolute;
    right: 16px;
    top: 16px;
    font-size: 25px;
  }
  .image {
    width: 100%;
    object-fit: cover;
  }
  .title {
    font-weight: 700;
    font-size: 23px;
  }
  .price {
    font-size: 21px;
    color: #4f4f4f;
  }
  .body {
    font-size: 20px;
    color: #4f4f4f;
  }

  ${(props) =>
    props.isMobile
      ? css`
          svg {
            right: 8px;
            top: 8px;
            font-size: 20px;
          }
          .image {
            height: 122px;
            object-fit: fill;
          }
          .title {
            margin-top: 14px;
            font-size: 16px;
          }
          .price {
            font-size: 14px;
            margin-bottom: 8px;
          }
          .body {
            font-size: 14px;
          }
        `
      : css``}
`;

const Pages = styled.ul<{ isMobile: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 16px;

  ${(props) =>
    props.isMobile
      ? css`
          width: 243px;
          justify-content: space-between;
          font-size: 10px;
        `
      : css``}
`;

export default Groups;
