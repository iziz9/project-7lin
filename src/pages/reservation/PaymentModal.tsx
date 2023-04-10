import React from "react";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";
import { modalState } from "../../store/modalAtom";
import { BasicBtn } from "../../commons/Button";
import { scrollToTop } from "../../utils/scroll";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../store/userInfoAtom";
import { useNavigate } from "react-router";

const PaymentModal = ({ reservationNumber }: { reservationNumber: string }) => {
  const { openModal, closeModal } = useModal();
  const [savedUserInfo, setSavedUserInfo] = useRecoilState(userInfoState);
  const navigate = useNavigate();

  return (
    <Container>
      <div className="content">
        <span className="bank">KEB하나은행</span>
        <span className="account"> 267-910020-36604</span>
        (주)더샤이니
      </div>
      <div className="price">
        <h2>결제금액</h2>
        <span>2,860,000원</span>
      </div>
      <div className="reservation-number">
        <span className="number">주문번호 : {reservationNumber}</span>
        <span className="notice">
          비회원은 예약조회 시 주문번호가 필요하니 꼭 메모해주세요.
        </span>
      </div>
      <div
        onClick={() => {
          scrollToTop();
          closeModal();
        }}
      >
        <BasicBtn
          onClick={() => {
            savedUserInfo.name !== ""
              ? navigate("/mypage")
              : navigate("/login");
          }}
        >
          예약 내역 조회
        </BasicBtn>
      </div>
    </Container>
  );
};

const Container = styled.div`
  font-style: normal;
  font-size: 18px;
  word-break: keep-all;
  position: relative;

  .price {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin: -20px auto 10px;
    padding: 20px;
    font-size: 21px;

    h2 {
      color: gray;
    }

    span {
      color: black;
      font-weight: bold;
    }
  }

  .content {
    margin-bottom: 29px;
    text-align: center;
    color: rgba(98, 98, 98, 0.78);
    display: flex;
    flex-direction: column;
    gap: 8px;

    .bank {
      font-weight: 600;
    }
    .account {
      color: #0d99ff;
      font-weight: 600;
      font-size: 20px;
    }
  }

  .reservation-number {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    align-items: center;
    font-size: 18px;
    gap: 8px;
    text-align: center;

    .number {
      color: #0d99ff;
    }
    .notice {
      color: rgba(98, 98, 98, 0.78);
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

    .reservation-number {
      font-size: 16px;

      .number {
        color: #0d99ff;
      }
      .notice {
        color: rgba(98, 98, 98, 0.78);
      }
    }
  }
`;

export default PaymentModal;
