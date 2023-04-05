import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { ReviewSelectState } from "./../../@types/data.d";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IReviewFilterItemProps } from "../../@types/props";

const ReviewFilterItem = ({ title, content }: IReviewFilterItemProps) => {
  const selectRef = useRef<HTMLUListElement>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [select, setSelect] = useState<string>(content[0]);

  const handleClick = (item: string) => {
    setSelect(item);
    setOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  return (
    <Items ref={selectRef}>
      <SelectTitle
        data-name={title}
        onClick={() => setOpen((prev: boolean) => !prev)}
      >
        {select}
        <MdKeyboardArrowDown color="#868686" />
      </SelectTitle>
      {open && (
        <ul>
          {content.map((item: string) => (
            <Item key={item} onClick={() => handleClick(item)}>
              {item}
            </Item>
          ))}
        </ul>
      )}
    </Items>
  );
};

const Items = styled.ul`
  margin-left: 20px;
  position: relative;
  :nth-child(1) {
    margin-left: 0;
  }
  :last-child {
    position: absolute;
    right: 0;
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

export default ReviewFilterItem;
