import React from "react";
import styled from "styled-components";

const ModalProductCard = () => {
  return (
    <ProductCard>
      <img src="/product_img.png" alt="상품 이미지" />
      <div>
        <h2>중앙 아시아 3개국 중앙 아시아 3개국 중앙 아시아 3개국</h2>
        <p>
          <strong>예약 번호</strong>
          <span>263940</span>
        </p>
        <p>
          <strong>예약일</strong>
          <span>2023.02.09</span>
        </p>
        <p>
          <strong>예약 인원</strong>
          <span>4인</span>
        </p>
      </div>
    </ProductCard>
  );
};

const ProductCard = styled.div`
  display: flex;
  border: 1px solid #c2c2c2;
  border-radius: 8px;
  margin: 15px 0;
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  img {
    width: 110px;
    height: 110px;
    margin-right: 20px;
    border-radius: 8px;
    @media screen and (max-width: 850px) {
      display: none;
    }
  }
  div {
    padding: 5px 0;
    width: 240px;
    @media screen and (max-width: 850px) {
      width: 100%;
    }
    h2 {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      line-height: 25px;
      color: #4f4f4f;
      strong {
        display: inline-block;
        width: 75px;
        font-size: 16px;
        font-weight: bold;
      }
      span {
        font-size: 16px;
      }
    }
  }
`;

export default ModalProductCard;
