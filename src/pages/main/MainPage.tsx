import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import BannerSlider from "./BannerSlider";
import GroupCategory from "./GroupCategory";
import { useMediaQuery } from "react-responsive";

type Props = {};

const MainPage = (props: Props) => {
  const navigate = useNavigate();
  const isMobile: boolean = useMediaQuery({
    query: "(max-width:849px)",
  });

  return (
    <>
      {isMobile ? (
        <MobileMain>
          <div className="searchbar">
            <input type="text" placeholder="검색어를 입력하세요" />
          </div>
          <GroupCategory />
          {/* <div className="youtube">
            <iframe
              className="video"
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/moBgXUPXoHs?autoplay=1&mute=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; c/lipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div> */}
          <div className="test" onClick={() => navigate("test")}>
            <img src="/test.png" alt="나의 여행 유형 테스트" />
          </div>
        </MobileMain>
      ) : (
        <PcMain>
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
                allow="accelerometer; autoplay; c/lipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </Youtube>
            <Test onClick={() => navigate("test")}>
              <img src="/test.png" alt="나의 여행 유형 테스트" />
            </Test>
          </div>
        </PcMain>
      )}
    </>
  );
};

const MobileMain = styled.div`
  width: 100%;

  .searchbar {
    display: flex;
    margin: 30px auto;

    input {
      width: 60%;
      height: 36px;
      border: none;
      border-radius: 8px;
      background-color: var(--color-inputGray);
      margin: auto;

      :focus {
        outline: none;
      }
    }
  }

  .youtube {
    position: relative;
    width: 100%;
    padding: 20px 32px 56.25%;
    margin: auto;

    .video {
      position: absolute;
      width: 70%;
      height: 100%;
    }
  }

  .test {
    padding: 30px 32px 0;

    img {
      width: 100%;
      cursor: pointer;
    }
  }
`;

const PcMain = styled.div`
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
