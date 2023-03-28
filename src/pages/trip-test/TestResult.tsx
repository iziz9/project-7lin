import React from "react";
import styled from "styled-components";

type Props = {};

const TestResult = (props: Props) => {
  return (
    <Container>
      <button>추천상품 더보기</button>
      <ContentSection>
        <span className="title">나이스샷 - 골프패키지</span>
        <div className="content">
          <div className="result">
            <img src="/logo_go.png" alt="로고" />
            <span>결과 이미지가 들어갈 곳</span>
          </div>
          <div className="desc">
            각 나라별 역사와 문화를 배우며 마음의 양식을 든든하게 쌓아보세요!
            몸도 마음도 든든한 힐링과 지식 타임
          </div>
        </div>
      </ContentSection>
      <ShareLink>
        <div className="icons">
          <img src="/circle-kakao.png" alt="카카오톡 공유" />
          <img src="/circle-sharelink.png" alt="링크 공유" />
        </div>
        <span className="share">공유하기</span>
      </ShareLink>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  background-image: url("/trip-test1.png");
  width: 100%;
  height: 730px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  button {
    background-color: white;
    border: none;
    border-radius: 8px;
    color: var(--color-blue);
    width: 200px;
    height: 40px;
    font-size: 23px;
    font-weight: 600;
    cursor: pointer;
  }

  .share {
    font-size: 18px;
    color: white;
    text-align: center;
    margin: auto;
  }
`;

const ContentSection = styled.section`
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 10px;

  .title {
    writing-mode: vertical-rl;
    color: white;
    text-shadow: 2px 2px 2px gray;
    font-size: 25px;
    margin-bottom: 100px;
  }

  .content {
    width: 500px;
    height: 478px;
    margin: auto;
    box-sizing: border-box;
    border-radius: 8px;
    background-image: linear-gradient(120deg, #ccd4b9, #7cd4e1, #efb2f9),
      linear-gradient(120deg, #ccd4b9, #7cd4e1, #efb2f9);
    background-origin: border-box;
    background-clip: content-box, border-box;
    opacity: 0.9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;

    .result {
      position: relative;
      display: flex;
      flex-direction: column;
      background-color: white;
      width: 400px;
      height: 300px;
      align-items: center;
      img {
        position: absolute;
        top: 0;
        right: 0;
      }
    }

    .desc {
      width: 400px;
      color: white;
      font-size: 23px;
      text-shadow: 2px 2px 2px gray;
    }
  }
`;

const ShareLink = styled.div`
  display: flex;
  flex-direction: column;

  .icons {
    width: 150px;
    height: 58px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: 15px;

    img {
      width: 58px;
      height: 58px;
      cursor: pointer;
    }
  }
`;

export default TestResult;
