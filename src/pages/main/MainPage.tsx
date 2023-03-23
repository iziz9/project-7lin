import React from "react";
import styled from "styled-components";
import BannerSlider from "./BannerSlider";
import GroupCategory from "./GroupCategory";

type Props = {};

const MainPage = (props: Props) => {
  return (
    <Div>
      <BannerSlider />
      <GroupCategory />
    </Div>
  );
};

const Div = styled.div`
  height: 2000px;
`;

export default MainPage;
