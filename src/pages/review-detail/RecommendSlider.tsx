import React from "react";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface IRecommendSliderProps {
  children: React.ReactNode;
}

const RecommendSlider = ({ children }: IRecommendSliderProps) => {
  return (
    <Recommend>
      <RecommendMain>
        <button>
          <IoIosArrowBack size={30} color="#fff" />
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
          <IoIosArrowForward size={30} color="#fff" />
        </button>
      </RecommendMain>
    </Recommend>
  );
};

const Recommend = styled.div`
  margin-top: 30px;
`;
const RecommendMain = styled.div`
  display: flex;
  position: relative;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    position: absolute;
    top: 130px;
    border: none;
    border-radius: 100%;
    background-color: #979797;
    padding: 10px;
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
    div {
      width: 100%;
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
