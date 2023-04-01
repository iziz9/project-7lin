import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import Modal from "../../commons/Modal";
import { useModal } from "../../hooks/useModal";
import PaymentModal from "./PaymentModal";

type Props = {};

const Reservation = (props: Props) => {
  const { openModal } = useModal();

  const PaymentModalData = {
    title: "입금 계좌 안내",
    content: <PaymentModal />,
  };

  const onSubmit = () => {
    console.log("api 연결");
  };

  return (
    <Container>
      <h1>결제하기</h1>
      <ProductInfo>
        <h2>예약 상품 정보</h2>
        <div className="product">
          <div>
            <img src="/footer-blog.png" alt="예약 상품 이미지" />
          </div>
          <div className="product-desc">
            <span className="title">중앙아시아 3국 15일</span>
            <span className="price">2,860,000원</span>
          </div>
        </div>
        <div className="options">
          <div className="back-gray">
            <h3 className="h3blue">필수</h3>
            <span>2023.05.30(화) 출발 ~ 06.30(화) 도착 - 2개</span>
          </div>
          <div className="back-gray">
            <h3>추가</h3>
            <span>1인 싱글룸 사용시 추가 - 2개</span>
          </div>
          <div className="back-gray">
            <h3>추가</h3>
            <span>인천 출발 비즈니스석 추가비용 - 1개</span>
          </div>
        </div>
      </ProductInfo>
      <UserInfo>
        <h2>예약자 정보</h2>
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log("수정 모달, api 연결");
          }}
        >
          수정하기
        </button>
        <ul>
          <li>
            <h3>예약자 이름</h3>
          </li>
          <li>이땡땡</li>
        </ul>
        <ul>
          <li>
            <h3>휴대폰 번호</h3>
          </li>
          <li>01012345678</li>
        </ul>
        <ul>
          <li>
            <h3>이메일 주소</h3>
          </li>
          <li>abc@abc.com</li>
        </ul>
      </UserInfo>
      <PaymentInfo>
        <h2>결제 정보</h2>
        <ul>
          <li>
            <h3>총 상품 수</h3>
          </li>
          <li>1개</li>
        </ul>
        <ul>
          <li>
            <h3>총 인원</h3>
          </li>
          <li>2인</li>
        </ul>
        <ul className="margin-border">
          <li>
            <h3>상품 금액</h3>
          </li>
          <li>2,860,000원</li>
        </ul>
        <div className="total">
          <h3>총 예약 금액</h3>
          <span className="price">2,860,000원</span>
        </div>
      </PaymentInfo>
      <CheckTerms>
        <h2>약관 동의</h2>
        <div className="all-agree">
          <input type="checkbox" id="all" required />
          <label htmlFor="all">전체동의</label>
        </div>
        <div>
          <input type="checkbox" id="agree1" required />
          <label htmlFor="agree1">
            <span onClick={() => console.log("이용동의 모달 띄우기")}>
              개인정보 수집 및 이용{" "}
            </span>
            동의
          </label>
        </div>
        <div>
          <input type="checkbox" id="agree2" required />
          <label htmlFor="agree2">예약조건 확인 및 결제진행에 동의</label>
        </div>
      </CheckTerms>
      <button
        type="submit"
        className="submit"
        onClick={(e) => {
          e.preventDefault();
          onSubmit();
          openModal(PaymentModalData);
        }}
      >
        2,860,000원 결제하기
      </button>
      <Modal />
    </Container>
  );
};

const Container = styled.form`
  height: 100%;
  padding: 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  word-break: keep-all;
  background-color: var(--color-grayscale10);

  h1 {
    font-size: 20px;
    font-weight: bold;
  }

  h2 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  h3 {
    color: var(--color-grayscale40);
  }

  section {
    width: 100%;
    background-color: white;
    /* background-color: var(--color-grayscale10); */
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 8px;
    padding: 16px;
    box-sizing: border-box;
  }

  ul {
    display: flex;
    gap: 15px;
    font-size: 14px;
  }

  .submit {
    width: 100%;
    height: 58px;
    background-color: var(--color-blue);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }
`;

const ProductInfo = styled.section`
  width: 100%;
  /* background-color: white; */
  display: flex;
  flex-direction: column;

  .product {
    display: flex;
    gap: 20px;

    img {
      width: 70px;
      height: 70px;
    }
    .product-desc {
      height: 70px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      justify-content: center;
      font-weight: bold;

      .title {
        font-size: 16px;
      }

      .price {
        color: var(--color-blue);
        font-size: 20px;
      }
    }
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .h3blue {
      color: var(--color-blue);
    }

    .back-gray {
      font-size: 14px;
      background-color: var(--color-grayscale10);
      /* background-color: white; */
      padding: 12px;
      display: flex;
      gap: 7px;
    }
  }
`;

const UserInfo = styled.section`
  position: relative;
  button {
    position: absolute;
    top: 10px;
    right: 15px;
    width: 75px;
    height: 30px;
    border: 1px solid var(--color-grayscale40);
    color: var(--color-grayscale40);
    font-size: 14px;
    border-radius: 8px;
    background-color: white;
    cursor: pointer;
  }

  h3 {
    color: var(--color-grayscale40);
  }
`;

const PaymentInfo = styled.section`
  h3 {
    color: var(--color-grayscale40);
  }

  ul {
    justify-content: space-between;
  }

  .margin-border {
    padding-bottom: 15px;
  }

  .total {
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
    border-top: 1px solid black;
    line-height: 20px;

    .price {
      color: var(--color-blue);
      font-size: 20px;
      font-weight: bold;
    }
  }
`;

const CheckTerms = styled.section`
  display: flex;
  flex-direction: row;

  div {
    display: flex;

    input[type="checkbox"] {
      transform: scale(1.2);
      cursor: pointer;
    }

    label {
      margin-left: 10px;
      cursor: pointer;
      font-size: 14px;
      line-height: 20px;

      span {
        color: var(--color-blue);
      }
    }
  }

  .all-agree {
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--color-grayscale40);
  }
`;

export default Reservation;
