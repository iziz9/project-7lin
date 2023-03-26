import React from "react";
import styled from "styled-components";

type Props = {};

const FloatingIcon = (props: Props) => {
  return (
    <FloatingDiv>
      <div className="face">
        <img src="/floating.png" />
      </div>
    </FloatingDiv>
  );
};

const FloatingDiv = styled.div`
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 99;
  display: flex;
  justify-content: center;

  img {
    width: 120px;

    :hover {
      cursor: pointer;
    }
  }
`;

export default FloatingIcon;
