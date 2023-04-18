import { AiFillHeart } from "react-icons/ai";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ProductType } from "../../@types/data";
import { useRecoilValue } from "recoil";
import { itemState } from "../../store/categoryAtom";
import { getCookie } from "../../utils/cookie";
import useWishlistQuery from "../../hooks/useWishlistQuery";
import useDeleteWishlistMutation from "../../hooks/useDeleteWishlistMutation";
import useAddWishlistMutation from "../../hooks/useAddWishlistMutation";

interface ProductProps {
  product: ProductType; // 부모 컴포넌트에서 import한 타입
}

const Product = () => {
  const navigate = useNavigate();
  const items = useRecoilValue(itemState);
  const token = getCookie("accessToken");

  const { wishlistData } = useWishlistQuery();

  const addWishListMutation = useAddWishlistMutation();

  const deleteWishListMutation = useDeleteWishlistMutation();

  const toggleWishlist = (productId: number) => {
    if (wishlistData?.find((product) => product.productId === productId)) {
      deleteWishListMutation.mutate(productId);
    } else {
      addWishListMutation.mutate(productId);
    }
  };

  if (items.length === 0) {
    return (
      <NoContainer>
        <p></p>상품이 없습니다<p></p>
      </NoContainer>
    );
  } else {
    return (
      <Container>
        {items.map(
          (
            {
              briefExplanation,
              productId,
              productName,
              productPrice,
              thumbnail,
            },
            index,
          ) => (
            <div
              className="link"
              onClick={() => navigate(`/product/${productId}`)}
              key={index}
            >
              <Item>
                <img className="image" src={thumbnail} alt={productName} />
                {token ? (
                  <AiFillHeart
                    className={
                      wishlistData?.find(
                        (product) => product.productId === productId,
                      )
                        ? "favor active"
                        : "favor"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(productId);
                    }}
                  />
                ) : null}
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
            </div>
          ),
        )}
      </Container>
    );
  }
};

export const NoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(auto, 310px));
  max-width: 970px;
  margin: 80px 0;
  text-align: center;
`;

export const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(auto, 310px));
  grid-auto-rows: auto;
  gap: 20px;
  row-gap: 40px;
  max-width: 970px;

  .link {
    cursor: pointer;
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  // 모바일 환경
  @media (max-width: 850px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 420px) {
    grid-template-columns: repeat(1, minmax(auto, 360px));
  }
`;

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
    font-size: 35px;
    color: var(--color-grayscale30);
    transition: 0.6s;
    &.active {
      color: red;
    }
    &:hover {
      transform: scale(1.3);
    }
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
      /* right: 8px; */
      /* top: 8px; */
      font-size: 35px;
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
