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
    const { id: clickedMenu } = event.currentTarget;
    setPage(clickedMenu);
  };

  return (
    <Container>
      <h1>공지사항</h1>
      <MenuList page={page}>
        {menu.map((props) => (
          <li
            key={props.id}
            id={props.id}
            onClick={menuClick}
            className={props.id === page ? "selected" : ""}
          >
            {props.title}
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
    margin: 30px 0;
    font-size: 28px;
    font-weight: 700;
  }
`;

const MenuList = styled.ul<{ page: string }>`
  font-size: 18px;
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
