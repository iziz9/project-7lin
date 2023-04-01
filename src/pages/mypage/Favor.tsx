import React from "react";
import styled from "styled-components";
import ProductCard from "./components/ProductCard";

type Props = {};

const Favor = (props: Props) => {
  return (
    <Container>
      <div className="title">예약 내역</div>
      <div className="list">
        <ProductCard favor={true} />
        <ProductCard favor={true} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 23px;
  }

  .type-wrapper {
    margin-top: 25px;
    display: flex;
    /* border: 1px solid red; */
  }
  .list {
    display: flex;
    flex-direction: column;
    /* gap: 15px; */
  }
`;

export default Favor;
