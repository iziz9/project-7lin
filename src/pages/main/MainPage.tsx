import React from "react";
import styled from "styled-components";
import BannerSlider from "./BannerSlider";

type Props = {};

const MainPage = (props: Props) => {
  return (
    <Div>
      <BannerSlider />
    </Div>
  );
};

const Div = styled.div`
  height: 2000px;
`;

export default MainPage;
