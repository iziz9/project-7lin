import React from "react";
import { Data, MemberReservationDetailResponse } from "../../../@types/data";
import styled from "styled-components";
import { BasicBtn } from "../../../commons/Button";
import { useMutation } from "react-query";
import { deleteReservation } from "../../../apis/auth";
import { useModal } from "../../../hooks/useModal";

type Props = {
  detailData: Data | undefined;
  isMember: boolean;
};

const ReservationDetailModal = ({ isMember, detailData }: Props) => {
  const { closeModal } = useModal();

  const optionTotalPrice = detailData?.options.reduce((prev, curr) => {
    return prev + curr.amount * curr.option.price;
  }, 0);

  const cancelReservationMutaiton = useMutation(deleteReservation, {
    onSuccess: (res: any) => {
      if (res.message === "성공") {
        console.log(res);
        alert("예약 취소 성공");
        closeModal();
      }
    },
    onError: (error) => {
      alert("예약취소 실패: " + error);
    },
  });

  return (
    <Container>
      <ProductInfo>
        <h2>예약 상품 정보</h2>
        <div className="product">
          <div>
            <img src={detailData?.product.thumbnail} alt="예약 상품 이미지" />
          </div>
          <div className="product-desc">
            <span className="title">{detailData?.product.productName}</span>
            <span className="price">
              {detailData?.product.productPrice.toLocaleString("ko-KR")}원
            </span>
          </div>
        </div>
        <div className="options">
          {detailData?.periods.map((period) => (
            <div className="back-gray" key={period.period.productPeriodId}>
              <h3 className="h3blue" style={{ color: "#0D99FF" }}>
                필수
              </h3>
              <span>
                {period.period.startDate} ~ {period.period.endDate} -{" "}
                {period.amount}개
              </span>
            </div>
          ))}
          {detailData?.options.map((option) => (
            <div className="back-gray" key={option.option.productOptionId}>
              <h3>추가</h3>
              <span>
                {option.option.content} - {option.amount}개
              </span>
            </div>
          ))}
        </div>
      </ProductInfo>
      <UserInfo>
        <h2>예약자 정보</h2>
        <ul>
          <li>
            <h3>예약자 이름</h3>
          </li>
          <li>{detailData?.name}</li>
        </ul>
        <ul>
          <li>
            <h3>휴대폰 번호</h3>
          </li>
          <li>{detailData?.phone}</li>
        </ul>
        <ul>
          <li>
            <h3>이메일 주소</h3>
          </li>
          <li>{detailData?.email}</li>
        </ul>
      </UserInfo>
      <PaymentSelect>
        <h2>결제 수단</h2>
        <ul>
          <li>
            <input type="radio" id="payment2" checked readOnly />
            <label htmlFor="payment2">계좌 이체</label>
          </li>
        </ul>
      </PaymentSelect>
      <PaymentInfo>
        <h2>결제 정보</h2>
        <ul>
          <li>
            <h3>총 상품 수</h3>
          </li>
          <li>{detailData?.periods[0].amount}개</li>
        </ul>
        <ul>
          <li>
            <h3>총 인원</h3>
          </li>
          <li>{detailData?.people}명</li>
        </ul>
        <ul>
          <li>
            <h3>상품 금액</h3>
          </li>
          <li>{detailData?.product.productPrice.toLocaleString("ko-KR")}원</li>
        </ul>
        <div className="margin-border">
          <div className="option-total">
            <h3>추가 금액</h3>
            <li>{optionTotalPrice?.toLocaleString("ko-KR")}원</li>
          </div>
          <div className="option-list">
            {detailData?.options.map((option) => (
              <div className="option" key={option.option.productOptionId}>
                <span>
                  {option.option.content} {" - "}
                  {option.amount}개
                </span>
                <span>
                  {(option.option.price * option.amount).toLocaleString(
                    "ko-KR",
                  )}
                  원
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="total">
          <h3>총 예약 금액</h3>
          <span className="price">
            {detailData?.totalPrice.toLocaleString("ko-KR")}원
          </span>
        </div>
      </PaymentInfo>
      {isMember ? null : (
        <section
          className="btn-wrapper"
          onClick={() => {
            if (confirm("정말로 예약을 취소하시겠습니까?")) {
              cancelReservationMutaiton.mutate(detailData?.reservationCode!);
            }
          }}
        >
          <BasicBtn>예약 취소하기</BasicBtn>
        </section>
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  /* padding-top: 32px; */
  display: flex;
  flex-direction: column;
  gap: 30px;
  word-break: keep-all;

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
    font-size: 14px;
    font-weight: 400;
    color: var(--color-grayscale40);
  }

  section {
    width: 100%;
    background-color: var(--color-grayscale10);
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 8px;
    padding: 0 10px;
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
    border-radius: 8px;
  }

  @media (min-width: 851px) {
    /* padding: 32px 0px 0; */
    /* padding: 32px 20px 0; */
    gap: 50px;
    h1 {
      font-size: 30px;
    }

    h2 {
      font-size: 26px;
      margin-bottom: 20px;
    }

    h3 {
      font-size: 18px;
    }

    section {
      padding: 0 30px;
    }

    .title-box {
      display: flex;
      justify-content: space-between;

      .breadcrum {
        display: flex;
        gap: 10px;
        color: var(--color-grayscale40);

        .bold {
          color: black;
          font-weight: bold;
        }
      }
    }

    .pc-container {
      display: flex;
      justify-content: space-between;

      .pc-col {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .left {
        width: 65%;
      }

      .right {
        width: 33%;
      }
    }

    .submit {
      font-size: 23px;
    }
  }
`;

const ProductInfo = styled.section`
  width: 100%;
  background-color: white;
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

    @media (min-width: 851px) {
      img {
        width: 120px;
        height: 120px;
      }

      .product-info {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .product-desc {
        margin: auto 15px;
        gap: 20px;

        .title {
          font-size: 28px;
        }
        .price {
          color: var(--color-blue);
          font-size: 25px;
        }
      }
    }
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .h3blue {
      color: var(--color-blue);
    }

    .back-gray {
      font-size: 14px;
      background-color: white;
      /* padding: 0 12px; */
      display: flex;
      gap: 7px;
      border-radius: 8px;
    }

    @media (min-width: 851px) {
      /* gap: 10px; */

      .back-gray {
        font-size: 18px;
        gap: 12px;
      }
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

  @media (min-width: 851px) {
    button {
      top: 15px;
      right: 20px;
      width: 100px;
      height: 40px;
      font-size: 18px;
    }

    li {
      font-size: 18px;
    }
  }
`;

const PaymentInfo = styled.section`
  h3 {
    color: var(--color-grayscale40);
  }

  ul {
    justify-content: space-between;
  }

  li {
    list-style: none;
  }

  .margin-border {
    padding-bottom: 15px;
    .option-total {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      li {
        font-size: 14px;
      }
    }
    .option-list {
      font-size: 14px;
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      .option {
        display: flex;
        justify-content: space-between;
      }
    }
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

  @media (min-width: 851px) {
    li {
      font-size: 18px;
    }

    .total {
      .price {
        font-size: 22px;
      }
    }
    .margin-border {
      .option-total {
        li {
          font-size: 18px;
        }
      }
      .option-list {
        font-size: 16px;
      }
    }
  }
`;

const PaymentSelect = styled.section`
  ul {
    display: flex;
    flex-direction: column;

    li {
      display: flex;
      gap: 5px;
      line-height: 16px;

      input[type="radio"] {
        transform: scale(1.2);
      }

      label {
        display: flex;
        gap: 8px;
        .red {
          color: red;
        }
      }
    }
    @media (min-width: 851px) {
      label {
        font-size: 18px;
      }
    }
  }
`;

export default ReservationDetailModal;
