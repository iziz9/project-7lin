import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ReviewSelectState } from "./../../@types/data.d";

const ReviewFilters = () => {
  const [open, setOpen] = useState<ReviewSelectState>({
    name: "",
    isOpen: false,
  });
  const selectRef = useRef<HTMLUListElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const name = event.currentTarget.dataset.name;
    setOpen((prev: ReviewSelectState) => {
      return { name, isOpen: !prev.isOpen };
    });
  };

  // 열린 상태로 한번 더 누르면 깜빡거리고 다시 켜짐..?
  // ref 를 공유하고 있어서 그런 것. 컴포넌트화 해서 반복하면 고쳐질 것 같음
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setOpen({ name: "", isOpen: false });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  return (
    <Filtering>
      <Left>
        <Items ref={selectRef}>
          <SelectTitle data-name="group" onClick={handleClick}>
            그룹별 여행 전체
            <MdKeyboardArrowDown color="#868686" />
          </SelectTitle>
          {open.name === "group" && open.isOpen ? (
            <ul>
              <Item>5070끼리</Item>
              <Item>남자끼리</Item>
              <Item>여자끼리</Item>
              <Item>가족끼리</Item>
              <Item>누구든지</Item>
            </ul>
          ) : null}
        </Items>
        <Items ref={selectRef}>
          <SelectTitle data-name="location" onClick={handleClick}>
            지역별 여행 전체
            <MdKeyboardArrowDown color="#868686" />
          </SelectTitle>
          {open.name === "location" && open.isOpen ? (
            <ul>
              <Item>동남아/태평양</Item>
              <Item>인도/중앙아시아</Item>
              <Item>아프리카/중동</Item>
              <Item>유럽/코카서스</Item>
              <Item>중남미/북미</Item>
              <Item>대만/중국/일본</Item>
            </ul>
          ) : null}
        </Items>
        <Items ref={selectRef}>
          <SelectTitle data-name="theme" onClick={handleClick}>
            테마별 여행 전체
            <MdKeyboardArrowDown color="#868686" />
          </SelectTitle>
          {open.name === "theme" && open.isOpen ? (
            <ul>
              <Item>문화탐방</Item>
              <Item>골프여행</Item>
              <Item>휴양지</Item>
              <Item>트레킹</Item>
              <Item>성지순례</Item>
              <Item>볼론투어</Item>
            </ul>
          ) : null}
        </Items>
      </Left>
      <Right>
        <Items ref={selectRef}>
          <SelectTitle data-name="sort" onClick={handleClick}>
            최신순
            <MdKeyboardArrowDown color="#868686" />
          </SelectTitle>
          {open.name === "sort" && open.isOpen ? (
            <ul>
              <Item>조회순</Item>
              <Item>평점높은순</Item>
              <Item>평점낮은순</Item>
            </ul>
          ) : null}
        </Items>
      </Right>
    </Filtering>
  );
};

const Filtering = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;
const Left = styled.div`
  display: flex;
`;
const Items = styled.ul`
  margin-left: 20px;
  position: relative;
  :nth-child(1) {
    margin-left: 0;
  }
  ul {
    margin-top: 10px;
    position: absolute;
    z-index: 1;
    border-radius: 10px;
    border: 1px solid #636366;
  }
  li {
    cursor: pointer;
  }
`;
const SelectTitle = styled.li`
  display: flex;
  align-items: center;
  width: 200px;
  padding: 20px 15px;
  box-sizing: border-box;
  position: relative;
  background-color: white;
  border: 1px solid #636366;
  border-radius: 10px;

  svg {
    position: absolute;
    right: 10px;
    width: 20px;
    height: 20px;
  }
`;
const Item = styled.li`
  width: 200px;
  padding: 20px 15px;
  box-sizing: border-box;
  background-color: white;
  :hover {
    background-color: #f5f5f5;
    color: #48484a;
    font-weight: bold;
    transition: 0.3s;
  }
  :first-child {
    border-radius: 10px 10px 0 0;
  }
  :last-child {
    border-radius: 0 0 10px 10px;
  }
`;
const Right = styled.div``;

export default ReviewFilters;
