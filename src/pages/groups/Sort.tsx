import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { sortState } from "../../store/categoryAtom";
import { getSortName } from "../../utils/sort";

const sortData = [
  "최신 등록 순",
  "높은 가격 순",
  "낮은 가격 순",
  "긴 여행 순",
  "짧은 여행 순",
];

const Sort = ({ sortClick }: any) => {
  const isMobile = useMediaQuery({ query: "(max-width:850px)" });
  const [sort, setSort] = useRecoilState(sortState);

  return (
    <Container>
      {sortData.map((value, index) => (
        <li
          key={index}
          onClick={sortClick}
          id={value}
          className={sort.sort === value ? "selected" : ""}
        >
          <BsCheckLg />
          {value}
        </li>
      ))}
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
  gap: 6px;

  li {
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      cursor: pointer;
    }
  }

  @media (max-width: 850px) {
    margin: 20px;
  }

  .selected {
    color: red;
  }
`;

export default Sort;
