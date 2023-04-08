import React, { useState } from "react";
import styled from "styled-components";
import ProductDetailModalOption from "./ProductDetailModalOption";
import { IoMdClose } from "react-icons/io";
import { BiPlus, BiMinus } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";
import MobileOptionModal from "../../commons/MobileOptionModal";

interface IProductDetailModalProps {
  image: string;
  title: string;
  price: string;
  closeModal: () => any;
  type: string;
}

const ProductDetailModal = ({
  image,
  title,
  price,
  closeModal,
  type,
}: IProductDetailModalProps) => {
  const isMobile: boolean = useMediaQuery({
    query: "(max-width:850px)",
  });

  const [count, setCount] = useState<number>(1);

  return (
    <Wrap>
      {isMobile && <IoMdClose size={25} onClick={() => closeModal()} />}
      {isMobile ? (
        type === "선택" ? (
          <h1>옵션 선택</h1>
        ) : (
          <h1>옵션 / 수량 변경</h1>
        )
      ) : null}

      <ProductCard>
        <img src={image} alt="상품 이미지" />
        <div>
          <strong>{title} </strong>
          <p>{Number(price).toLocaleString()}원</p>
        </div>
      </ProductCard>
      <Options>
        {[1, 2, 3].map((item) => (
          <ProductDetailModalOption key={item} />
        ))}
      </Options>

      <ChangeWrap>
        <h4>{type}된 옵션</h4>
        <div>
          <ProductInfo>
            <img src={image} alt="상품 이미지" />
            <div>
              <h5>{title}</h5>
              <p>
                <strong>여행 기간</strong>
                <span>2023.05.30(화) 출발 ~ 06.30(화) 도착</span>
              </p>
            </div>
          </ProductInfo>

          <OptionCards>
            <OptionCard>
              <Top>
                <strong>필수옵션</strong>
                <p>2023.05.30(화) 출발 ~ 06.30(화) 도착 - 2개</p>
                <IoMdClose />
              </Top>
              <Bottom>
                <p>
                  <BiMinus
                    size={23}
                    onClick={() =>
                      setCount((prev) => (prev === 1 ? 1 : prev - 1))
                    }
                  />
                  <span>{count}</span>
                  <BiPlus
                    size={23}
                    onClick={() => setCount((prev) => prev + 1)}
                  />
                </p>
                <h2>1,190,000원</h2>
              </Bottom>
            </OptionCard>
          </OptionCards>

          <p>
            <span>총 예약 금액</span>
            <strong>2,990,000원</strong>
          </p>
        </div>
      </ChangeWrap>

      <Buttons>
        {!isMobile && <button onClick={() => closeModal()}>취소하기</button>}
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
  box-sizing: border-box;
  h1 {
    margin-top: 10px;
    margin-bottom: 30px;
    font-size: 30px;
    font-weight: bold;
  }
  > svg {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  @media screen and (max-width: 850px) {
    width: 100vw;
    height: 100vh;
    padding: 30px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: white;
    overflow-y: auto;
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
    width: 100%;
    font-weight: bold;
    strong {
      display: block;
      margin-bottom: 15px;
      font-size: 20px;
      word-break: break-all;
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
    cursor: pointer;
    :first-child {
      margin-right: 10px;
      border: 1px solid #bbbbbb;
      color: #5b5b5b;
    }
    :last-child {
      background-color: #0d99ff;
      color: white;
      @media screen and (max-width: 850px) {
        position: fixed;
        bottom: 0;
        right: 6px;
        border-radius: 0;
      }
    }
  }
`;

// 선택된 옵션
const ChangeWrap = styled.div`
  margin-top: 20px;
  margin-bottom: 70px;
  width: 100%;
  > h4 {
    font-size: 23px;
    color: #48484a;
    font-weight: bold;
  }
  > div {
    margin-top: 30px;
    padding: 25px;
    border: 1px solid #bbbbbb;
    border-radius: 8px;
    > p {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 25px;
      > span {
        margin-right: 25px;
        font-size: 21px;
        color: #8e8e93;
      }
      > strong {
        font-size: 25px;
        font-weight: bold;
        color: #0d99ff;
      }
    }
  }
`;
const ProductInfo = styled.div`
  display: flex;
  margin-bottom: 20px;
  img {
    width: 90px;
    height: 90px;
    margin-right: 30px;
    border-radius: 8px;
  }
  > div {
    width: 100%;
    h5 {
      margin-bottom: 15px;
      font-size: 22px;
      font-weight: bold;
    }
    p {
      margin-bottom: 10px;
      :last-child {
        margin-bottom: 0;
      }
      strong {
        display: inline-block;
        width: 70px;
        color: #acacac;
      }
      span {
        color: #5b5b5b;
      }
    }
  }
`;
const OptionCards = styled.div`
  div :first-child strong {
    color: #0d99ff;
  }
`;
const OptionCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;
const Top = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  color: #48484a;
  strong {
    margin-right: 17px;
    flex-shrink: 0;
  }
  svg {
    margin-left: auto;
    flex-shrink: 0;
  }
`;
const Bottom = styled.div`
  width: 85%;
  align-self: flex-end;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > p {
    padding: 5px;
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 8px;
    > svg {
      border: 1px solid #0d99ff;
      border-radius: 100%;
      color: #0d99ff;
      cursor: pointer;
    }
    span {
      width: 50px;
      font-size: 21px;
      text-align: center;
    }
  }
  h2 {
    font-size: 23px;
    font-weight: bold;
  }
`;

export default ProductDetailModal;
