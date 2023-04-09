import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";

const ProductDetailModalOption = () => {
  const [drop, setDrop] = useState<boolean>(false);

  return (
    <Option>
      <div>
        <strong>필수옵션</strong>
        <span>출발도시 및 출발지</span>
      </div>
      <p onClick={() => setDrop((prev) => !prev)}>
        인천 출발 3박5일 07.20.수~07.24.일
        <IoIosArrowDown color="#868686" />
      </p>
      {drop ? (
        <ul>
          <li onClick={() => setDrop(false)}>
            <span>인천 출발 3박5일 07.20.수~07.24.일</span>
            <span>+100,000원</span>
          </li>
          <li onClick={() => setDrop(false)}>
            <span>인천 출발 3박5일 07.20.수~07.24.일</span>
            <span>+100,000원</span>
          </li>
          <li onClick={() => setDrop(false)}>
            인천 출발 3박5일 07.20.수~07.24.일
          </li>
        </ul>
      ) : null}
    </Option>
  );
};

const Option = styled.li`
  margin-bottom: 30px;
  :first-child h4 {
    strong {
      color: #0d99ff; // 필수옵션만 이 색상
    }
  }
  div {
    margin-bottom: 10px;
    strong {
      margin-right: 10px;
      font-weight: bold;
      color: #5b5b5b;
    }
  }
  p {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 5px;
    padding: 10px;
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    box-sizing: border-box;
    cursor: pointer;
  }
  ul {
    border: 1px solid #000;
    border-radius: 8px;
    li {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      border-radius: 8px;
      cursor: pointer;
      :hover {
        background-color: #f5f5f5;
        color: #48484a;
        font-weight: bold;
      }
      span {
        :last-child {
          font-weight: bold;
        }
      }
    }
  }
`;
export default React.memo(ProductDetailModalOption);
