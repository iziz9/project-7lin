import React from "react";
import styled from "styled-components";
import ProductDetailModalOption from "./ProductDetailModalOption";

interface IProductDetailModalProps {
  image: string;
  title: string;
  price: string;
}

const ProductDetailModal = ({
  image,
  title,
  price,
}: IProductDetailModalProps) => {
  return (
    <Wrap>
      <h3>옵션 선택</h3>
      <ProductCard>
        <img src={image} alt="상품 이미지" />
        <div>
          <strong>{title} </strong>
          <p>{price}</p>
        </div>
      </ProductCard>
      <Options>
        {[1, 2, 3].map((item) => (
          <ProductDetailModalOption key={item} />
        ))}
      </Options>

      <Buttons>
        <button>취소하기</button>
        <button>변경하기</button>
      </Buttons>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 30px;
  }
`;
const ProductCard = styled.div`
  width: 100%;
  padding: 10px;
  border: 1px solid #bbbbbb;
  border-radius: 8px;
  display: flex;
  box-sizing: border-box;
  img {
    width: 90px;
    border-radius: 8px;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
    width: calc((100%) - (90px));
    font-weight: bold;
    strong {
      width: 95%;
      display: block;
      margin-bottom: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 20px;
    }
    p {
      font-size: 23px;
      color: #0d99ff;
    }
  }
`;
const Options = styled.ul`
  width: 100%;
  align-self: flex-start;
  margin-top: 30px;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    width: 100%;
    padding: 10px 0;
    background-color: transparent;
    outline: none;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    font-size: 20px;
    :first-child {
      margin-right: 10px;
      border: 1px solid #bbbbbb;
      color: #5b5b5b;
    }
    :last-child {
      background-color: #0d99ff;
      color: white;
    }
  }
`;

export default ProductDetailModal;
