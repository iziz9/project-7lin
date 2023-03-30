import React, { useState } from "react";
import styled from "styled-components";
import Information from "./Information";
import Data from "./Data";
import Map from "./Map";

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
    id: "map",
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
      <MenuList page={page}>
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
      </MenuList>
      {page === "information" && <Information />}
      {page === "data" && <Data />}
      {page === "map" && <Map />}
    </Container>
  );
};

const Container = styled.div`
  h1 {
    margin-top: 60px;
    margin-bottom: 40px;
    font-size: 28px;
    font-weight: 700;
  }
`;

const MenuList = styled.ul<{ page: string }>`
  font-weight: 700;
  color: #4f4f4f;
  display: flex;
  gap: 26px;
  margin-bottom: 30px;

  .selected {
    color: var(--color-blue);
    border-bottom: 3px solid var(--color-blue);
    padding-bottom: 5px;
  }
`;

export default Notice;
