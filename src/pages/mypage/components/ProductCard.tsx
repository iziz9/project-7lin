import React from "react";
import styled from "styled-components";
import { BasicBtn } from "../../../commons/Button";

interface Props {
  reservation?: boolean;
  favor?: boolean;
  tab?: number;
}

const ProductCard = ({ tab, reservation, favor }: Props) => {
  const getReservationButtonElement = () => {
    switch (tab) {
      case 0:
        return (
          <>
            <BasicBtn>상세보기</BasicBtn>
            <BasicBtn backgroundColor="#b5b4b4">취소하기</BasicBtn>
          </>
        );
      case 1:
        return (
          <>
            <BasicBtn>후기쓰가</BasicBtn>
          </>
        );
      case 2:
        return (
          <>
            <BasicBtn>다시 예약하기</BasicBtn>
          </>
        );
    }
  };

  const getFavorButtonElement = () => {
    return (
      <>
        <BasicBtn>예약하기</BasicBtn>
        <BasicBtn backgroundColor="#b5b4b4">취소하기</BasicBtn>
      </>
    );
  };

  const buttonElement = reservation
    ? getReservationButtonElement()
    : getFavorButtonElement();

  return (
    <Container>
      <div className="wrapper">
        <div className="img-wrapper">
          <img src="/product_img.png" />
        </div>
        <div className="info">
          <div className="date">
            {reservation ? "2023. 04. 15" : "# 자연 친화"}
          </div>
          <div className="title">제주도 이호등대</div>
          <div className="num">
            {reservation ? "예약번호: 364927 예약 인원: 2인" : "394,204원"}
          </div>
        </div>
        <div className="button-wrapper">{buttonElement}</div>
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
      width: 65%;

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
    .button-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      gap: 8px;
    }
  }
`;

export default ProductCard;
