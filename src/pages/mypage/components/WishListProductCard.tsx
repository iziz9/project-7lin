import React from "react";
import { Product } from "../../../@types/data";
import { BasicBtn } from "../../../commons/Button";
import styled from "styled-components";

interface Props {
  product: Product;
}

const WishListProductCard = ({ product }: Props) => {
  return (
    <Container>
      <div className="wrapper">
        <div className="left">
          <div className="img-wrapper">
            <img src="/product_img.png" />
          </div>
          <div className="info">
            <div className="date"># 자연 친화</div>
            <div className="title">제주도 이호등대</div>
            <div className="num">394,204원</div>
          </div>
        </div>
        <div className="button-wrapper">
          <BasicBtn>예약하기</BasicBtn>
          <BasicBtn backgroundColor="#b5b4b4">취소하기</BasicBtn>
        </div>
      </div>
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
          background-color: #fff;
          /* border-radius: 8px; */
          /* padding: 8px 20px; */
          padding: 8px 0;
          width: fit-content;
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
