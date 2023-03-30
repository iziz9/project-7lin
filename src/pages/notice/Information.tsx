import React from "react";
import styled from "styled-components";

// 목업데이터
const infoData = [
  {
    number: 123, // 글번호
    category: "여행설명회",
    title: "2023시즌 봄 산티아고 순례길 여행설명회",
    name: "관리자",
    date: "2023-01-12",
  },
  {
    number: 456, // 글번호
    category: "여행설명회",
    title: "22-23 겨울 시즌 중남미, 아프리카 및 기타지역 여행설명회",
    name: "관리자",
    date: "2022-10-04",
  },
  {
    number: 789, // 글번호
    category: "공지사항",
    title: "2022 제13회 관광벤처 공모전 초기창업 부문 선정",
    name: "관리자",
    date: "2022-05-09",
  },
];

const Information = () => {
  return (
    <Container>
      <List>
        <li>
          <span className="index">번호</span>
          <span className="category">카테고리</span>
          <span className="title">제목</span>
          <span className="name">글쓴이</span>
          <span className="date">작성시간</span>
        </li>
        {infoData.map((element, index) => (
          <li key={element.number}>
            <span className="index">{index + 1}</span>
            <span
              className={`category ${
                element.category === "공지사항" ? "notice" : "presentation"
              }`}
            >
              {element.category}
            </span>
            <span className="title">{element.title}</span>
            <span className="name">{element.name}</span>
            <span className="date">{element.date}</span>
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
    span {
      display: flex;
      justify-content: center;
      box-sizing: border-box;
    }
  }
  .index {
    min-width: 80px;
  }
  .category {
    min-width: 110px;
    padding: 8px;
    border-radius: 10px;
  }
  .title {
    margin-left: 30px;
    width: 100%;
  }
  .name {
    min-width: 90px;
  }
  .date {
    min-width: 130px;
  }

  // 게시글 항목
  li:nth-child(1) {
    background-color: var(--color-grayscale10);
    border-top: 1px solid var(--color-grayscale20);
    border-bottom: 1px solid var(--color-grayscale20);
  }

  // 게시글 리스트
  li:not(li:nth-child(1)) {
    border-bottom: 1px solid var(--color-grayscale20);
    .title {
      justify-content: left;
    }
    .category {
      color: #ffffff;
    }
    .presentation {
      background-color: #ff5852;
    }
    .notice {
      background-color: #0d99ff;
    }
  }
`;

export default Information;
