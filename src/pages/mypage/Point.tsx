import React from "react";
import styled from "styled-components";

const Point = () => {
  return (
    <Container>
      <div className="title">적립현황</div>
    </Container>
  );
};

const Container = styled.div`
  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 23px;
  }
`;

export default Point;
