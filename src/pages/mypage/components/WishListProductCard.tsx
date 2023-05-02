import React from "react";
import { WishListProduct } from "../../../@types/data";
import { BasicBtn } from "../../../commons/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useDeleteWishlistMutation from "../../../hooks/useDeleteWishlistMutation";
import Spinner from "/spinner.svg";

interface Props {
  product: WishListProduct;
}

const WishListProductCard = ({ product }: Props) => {
  const navigate = useNavigate();

  const deleteWishListMutation = useDeleteWishlistMutation();

  return (
    <Container>
      <div className="wrapper">
        <div className="left">
          <div className="img-wrapper">
            <img src={product.thumbnail} />
          </div>
          <div className="info">
            <div className="date">
              {product.tagList.map((tag, index) => (
                <span key={index}>{`#${tag}`}</span>
              ))}
            </div>
            <div className="title">{product.productName}</div>
            <div className="num">
              {product.productPrice.toLocaleString("ko-KR")}원
            </div>
          </div>
        </div>
        <div className="button-wrapper">
          <BasicBtn onClick={() => navigate(`/product/${product.productId}`)}>
            상세보기
          </BasicBtn>
          <BasicBtn
            backgroundColor="#b5b4b4"
            onClick={() => {
              if (confirm("정말로 찜 목록에서 삭제하시겠습니까?"))
                deleteWishListMutation.mutate(product.productId);
            }}
          >
            취소하기
          </BasicBtn>
        </div>
      </div>
      {deleteWishListMutation.isLoading ? (
        <>
          <div className="loading-wrapper">
            {/* <div className="loading-list">{listElement}</div> */}
          </div>
          <div className="spinner">
            <img src={Spinner} alt="로딩" width="70px" />
          </div>
        </>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  .wrapper {
    /* background-color: var(--color-grayscale10); */
    border-bottom: 1px solid var(--color-grayscale20);
    /* border-top: 1px solid var(--color-grayscale20); */
    /* border-radius: 8px; */
    padding: 20px 0;
    display: flex;
    .left {
      display: flex;
      width: 85%;
      .img-wrapper {
        margin-right: 20px;
        img {
          width: 150px;
          height: 150px;
        }
      }
      .info {
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        gap: 25px;
        /* width: 65%; */

        .date {
          font-size: 16px;
          color: #0d99ff;
          background-color: #fff;
          /* border-radius: 8px; */
          /* padding: 8px 20px; */
          padding: 8px 0;
          width: fit-content;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .title {
          font-size: 20px;
        }
        .num {
          font-size: 18px;
        }
      }
    }

    .button-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      gap: 8px;
    }
  }

  .loading-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    background-color: black;
  }

  .spinner {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* margin: auto; */
    display: flex;
    align-items: center;
    justify-content: center;
    /* left: 100px; */
  }

  @media (max-width: 850px) {
    .wrapper {
      /* display: block; */
      flex-direction: column;
      gap: 15px;
      .left {
        /* display: flex; */
        align-items: center;
        width: auto;
        .img-wrapper {
          margin-right: 20px;
          img {
            width: 85px;
            height: 85px;
          }
        }
        .info {
          gap: 10px;
          .date {
            font-size: 14px;
            padding: 0;
          }
          .title {
            font-size: 16px;
          }
          .num {
            font-size: 14px;
          }
        }
      }

      .button-wrapper {
        flex-direction: row;

        /* flex-grow: 1; */
        /* gap: 8px; */
      }
    }
  }
`;

export default WishListProductCard;
