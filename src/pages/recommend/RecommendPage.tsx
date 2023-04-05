import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

type Props = {};

const RecommendPage = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Container>
      {/* 저장된 테스트 결과 없을 때 */}
      <NoResult>
        <button className="go-test" onClick={() => navigate("/test")}>
          테스트 시작하기
        </button>
      </NoResult>

      {/* 로컬스토리지에 저장된 테스트 결과 있을 때 / 테스트화면에서 더보기 누르면 여기로 이동*/}
      <HasResult>
        <button className="go-test" onClick={() => navigate("/test")}>
          테스트 다시하기
        </button>
        <h2>'나이스샷 - 골프패키지' 유형에 맞는 추천상품입니다.</h2>
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

  .go-test {
    background-color: white;
    padding: 20px auto 0;
    border: 2px solid var(--color-blue);
    width: 200px;
    height: 40px;
    cursor: pointer;
    border-radius: 8px;
  }

  @media (min-width: 851px) {
    h1 {
      font-size: 30px;
    }
  }
`;

const NoResult = styled.section`
  display: flex;
  justify-content: space-between;

  .test-img {
    width: 50%;

    img {
      width: 100%;
      /* margin-top: 60px; */
      cursor: pointer;
      border-radius: 8px;
    }
  }

  .test-text {
    width: 45%;
  }
`;

const HasResult = styled.section`
  display: flex;
  flex-direction: column;
`;

export default RecommendPage;
