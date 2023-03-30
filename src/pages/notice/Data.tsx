import React from "react";
import styled from "styled-components";

// 목업데이터
const data = [
  {
    number: 12, // 글번호
    title: "국외여행 표준약관",
    name: "관리자",
  },
  {
    number: 34, // 글번호
    title: "국외여행 입국절차",
    name: "관리자",
  },
  {
    number: 56, // 글번호
    title: "사이판 입국절차",
    name: "관리자",
  },
  {
    number: 78, // 글번호
    title: "몰타 입국절차",
    name: "관리자",
  },
];

const Data = () => {
  return (
    <Container>
      <List>
        <li>
          <span className="index">번호</span>
          <span className="title">제목</span>
          <span className="name">글쓴이</span>
        </li>
        {data.map((element, index) => (
          <li key={element.number}>
            <span className="index">{index + 1}</span>
            <span className="title">{element.title}</span>
            <span className="name">{element.name}</span>
          </li>
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div``;

const List = styled.ul`
  li {
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid var(--color-grayscale20);
    position: relative;
    span {
      display: flex;
      justify-content: center;
      box-sizing: border-box;
    }
  }
  .index {
    min-width: 80px;
  }
  .title {
    margin-left: 20px;
    width: 100%;
  }
  .name {
    min-width: 110px;
  }

  // 게시글 항목
  li:nth-child(1) {
    background-color: var(--color-grayscale10);
    border-top: 1px solid var(--color-grayscale20);
  }

  li:not(li:nth-child(1)) {
    .title {
      justify-content: left;
    }
  }

  @media (max-width: 850px) {
    // 게시글 항목
    li:nth-child(1),
    .index {
      display: none;
    }
    li {
      height: 100%;
      border-bottom: none;
      border-top: 1px solid var(--color-grayscale20);
    }
    .name {
      position: absolute;
      left: 0;
      top: 22px;
      min-width: 0;
      color: var(--color-grayscale60);
      font-size: 14px;
    }
    .title {
      margin-left: 0;
      margin: 58px 0 22px;
      font-weight: 700;
      font-size: 18px;
      flex-wrap: wrap;
      line-height: 1.2;
    }
  }
`;

export default Data;
