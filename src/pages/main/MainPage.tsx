import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import BannerSlider from "./BannerSlider";
import GroupCategory from "./GroupCategory";
import { useMediaQuery } from "react-responsive";
import { BsSearch } from "react-icons/bs";

type Props = {};

const MainPage = (props: Props) => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const isMobile: boolean = useMediaQuery({
    query: "(max-width:849px)",
  });

  return (
    <>
      {isMobile ? (
        <MobileMain>
          <div className="searchbar">
            <div className="search-input">
              <input type="text" placeholder="검색어를 입력하세요" />
              <BsSearch className="search-icon" />
            </div>
          </div>
          <GroupCategory />
          <div className="youtube">
            <div className="youtube-cover" onClick={() => setIsClicked(true)}>
              <h3>끼리끼리 가는 특별한 여행 테마!</h3>
              <div>
                <img src="/playbutton.png" alt="동영상 재생" />
                <span>PLAY</span>
              </div>
            </div>
            {isClicked && (
              <iframe
                className="video"
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/moBgXUPXoHs?autoplay=1&mute=1"
                title="YouTube video player"
                allow="accelerometer; autoplay; c/lipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            )}
          </div>
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
              <div className="youtube-cover" onClick={() => setIsClicked(true)}>
                <h3>끼리끼리 가는 특별한 여행 테마!</h3>
                <div>
                  <img src="/playbutton.png" alt="동영상 재생" />
                  <span>PLAY</span>
                </div>
              </div>
              {isClicked && (
                <iframe
                  className="video"
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/moBgXUPXoHs?autoplay=1&mute=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; c/lipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              )}
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
  .searchbar {
    display: flex;
    margin: 30px auto;

    .search-input {
      width: 80%;
      position: relative;
      margin: auto;

      input {
        width: 100%;
        height: 36px;
        border: none;
        border-radius: 8px;
        background-color: var(--color-inputGray);
        margin: auto;
        padding-left: 15px;

        :focus {
          outline: none;
        }
      }
      .search-icon {
        position: absolute;
        top: 10px;
        right: 0px;
        cursor: pointer;
      }
    }
  }

  .youtube {
    position: relative;
    margin: auto;
    width: 100%;
    padding: 20px 0 56.25%;

    .video {
      border-radius: 8px;
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .youtube-cover {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      background-image: url("/airplane.png");
      background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      align-items: center;
      cursor: pointer;

      h3 {
        color: white;
        font-size: 16px;
      }

      div {
        display: flex;

        img {
          width: 40px;
          height: 40px;
        }

        span {
          color: white;
          font-size: 23px;
          font-weight: bold;
          text-align: center;
          line-height: 40px;
        }
      }
    }
  }

  .test {
    padding-top: 30px;

    img {
      width: 100%;
      border-radius: 8px;
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
    border-radius: 8px;
  }

  .youtube-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background-image: url("/airplane.png");
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    align-items: center;
    cursor: pointer;

    h3 {
      color: white;
      font-size: 36px;
    }

    div {
      display: flex;

      img {
        width: 110px;
        height: 110px;
      }

      span {
        color: white;
        font-size: 45px;
        font-weight: bold;
        text-align: center;
        line-height: 110px;
      }
    }
  }
`;
const Test = styled.div`
  padding-top: 60px;

  img {
    width: 100%;
    margin-top: 60px;
    cursor: pointer;
    border-radius: 8px;
  }
`;

export default MainPage;
