import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";

const Groups = () => {
  // 목업 데이터
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <Container>
      <GroupsList>
        <li>5070끼리</li>
        <li>남자끼리</li>
        <li>여자끼리</li>
        <li>가족끼리</li>
        <li>누구든지</li>
      </GroupsList>
      <div className="description">
        <h2>여행지보다 동행자가 중요한 당신!</h2>
        <h3>함께가고 싶은 동행그룹을 찾아보세요.</h3>
      </div>
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
      {/* 상품 리스트 */}
      <ProductList>
        {posts.map(({ id, title, body }) => (
          <Product key={id}>
            <img
              className="image"
              src="https://byline.network/wp-content/uploads/2021/07/nintendo-switch-oled-1.jpg"
              alt={title}
            />
            <AiOutlineHeart />
            <h3 className="title">{title}</h3>
            <span className="price">10,000,000원</span>
            <p className="body">{body}</p>
          </Product>
        ))}
      </ProductList>
      <Pages>
        <li>{"<"}</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>{">"}</li>
      </Pages>
    </Container>
  );
};

// 임시 컴포넌트
const Container = styled.div`
  width: 1024px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 40px;

  .description {
    h2 {
      font-size: 35px;
      margin-bottom: 14px;
    }
    h3 {
      font-size: 30px;
    }
  }
`;

const GroupsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 70px;

  li {
    height: 100%;
    text-align: center;
    font-size: 27px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: #ddd;
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

const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, 330px);
  grid-auto-rows: 360px;
  row-gap: 30px;
  justify-content: space-between;
`;

const Product = styled.li`
  overflow: hidden;
  position: relative;

  /* display: flex;
  flex-direction: column;
  gap: 10px; */

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
  }
  .body {
    font-size: 20px;
    color: #666666;
  }
`;

const Pages = styled.ul`
  width: 100%;
  font-weight: 700;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export default Groups;
