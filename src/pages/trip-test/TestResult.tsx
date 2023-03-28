import React from "react";
import styled from "styled-components";

type Props = {};

const TestResult = (props: Props) => {
  return (
    <Container>
      <section>
        <div>ㄷ네모네모넴노ㅔㅁ노메노ㅔ</div>
      </section>
    </Container>
  );
};

const Container = styled.div`
  background-image: url("/trip-test1.png");
  width: 100%;
  height: 730px;
  display: flex;

  section {
    position: relative;
    width: 50%;
    height: 478px;
    margin: auto;
    border: 20px solid transparent;
    border-radius: 8px;
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(to right, #ccd4b9, #7cd4e1, #efb2f9);
    background-origin: border-box;
    background-clip: content-box, border-box;
    opacity: 0.9;

    /* img {
      position: absolute;
      top: 20px;
      left: 20px;
    } */
  }
`;

export default TestResult;
