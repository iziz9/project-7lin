import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const middleCategoryData = {
  groups: {
    "5070": "5070끼리",
    gentlemen: "남자끼리",
    ladies: "여자끼리",
    family: "가족끼리",
    anyone: "누구든지",
  },
  // themes: ["문화탐방", "골프여행", "휴양지", "트레킹", "성지순례"],
  // destination: [
  //   "동남아/태평양",
  //   "인도/중앙아시아",
  //   "아프리카/중동",
  //   "유럽/코카서스",
  //   "중남미/북미",
  // ],
};

interface ContainerProps {
  length: number;
}

interface SubMenuProps {
  mainCategory: string;
  setMiddleCategory: Function;
}

interface middleCategoryType {
  groups: object;
}

const SubMenu = ({ mainCategory, setMiddleCategory }: SubMenuProps) => {
  const middleCategoryList: middleCategoryType = eval(
    "middleCategoryData." + mainCategory,
  );

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setMiddleCategory(event.currentTarget.id);
  };

  return (
    <>
      <Container
        length={Object.keys(eval("middleCategoryData." + mainCategory)).length}
      >
        {Object.entries(middleCategoryList).map(([key, value]) => (
          <Link
            className="submenu"
            to={`/${mainCategory}/${key}`}
            id={key}
            key={key}
            onClick={onClick}
          >
            {value}
          </Link>
        ))}
      </Container>
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
