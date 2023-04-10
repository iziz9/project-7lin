import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { number, string } from "yup";
import {
  ReviewReservationOptionDtolist,
  ReviewReservationPeriodDtolist,
} from "../@types/data";

export interface IProductInfosCardProps {
  title: string;
  period: ReviewReservationPeriodDtolist[];
  option: ReviewReservationOptionDtolist[];
  price: number;
  count: number;
  image?: string;
}

const DetailInfos = ({
  title,
  period,
  option,
  price,
  count,
}: IProductInfosCardProps) => {
  return (
    <DetailInfosWrap>
      <div>
        <p>
          <strong>여행 기간</strong>
          <span>
            {period[0].startDate} ~ {period[0].endDate}
          </span>
        </p>
        <p>
          <strong>예약 금액</strong>
          <span>{price.toLocaleString()}원</span>
        </p>
      </div>
      <div>
        <p>
          <strong>상품 옵션</strong>
          {option[0] ? (
            <span>
              {option[0].content} - {option[0].amount}개
            </span>
          ) : null}{" "}
          {option[1] ? (
            <span>
              / {option[1].content} - {option[1].amount}개
            </span>
          ) : null}
        </p>
        <p>
          <strong>예약 인원</strong>
          <span>{count}인</span>
        </p>
      </div>
    </DetailInfosWrap>
  );
};

const ProductInfosCard = ({
  title,
  period,
  option,
  price,
  count,
  image,
}: IProductInfosCardProps) => {
  const isMobile: boolean = useMediaQuery({
    query: "(max-width:850px)",
  });

  return (
    <ProductInfo isMobile={isMobile}>
      <div>
        <img src={image} alt="상품 이미지" />
        <TextArea isMobile={isMobile}>
          <h2>{title}</h2>
          {isMobile ? <h3>{price}</h3> : null}
          {isMobile ? null : (
            <DetailInfos
              title={title}
              period={period}
              option={option}
              price={price}
              count={count}
            />
          )}
        </TextArea>
      </div>
      {isMobile ? (
        <DetailInfos
          title={title}
          period={period}
          option={option}
          price={price}
          count={count}
        />
      ) : null}
    </ProductInfo>
  );
};

const ProductInfo = styled.div<{ isMobile: boolean }>`
  padding: 20px;
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  background-color: #f5f5f5;
  border-radius: 10px;
  img {
    width: ${({ isMobile }) => (isMobile ? "100px" : "200px")};
    margin-right: 30px;
    border-radius: 10px;
  }
  > div {
    display: flex;
    align-items: center;
  }
`;
const TextArea = styled.div<{ isMobile: boolean }>`
  width: 100%;
  h2 {
    margin-top: 10px;
    margin-bottom: 30px;
    font-size: ${({ isMobile }) => (isMobile ? "20px" : "30px")};
    font-weight: bold;
    color: #4a4a4a;
  }
  h3 {
    font-size: ${({ isMobile }) => (isMobile ? "20px" : "30px")};
    font-weight: bold;
    color: #0d99ff;
  }
  > div {
    display: flex;
    @media screen and (max-width: 1050px) {
      display: block;
      > div p {
        margin-bottom: 0;
        line-height: 25px;
      }
    }
    > div {
      display: flex;
      flex-direction: column;
      margin-right: 30px;
    }
    P {
      margin-right: 20px;
      margin-bottom: 20px;
      font-size: 20px;
      color: #4a4a4a;
      strong {
        margin-right: 20px;
        font-weight: bold;
      }
    }
  }
`;

const DetailInfosWrap = styled.div`
  @media screen and (max-width: 850px) {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    > div {
      width: 100%;
      align-self: flex-start;
      p {
        display: block;
        margin-bottom: 10px;
        padding: 20px;
        background-color: white;
        border-radius: 8px;
        strong {
          font-weight: bold;
          margin-right: 15px;
          line-height: 20px;
        }
      }
    }
  }
`;

export default ProductInfosCard;
