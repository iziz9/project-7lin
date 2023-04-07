import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import Product from "../groups/Product";
import { getLocalStorage } from "../../utils/localStorage";

interface TestResultType {
  title: string;
  category: string;
}

const RecommendPage = () => {
  const navigate = useNavigate();
  const savedTestResult: TestResultType = getLocalStorage("testResult");

  return (
    <Container>
      {savedTestResult ? (
        <HasResult>
          <section>
            <div className="page-title">
              <h1>{savedTestResult.title}</h1>
              <h2>유형의 당신에게 맞춤 상품을 추천드려요!</h2>
            </div>
            <button onClick={() => navigate("/test")}>테스트 다시 하기</button>
          </section>
          <section>
            <Product count={4} />
          </section>
        </HasResult>
      ) : (
        <NoResult>
          <section className="title-section">
            <div className="page-title">
              <div>
                <span className="blue">여행유형 테스트 </span>
                <span className="black">를 완료하면</span>
              </div>
              <span className="black">맞춤 상품을 추천받을 수 있어요!</span>
            </div>
            <div className="test" onClick={() => navigate("/test")}>
              <img src="/test.png" alt="나의 여행 유형 테스트" />
            </div>
          </section>
          <section className="content-section">
            <h1>이런 상품은 어떠세요?</h1>
            <Product count={4} />
          </section>
        </NoResult>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding-top: 32px;
  h1 {
    font-size: 35px;
    font-weight: bold;
  }
`;

const NoResult = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-size: cover;
  cursor: pointer;

  .title-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 30px;
    padding-bottom: 20px;
    border-bottom: 3px solid var(--color-grayscale30);

    .page-title {
      font-weight: bold;
      line-height: 40px;
      margin: auto auto;

      .blue {
        color: var(--color-blue);
        font-size: 40px;
      }

      .black {
        font-size: 28px;
      }
    }

    .test {
      width: 50%;
      img {
        width: 100%;
        margin: auto;
      }
    }
  }

  .content-section {
    margin: 50px auto;

    h1 {
      text-align: center;
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 30px;
    }
  }

  @media (max-width: 950px) {
    .title-section {
      flex-direction: column;
      justify-content: center;
      text-align: center;

      h1 {
        font-size: 30px;
      }

      .test {
        margin: auto;
        width: 100%;

        img {
          width: 100%;
          margin: auto;
        }
      }

      .page-title {
        line-height: 35px;
        .blue {
          color: var(--color-blue);
          font-size: 30px;
        }

        .black {
          font-size: 25px;
        }
      }
    }
  }
  @media (max-width: 850px) {
    .title-section {
      text-align: center;
      flex-direction: column;

      .test {
        img {
          width: 100%;
          margin: auto;
        }
      }

      .page-title {
        line-height: 30px;
        .blue {
          color: var(--color-blue);
          font-size: 25px;
        }

        .black {
          font-size: 18px;
        }
      }
    }
  }
`;

const HasResult = styled.div`
  section {
    display: flex;
    justify-content: space-around;

    .page-title {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 20px;

      h1 {
        font-size: 35px;
        color: var(--color-blue);
      }
      h2 {
        font-size: 28px;
        font-weight: bold;
      }
    }

    ul {
      margin: 30px auto;
      border-top: 2px solid var(--color-grayscale30);
      padding-top: 30px;
    }

    button {
      width: 250px;
      height: 80px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      background-color: var(--color-blue);
      color: white;
      font-size: 28px;

      :hover {
        background-color: var(--color-grayscale40);
      }
    }
  }

  @media (max-width: 850px) {
    section {
      flex-direction: column;
      justify-content: center;
      text-align: center;

      .page-title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        gap: 20px;
        margin-bottom: 30px;

        h1 {
          font-size: 25px;
        }
        h2 {
          font-size: 18px;
          line-height: 24px;
        }
      }

      button {
        width: 150px;
        height: 60px;
        font-size: 20px;
        margin: auto;

        :hover {
          background-color: var(--color-grayscale40);
        }
      }
    }
  }
`;

export default RecommendPage;
