import React, { useState } from "react";
import styled from "styled-components";
import Information from "./Information";
import Data from "./Data";
import Way from "./Way";

const menu = [
  {
    id: "information",
    title: "게시판",
  },
  {
    id: "data",
    title: "자료실",
  },
  {
    id: "way",
    title: "오시는 길",
  },
];

const Notice = () => {
  const [page, setPage] = useState("information");

  const menuClick = (event: React.MouseEvent<HTMLLIElement>) => {
    setPage(event.currentTarget.id);
  };

  return (
    <Container>
      <h1>공지사항</h1>
      <Menu page={page}>
        {menu.map((element) => (
          <li
            key={element.id}
            id={element.id}
            onClick={menuClick}
            className={element.id === page ? "selected" : ""}
          >
            {element.title}
          </li>
        ))}
      </Menu>
      {page === "information" && <Information />}
      {page === "data" && <Data />}
      {page === "way" && <Way />}
    </Container>
  );
};

const Container = styled.div`
  margin: 0 20px;
  min-width: 330px;

  h1 {
    margin-top: 60px;
    margin-bottom: 40px;
    font-size: 28px;
    font-weight: 700;
  }

  @media (max-width: 850px) {
    h1 {
      margin: 40px 0 30px;
      font-size: 22px;
    }
  }
`;

const Menu = styled.ul<{ page: string }>`
  color: #4f4f4f;
  display: flex;
  gap: 26px;
  margin-bottom: 40px;

  .selected {
    color: var(--color-blue);
    border-bottom: 3px solid var(--color-blue);
    padding-bottom: 5px;
  }

  @media (max-width: 850px) {
    gap: 24px;
    .selected {
      padding-bottom: 3px;
    }
  }
`;

export default Notice;
