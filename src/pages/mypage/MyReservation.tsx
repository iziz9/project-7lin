import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getMemberReservation } from "../../apis/auth";
import { ReservationProduct } from "../../@types/data";
import ReservationProductCard from "./components/ReservationProductCard";
import Spinner from "/spinner.svg";

const Reservation = () => {
  const [tab, setTab] = useState<0 | 1 | 2>(0);

  const handleTab = (num: 0 | 1 | 2) => {
    setTab(num);
  };

  const { data, isLoading, isFetching } = useQuery(
    "memberReservation",
    getMemberReservation,
    {
      onSuccess(data) {},
      onError(error) {
        alert("회원 예약 조회 실패: " + error);
      },
      staleTime: 1000 * 60 * 30,
      cacheTime: 1000 * 60 * 30,
    },
  );

  const waitingReservation = data?.data
    .filter((product: ReservationProduct) => product.status === "WAITING")
    .map((product: ReservationProduct) => (
      <ReservationProductCard
        key={product.reservationId}
        tab={tab}
        handleTab={handleTab}
        product={product}
      />
    ));

  const completeReservation = data?.data
    .filter((product: ReservationProduct) => product.status === "COMPLETE")
    .map((product: ReservationProduct) => (
      <ReservationProductCard
        key={product.reservationId}
        tab={tab}
        handleTab={handleTab}
        product={product}
      />
    ));

  const cancelReservation = data?.data
    .filter((product: ReservationProduct) => product.status === "CANCEL")
    .map((product: ReservationProduct) => (
      <ReservationProductCard
        key={product.reservationId}
        tab={tab}
        handleTab={handleTab}
        product={product}
      />
    ));

  const getListElement = () => {
    switch (tab) {
      case 0:
        return waitingReservation;

      case 1:
        return completeReservation;

      case 2:
        return cancelReservation;
    }
  };

  const listElement = getListElement();
  const noProduct = (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      예약 내역이 없습니다.
    </div>
  );

  return (
    <Container tab={tab}>
      <div className="title">예약 내역</div>
      <div className="type-wrapper">
        <div className="type yet" onClick={() => setTab(0)}>
          준비중인 예약 ({waitingReservation?.length})
        </div>
        <div className="type ready" onClick={() => setTab(1)}>
          완료된 예약 ({completeReservation?.length})
        </div>
        <div className="type cancel" onClick={() => setTab(2)}>
          취소된 예약 ({cancelReservation?.length})
        </div>
      </div>
      {isLoading || isFetching ? (
        <div className="loading-wrapper">
          <div className="loading-list">{listElement}</div>
          <div className="spinner">
            <img src={Spinner} alt="로딩" width="10%" />
          </div>
        </div>
      ) : (
        <div className="list">
          {listElement?.length === 0 ? noProduct : listElement}
        </div>
      )}
    </Container>
  );
};

const Container = styled.div<{ tab: number }>`
  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 23px;
  }

  .type-wrapper {
    margin-top: 25px;
    display: flex;
    /* border: 1px solid red; */

    .type {
      flex-grow: 1;
      font-size: 18px;
      text-align: center;
      word-break: keep-all;
      padding: 15px 38px;
      border: 1px solid var(--color-grayscale10);
      border-bottom: none;
      /* background: #b5b4b4; */
      /* box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25); */
      /* border-radius: 5px; */
      /* color: #fff; */
      cursor: pointer;

      &.yet {
        border: ${(props) =>
          props.tab === 0 ? "1px solid var(--color-grayscale20)" : ""};
        border-bottom: ${(props) =>
          props.tab === 0 ? "none" : "1px solid var(--color-grayscale20)"};
      }
      &.ready {
        border: ${(props) =>
          props.tab === 1 ? "1px solid var(--color-grayscale20)" : ""};
        border-bottom: ${(props) =>
          props.tab === 1 ? "none" : "1px solid var(--color-grayscale20)"};
      }
      &.cancel {
        border: ${(props) =>
          props.tab === 2 ? "1px solid var(--color-grayscale20)" : ""};
        border-bottom: ${(props) =>
          props.tab === 2 ? "none" : "1px solid var(--color-grayscale20)"};
      }
    }
  }
  .list {
    display: flex;
    flex-direction: column;
    /* gap: 15px; */
  }

  .loading-wrapper {
    position: relative;
  }

  .loading-list {
    display: flex;
    flex-direction: column;
    opacity: 0.5;
    position: relative;
  }

  .spinner {
    position: absolute;
    top: 40px;
    bottom: 0;
    left: 0;
    right: 0;
    /* margin: auto; */
    display: flex;
    align-items: center;
    justify-content: center;
    /* left: 100px; */
  }

  @media (max-width: 850px) {
    font-size: 16px;

    .title {
      font-size: 20px;
    }
    .type-wrapper {
      .type {
        font-size: 16px;
        padding: 15px 20px;
        flex-grow: 1;
      }
    }
  }
`;

export default Reservation;
