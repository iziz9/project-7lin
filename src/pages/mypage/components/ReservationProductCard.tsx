import React from "react";
import {
  AddReservationRequest,
  Period3,
  ReservationProduct,
} from "../../../@types/data";
import { BasicBtn } from "../../../commons/Button";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addReservation,
  deleteReservation,
  getMemberReservationDetail,
  reservateAgain,
} from "../../../apis/auth";
import { useModal } from "../../../hooks/useModal";
import Modal from "../../../commons/Modal";
import ReservationDetailModal from "./ReservationDetailModal";
import { useNavigate } from "react-router-dom";

interface Props {
  tab: number;
  handleTab: (num: 0 | 1 | 2) => void;
  product: ReservationProduct;
}

const ReservationProductCard = ({ tab, handleTab, product }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const cancelReservationMutaiton = useMutation(deleteReservation, {
    onSuccess: (res: any) => {
      if (res.message === "성공") {
        console.log(res);
        alert("예약 취소 성공");
        return queryClient.invalidateQueries({
          queryKey: ["memberReservation"],
        });
      }
    },
    onError: (error) => {
      alert("예약취소 실패: " + error);
    },
  });

  const { data: detailData, refetch: detailRefetch } = useQuery(
    ["memberReservationDetail", product.reservationId],
    () => getMemberReservationDetail(product.reservationId),
    {
      onSuccess(data) {
        console.log(data);
      },
      onError(error) {
        alert("예약상세 정보 가져오기 실패: " + error);
      },
      enabled: false,
    },
  );

  const reservationAgainMutation = useMutation(reservateAgain, {
    onSuccess: (res: any) => {
      if (res.message === "성공") {
        console.log(res);
        alert("다시 예약 성공");
        handleTab(0);
        return queryClient.invalidateQueries({
          queryKey: ["memberReservation"],
        });
      }
    },
    onError: (error) => {
      alert("예약 다시하기 실패: " + error);
    },
  });

  const { openModal } = useModal();

  const handleResevationDetail = async () => {
    const { data: detailData, isError, isSuccess } = await detailRefetch();
    // if (isError) console.log("hi");
    if (isSuccess) {
      const ReservationDetailModalData = {
        title: "예약내역 상세",
        content: (
          <ReservationDetailModal
            isMember={true}
            detailData={detailData?.data}
          />
        ),
      };
      openModal(ReservationDetailModalData);
    }
  };

  const handleReservationAgain = async () => {
    if (confirm("정말로 예약을 다시하시겠습니까?")) {
      reservationAgainMutation.mutate(product.reservationCode);
    }
  };

  const getReservationButtonElement = () => {
    switch (tab) {
      case 0:
        return (
          <>
            <BasicBtn onClick={handleResevationDetail}>상세보기</BasicBtn>
            <BasicBtn
              backgroundColor="#b5b4b4"
              onClick={() => {
                if (confirm("정말로 예약을 취소하시겠습니까?"))
                  cancelReservationMutaiton.mutate(product.reservationCode);
              }}
            >
              취소하기
            </BasicBtn>
          </>
        );
      case 1:
        return (
          <>
            <BasicBtn
              onClick={() =>
                navigate("/review/write", {
                  state: {
                    id: product.reservationId,
                    code: product.reservationCode,
                  },
                })
              }
            >
              후기쓰가
            </BasicBtn>
          </>
        );
      case 2:
        return (
          <>
            <BasicBtn onClick={handleReservationAgain}>다시 예약하기</BasicBtn>
          </>
        );
    }
  };

  const buttonElement = getReservationButtonElement();

  return (
    <Container>
      <div className="wrapper">
        <div className="left">
          <div className="img-wrapper">
            <img src="/product_img.png" />
          </div>
          <div className="info">
            <div className="date">{product.date}</div>
            <div className="title">
              {product.productInfo[0].product.productName}
            </div>
            <div className="num">
              예약번호: {product.reservationCode} 예약 인원: {product.people}인
            </div>
          </div>
        </div>
        <div className="button-wrapper">{buttonElement}</div>
      </div>
      {/* <Modal /> */}
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

export default ReservationProductCard;
