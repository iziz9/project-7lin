import React from "react";
import styled from "styled-components";

const subMenu = ["5070끼리", "남자끼리", "여자끼리", "가족끼리", "누구든지"];

interface ContainerProps {
  length: number;
}

const SubMenu = () => {
  return (
    <>
      <Container length={subMenu.length}>
        {subMenu.map((element, index) => (
          <li key={index}>{element}</li>
        ))}
      </Container>
      <Line></Line>
    </>
  );
};

const Container = styled.ul<ContainerProps>`
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

  li {
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

    li {
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
