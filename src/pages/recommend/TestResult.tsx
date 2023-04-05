import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { getTestResult } from "../../apis/request";
import { TestResultProductType, ResultPackageType } from "../../@types/data";

const TestResult = ({ result }: { result: string }) => {
  const [productsData, setProductsData] = useState<TestResultProductType[]>([]);
  const navigate = useNavigate();
  const [backgroundImg, setBackgroundImg] = useState(
    "url('/background-culture.png')",
  );
  const [resultPackage, setResultPackage] = useState<ResultPackageType>({
    title: "힐링타임 - 유적지",
    image: "/result-culture.jpg",
    desc: "각 나라별 역사와 문화를 배우며 마음의 양식을 든든하게 쌓아보세요! 몸도 마음도 든든한 힐링과 지식 타임",
    category: "문화탐방",
  });

  useEffect(() => {
    if (result.includes("스크린")) {
      setResultPackage({
        title: "나이스샷 - 골프패키지",
        image: "/result-golf.jpg",
        desc: "스크린에서만 라운딩 돌던 나는 안녕~ 이제 골프여행 가서 리얼필드를 만나보자. 골프카트 타고 Go Go!",
        category: "골프여행",
      });
      setBackgroundImg("url('/background-golf.png')");
      const getResultProducts = async () => {
        const res = await getTestResult("골프여행");
        setProductsData(res.products);
      };
      getResultProducts();
    } else if (result.includes("걸어")) {
      setResultPackage({
        title: "여유롭게 - 트레킹",
        image: "/result-trekking.jpg",
        desc: "푸른 숲 속 피톤치드를 느끼면서 같이 한 번 걸어볼래? 이게 바로 진짜 힐링이지!",
        category: "트레킹",
      });
      setBackgroundImg("url('/background-trekking.png')");
      const getResultProducts = async () => {
        const res = await getTestResult("트레킹");
        setProductsData(res.products);
      };
      getResultProducts();
    } else if (result.includes("해변")) {
      setResultPackage({
        title: "바다를 보는 여유 - 오션뷰",
        image: "/result-ocean.jpg",
        desc: "수영장 딸린 해안가 호텔에서 조식 뷔페 먹고, 탁 트인 해변가에서 바다내음 풀풀 나는 산책 즐기기!",
        category: "휴양지",
      });
      setBackgroundImg("url('/background-ocean.png')");
      const getResultProducts = async () => {
        const res = await getTestResult("휴양지");
        setProductsData(res.products);
      };
      getResultProducts();
    } else {
      setResultPackage({
        title: "힐링타임 - 유적지",
        image: "/result-culture.jpg",
        desc: "각 나라별 역사와 문화를 배우며 마음의 양식을 든든하게 쌓아보세요! 몸도 마음도 든든한 힐링과 지식 타임",
        category: "문화탐방",
      });
      setBackgroundImg("url('/background-culture.png')");
      const getResultProducts = async () => {
        const res = await getTestResult("문화탐방");
        setProductsData(res.products);
      };
      getResultProducts();
    }
  }, [result]);

  return (
    <Container background={backgroundImg}>
      <section>
        <ResultContent>
          <span className="title">{resultPackage.title}</span>
          <div className="content">
            <div className="result">
              <img src="/logo_go.png" alt="로고" className="logo" />
              <img
                src={resultPackage.image}
                alt={resultPackage.title}
                className="result-img"
              />
            </div>
            <div className="desc">{resultPackage.desc}</div>
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
    width: 200px;
    height: 40px;
    font-size: 20px;
    font-weight: 600;
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
