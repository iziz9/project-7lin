import React, { useRef } from "react";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDragScroll } from "../../utils/useDragScroll";
import { useMediaQuery } from "react-responsive";

interface IRecommendSliderProps {
  children: React.ReactNode;
}

const RecommendSlider = ({ children }: IRecommendSliderProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useDragScroll(ref);

  const isMobile: boolean = useMediaQuery({
    query: "(max-width:850px)",
  });

  return (
    <Wrap ref={ref}>
      <Recommend>
        <RecommendMain isMobile={isMobile}>
          <button>
            <IoIosArrowBack size={30} />
          </button>
          <Imgs>
            {[1, 2, 3, 4].map((item) => (
              <div key={item}>
                <img src="/reveiw_img_3.png" alt="추천 후기 이미지" />
                <div>{children}</div>
              </div>
            ))}
          </Imgs>
          <button>
            <IoIosArrowForward size={30} />
          </button>
        </RecommendMain>
      </Recommend>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding-top: 30px;
  padding-bottom: 50px;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Recommend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 850px) {
    width: 850px;
  }
`;
const RecommendMain = styled.div<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? "100%" : "94%")};
  display: flex;
  position: relative;
  button {
    padding: 10px;
    display: ${({ isMobile }) => (isMobile ? "none" : "flex")};
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    border: none;
    border-radius: 100%;
    background-color: white;
    box-shadow: 0px 0px 10px #aaa;
    :first-child {
      left: -25px;
    }
    :last-child {
      right: -25px;
    }
  }
`;
const Imgs = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  > div {
    width: 23%;
    position: relative;
    div {
      width: 100%;
      position: absolute;
    }
  }
  img {
    margin-bottom: 10px;
    width: 100%;
    border-radius: 10px;
  }
  strong {
    font-size: 25px;
    font-weight: bold;
    display: block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p {
    display: block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 25px;
    :nth-child(1) {
      font-size: 19px;
    }
    :nth-child(2) {
      font-size: 18px;
    }
  }
`;

export default RecommendSlider;
