import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { getTestResult } from "../../apis/request";
import { TestResultProductType } from "../../@types/data";
import { setLocalStorage } from "../../utils/localStorage";
import { resultPack } from "./ResultPack";
import { useMutation } from "react-query";

const TestResult = ({ result }: { result: string }) => {
  const [productsData, setProductsData] = useState<TestResultProductType[]>([]);
  const navigate = useNavigate();

  const testResultMutation = useMutation(getTestResult, {
    onSuccess: (res: any) => {
      if (res) {
        console.log(res);
        setProductsData(res.products);
      }
    },
    onError: (error) => {
      alert("데이터 페칭 실패: " + error);
    },
  });

  useEffect(() => {
    testResultMutation.mutate(resultPack[result].category); //페칭
    setLocalStorage("testResult", resultPack[result]); // 로컬스토리지 저장
  }, [result]);

  return (
    <Container background={resultPack[result].backgroundImg}>
      <section>
        <ResultContent>
          <span className="title">{resultPack[result].title}</span>
          <div className="content">
            <div className="result">
              <img src="/logo_go.png" alt="로고" className="logo" />
              <img
                src={resultPack[result].image}
                alt={resultPack[result].title}
                className="result-img"
              />
            </div>
            <div className="desc">{resultPack[result].desc}</div>
          </div>
        </ResultContent>
        <ShareLink>
          <div className="icons">
            <img src="/circle-kakao.png" alt="카카오톡 공유" />
            <img src="/circle-sharelink.png" alt="링크 공유" />
          </div>
          <span className="share">공유하기</span>
        </ShareLink>
      </section>
      <section className="product-section">
        {productsData.map((product, index) => (
          <ResultProducts key={index}>
            <div className="imagebox">
              <img src={product.thumbnail} alt="썸네일" />
            </div>
            <div className="textbox">
              <div className="name">{product.productName}</div>
              <div className="desc">
                {product.briefExplanation.replaceAll("</br>", "\n")}
              </div>
            </div>
          </ResultProducts>
        ))}
        <button onClick={() => navigate("/recommend")}>추천상품 더보기</button>
      </section>
    </Container>
  );
};

const Container = styled.div<{ background: string }>`
  position: relative;
  background-image: ${(props) =>
    props.background || 'url("/background-culture.png")'};
  height: 730px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding: 0 40px 0;

  button {
    background-color: white;
    border: none;
    border-radius: 8px;
    color: var(--color-blue);
    padding: 15px 25px;
    font-size: 20px;
    cursor: pointer;
    margin: auto;
  }

  .product-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
  }

  @media (max-width: 850px) {
    background-image: none;
    display: block;
    height: fit-content;
    padding: 0;

    button {
      margin-top: 20px;
      background-color: var(--color-blue);
      color: white;
    }

    .product-section {
      max-width: 600px;
      margin: auto;
    }
  }
`;

const ResultContent = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 10px;

  .title {
    writing-mode: vertical-rl;
    color: white;
    text-shadow: 2px 2px 2px gray;
    font-size: 25px;
    margin-bottom: 80px;
  }

  .content {
    width: 350px;
    height: 420px;
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
    align-items: center;
    gap: 30px;
    padding-top: 20px;

    .result {
      position: relative;
      display: flex;
      flex-direction: column;
      background-color: white;
      width: 300px;
      height: 230px;
      align-items: center;

      .logo {
        position: absolute;
        top: 0;
        right: 0;
      }

      .result-img {
        width: 100%;
        height: 100%;
      }
    }

    .desc {
      width: 300px;
      color: white;
      font-size: 20px;
      color: black;
      font-weight: bold;
      white-space: pre-wrap;
      word-break: keep-all;
      line-height: 26px;
    }
  }

  @media (max-width: 850px) {
    flex-direction: column;
    margin-top: 32px;

    .title {
      width: 100%;
      writing-mode: horizontal-tb;
      font-size: 20px;
      position: absolute;
      top: 15px;
      z-index: 99;
      right: 50%;
      transform: translateX(50%);
    }

    .content {
      width: 450px;
      height: 450px;
      padding-top: 50px;

      .result {
        width: 350px;
        height: 250px;

        .result-img {
          width: 100%;
          height: 100%;
        }
      }

      .desc {
        width: 350px;
        font-size: 16px;
        line-height: 20px;
        font-weight: bold;
      }
    }
  }

  @media (max-width: 500px) {
    .content {
      width: 290px;
      height: 400px;
      padding-top: 50px;

      .result {
        width: 250px;
        height: 200px;

        .result-img {
          width: 100%;
          height: 100%;
        }
      }

      .desc {
        width: 250px;
        font-size: 16px;
        line-height: 20px;
        color: black;
        text-shadow: none;
        font-weight: bold;
      }
    }
  }
`;

const ShareLink = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  .share {
    font-size: 18px;
    color: white;
    text-align: center;
    margin: auto;
  }

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

const ResultProducts = styled.div`
  display: flex;
  gap: 30px;
  background-color: #dddddd7f;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;

  .imagebox {
    width: 120px;
    height: 120px;
    img {
      width: 100%;
      border-radius: 100%;
    }
  }

  .textbox {
    width: 380px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    white-space: pre-wrap;
    word-break: keep-all;
    color: white;
    padding: 10px;

    .name {
      font-size: 20px;
      text-shadow: 2px 2px 3px black;
    }
    .desc {
      color: black;
      white-space: pre-line;
      line-height: 20px;
    }
  }

  @media (max-width: 850px) {
    gap: 10px;
    padding: 10px;

    .imagebox {
      width: fit-content;
      height: fit-content;
      margin: auto auto;

      img {
        width: 100px;
        height: 100px;
      }
    }

    .textbox {
      .name {
        font-size: 20px;
        color: black;
        font-weight: bold;
        text-shadow: none;
      }
      .desc {
        color: black;
        white-space: pre-line;
        font-size: 14px;
        line-height: 16px;
      }
    }
  }

  @media (max-width: 560px) {
    .imagebox {
      width: fit-content;
      height: fit-content;
      margin: auto auto;

      img {
        width: 70px;
        height: 70px;
      }
    }
  }
`;

export default TestResult;
