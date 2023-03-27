import React from "react";
import styled from "styled-components";
import BannerSlider from "./BannerSlider";
import GroupCategory from "./GroupCategory";

type Props = {};

const MainPage = (props: Props) => {
  return (
    <Main>
      <BannerSlider />
      <div className="inner">
        <GroupCategory />
        <Youtube>
          <iframe
            className="video"
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/moBgXUPXoHs?autoplay=1&mute=1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </Youtube>
        <Test>
          <img src="/test.png" alt="나의 여행 유형 테스트" />
        </Test>
      </div>
    </Main>
  );
};

const Main = styled.div`
  .inner {
    margin: 0 100px;
  }
`;

const Youtube = styled.div`
  position: relative;
  width: 100%;
  padding-top: 60px;
  padding-bottom: 56.25%;

  .video {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;
const Test = styled.div`
  padding-top: 60px;

  img {
    width: 100%;
    margin-top: 60px;
    cursor: pointer;
  }
`;

export default MainPage;
