import React from "react";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const RecommendSlider = () => {
  return (
    <Recommend>
      <RecommendHead>
        <h2>다른 상품 후기 보기</h2>
        <span>전체 후기 목록 보기</span>
      </RecommendHead>
      <RecommendMain>
        <button>
          <IoIosArrowBack size={30} color="#fff" />
        </button>
        <Imgs>
          {[1, 2, 3, 4].map((item) => (
            <div key={item}>
              <img src="/reveiw_img_3.png" alt="추천 후기 이미지" />
              <p>후기 글 제목</p>
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
  margin-top: 70px;
`;
const RecommendHead = styled.div`
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 30px;
    font-weight: bold;
    color: #5b5b5b;
  }
  span {
    font-size: 18px;
    color: #5b5b5b;
  }
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
    top: 50%;
    transform: translateY(-80%);
    border: none;
    border-radius: 100%;
    background-color: #979797;
    padding: 10px;
    :first-child {
      left: -25px;
    }
    :last-child {
      right: 5px;
    }
  }
`;
const Imgs = styled.div`
  display: flex;
  gap: 20px;
  img {
    border-radius: 10px;
  }
  p {
    margin-top: 20px;
    font-size: 25px;
    font-weight: bold;
  }
`;

export default RecommendSlider;
