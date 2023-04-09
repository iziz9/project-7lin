import { AiOutlineHeart } from "react-icons/ai";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { ProductType } from "../../@types/data";

interface ProductProps {
  product: ProductType; // 부모 컴포넌트에서 import한 타입
}

const Product = ({ product }: ProductProps) => {
  const { briefExplanation, productId, productName, productPrice, thumbnail } =
    { ...product };
  return (
    <Link to={`/product/${productId}`}>
      <Item>
        <img className="image" src={thumbnail} alt={productName} />
        <AiOutlineHeart />
        <h3 className="title">{productName}</h3>
        <span className="price">
          {productPrice
            ? `${productPrice.toLocaleString("ko-KR")}원`
            : "가격문의"}
        </span>
        <p
          className="body"
          dangerouslySetInnerHTML={{ __html: briefExplanation }}
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
    object-fit: contain;
    aspect-ratio: 1 / 1; // 가로세로 길이가 다른 썸네일용
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
