import React from "react";
import styled from "styled-components";

const ProductInfosCard = () => {
  return (
    <ProductInfo>
      <img src="/product_img.png" alt="상품 이미지" />
      <TextArea>
        <h2>중앙아시아 3국 15일</h2>
        <div>
          <div>
            <p>
              <strong>여행 기간</strong>
              <span>2023/05/30(화)출발~06/13(화)도착</span>
            </p>
            <p>
              <strong>예약 금액</strong>
              <span>6,330,000원</span>
            </p>
          </div>
          <div>
            <p>
              <strong>상품 옵션</strong>
              <span>1인 싱글룸 사용 - 1개</span>
            </p>
            <p>
              <strong>예약 인원</strong>
              <span>2인</span>
            </p>
          </div>
        </div>
      </TextArea>
    </ProductInfo>
  );
};

const ProductInfo = styled.div`
  padding: 20px;
  display: flex;
  background-color: #f5f5f5;
  border-radius: 10px;
  img {
    margin-right: 30px;
    border-radius: 10px;
  }
`;
const TextArea = styled.div`
  h2 {
    margin-top: 10px;
    margin-bottom: 30px;
    font-size: 30px;
    font-weight: bold;
    color: #4a4a4a;
  }
  > div {
    display: flex;
    > div {
      display: flex;
      flex-direction: column;
      margin-right: 30px;
      P {
        margin-right: 20px;
        margin-bottom: 20px;
        font-size: 18px;
        color: #4a4a4a;
        strong {
          margin-right: 20px;
          font-weight: bold;
        }
      }
    }
  }
`;

export default ProductInfosCard;
