import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { render } from "react-dom";
import { ProductType } from "./Groups";

type ProductProps = {
  product: ProductType; // 부모 컴포넌트에서 import한 타입
};

const Product = ({ product }: ProductProps) => {
  return (
    <Link to={`/product/${product.productId}`}>
      <Item>
        <img
          className="image"
          src={product.thumbnail}
          alt={product.productName}
        />
        <AiOutlineHeart />
        <h3 className="title">{product.productName}</h3>
        <span className="price">
          {product.productPrice.toLocaleString("ko-KR")}원
        </span>
        <p
          className="body"
          dangerouslySetInnerHTML={{ __html: product.briefExplanation }}
        ></p>
      </Item>
    </Link>
  );
};

const Item = styled.li`
  /* overflow: hidden; */
  position: relative;
  display: flex;
  flex-direction: column;
  line-height: 1.6;

  svg {
    position: absolute;
    right: 16px;
    top: 16px;
    font-size: 25px;
  }
  .image {
    width: 100%;
    object-fit: cover;
    &:hover {
      opacity: 0.4;
    }
  }
  .title {
    font-weight: 700;
    font-size: 20px;
    margin: 14px 0 4px;
    line-height: 1.5;
  }
  .price {
    font-size: 18px;
    color: #0080c6;
  }
  .body {
    font-size: 15px;
    color: var(--color-grayscale40);
  }

  @media (max-width: 850px) {
    svg {
      right: 8px;
      top: 8px;
      font-size: 20px;
    }
    .title {
      margin-top: 14px;
      font-size: 16px;
    }
    .price {
      font-size: 14px;
      margin-bottom: 8px;
    }
    .body {
      font-size: 14px;
    }
  }
`;

export default Product;
