import React from "react";
import styled from "styled-components";
import ProductCard from "./components/ProductCard";

const Favor = () => {
  return (
    <Container>
      <div className="title">찜</div>
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
    margin-bottom: 5px;
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
  }
`;

export default Favor;
