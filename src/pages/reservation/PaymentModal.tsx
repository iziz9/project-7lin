import React from "react";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";
import { modalState } from "../../store/modalAtom";
import { BasicBtn } from "../../commons/Button";
import { scrollToTop } from "../../utils/scroll";

type Props = {};

const PaymentModal = (props: Props) => {
  const { openModal, closeModal } = useModal();

  return (
    <Container>
      <div className="content">
        <span className="bank">KEB하나은행</span>
        <span className="account"> 267-910020-36604</span> (주)더샤이니
      </div>
      <div className="price">
        <h2>결제금액</h2>
        <span>2,860,000원</span>
      </div>
      <div
        onClick={() => {
          scrollToTop();
          closeModal();
        }}
      >
        <BasicBtn>예약 내역 조회</BasicBtn>
      </div>
    </Container>
  );
};

const Container = styled.div`
  font-style: normal;
  font-size: 20px;
  word-break: keep-all;
  position: relative;

  .price {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin: -20px auto 10px;
    padding: 20px;
    font-size: 23px;

    h2 {
      color: gray;
    }

    span {
      color: orange;
      font-weight: bold;
    }
  }

  .content {
    margin-bottom: 29px;
    text-align: center;
    color: rgba(98, 98, 98, 0.78);
    display: flex;
    flex-direction: column;
    gap: 6px;

    .bank {
      font-weight: 600;
    }
    .account {
      color: #0d99ff;
      font-weight: 600;
      font-size: 20px;
    }
  }

  @media (max-width: 850px) {
    font-size: 16px;

    .price {
      font-size: 20px;
    }
    .account {
      font-size: 18px;
    }
  }
`;

export default PaymentModal;
