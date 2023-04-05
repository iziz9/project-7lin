import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

type Props = {};

const RecommendPage = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Container>
      {/* 저장된 테스트 결과 없을 때 */}
      {/* <NoResult onClick={() => navigate("/test")}>
        <h2>테스트 후 추천받을 수 있음</h2>
        <section>테스트 시작하기</section>
      </NoResult> */}

      {/* 로컬스토리지에 저장된 테스트 결과 있을 때 / 테스트화면에서 더보기 누르면 여기로 이동*/}
      <HasResult>
        <section className="top-section">
          <div className="title">
            <h1>"나이스샷 - 골프패키지"</h1>
            <h2>유형에 맞는 추천상품입니다.</h2>
          </div>
          <button onClick={() => navigate("/test")}>테스트 다시 하기</button>
        </section>
        <div>카테고리 네모 가져오기..</div>
      </HasResult>
    </Container>
  );
};

const Container = styled.div`
  padding: 32px 20px;

  h1 {
    font-size: 24px;
    font-weight: bold;
  }

  @media (min-width: 851px) {
    h1 {
      font-size: 30px;
    }
  }
`;

const NoResult = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  /* height: 730px; */
  background-size: cover;
  cursor: pointer;

  section {
    position: relative;
    width: 50%;
    height: 58px;
    margin: auto;
    border: 20px solid transparent;
    border-radius: 8px;
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(120deg, #ccd4b9, #7cd4e1, #efb2f9);
    background-origin: border-box;
    background-clip: content-box, border-box;
    opacity: 0.9;
    margin: auto auto;
    color: v;
    font-size: 50px;
  }
`;

const HasResult = styled.div`
  section {
    display: flex;
    justify-content: space-around;

    .title {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 50px;

      h1 {
        font-size: 40px;
        font-weight: bold;
        color: var(--color-blue);
      }
      h2 {
        font-size: 30px;
        font-weight: bold;
      }
    }

    button {
      width: 250px;
      height: 80px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      background-color: var(--color-blue);
      color: white;
      font-size: 30px;

      :hover {
        background-color: var(--color-grayscale40);
      }
    }
  }
`;

export default RecommendPage;
