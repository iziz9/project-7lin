import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductCard from "./components/ProductCard";

const Reservation = () => {
  const [tab, setTab] = useState<0 | 1 | 2>(0);

  const getListElement = () => {
    switch (tab) {
      case 0:
        return (
          <>
            <ProductCard tab={tab} reservation={true} />
            <ProductCard tab={tab} reservation={true} />
            <ProductCard tab={tab} reservation={true} />
            <ProductCard tab={tab} reservation={true} />
            <ProductCard tab={tab} reservation={true} />
            <ProductCard tab={tab} reservation={true} />
          </>
        );
      case 1:
        return (
          <>
            <ProductCard tab={tab} reservation={true} />
            <ProductCard tab={tab} reservation={true} />
          </>
        );
      case 2:
        return (
          <>
            <ProductCard tab={tab} reservation={true} />
          </>
        );
    }
  };

  const listElement = getListElement();

  return (
    <Container tab={tab}>
      <div className="title">예약 내역</div>
      <div className="type-wrapper">
        <div className="type yet" onClick={() => setTab(0)}>
          준비중인 예약 (2)
        </div>
        <div className="type ready" onClick={() => setTab(1)}>
          완료된 예약 (1)
        </div>
        <div className="type cancel" onClick={() => setTab(2)}>
          취소된 예약 (1)
        </div>
      </div>
      <div className="list">{listElement}</div>
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
