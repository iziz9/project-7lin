import { useEffect, useState } from "react";
import styled from "styled-components";
import { scrollToTop } from "../../utils/scroll";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useNavigate } from "react-router";
import TestResult from "./TestResult";
import { lastAnswers } from "./ResultPack";

const TripTest = () => {
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState(0);
  const [resultData, setResultData] = useState("");
  const [isTestFinished, setIsTestFinished] = useState(false); //전역상태로 바꾸기

  useEffect(() => {
    scrollToTop();
  }, []);

  const goPrev = () => {
    setOrderNumber(orderNumber - 1);
  };

  const goNext = () => {
    setOrderNumber(orderNumber + 1);
  };

  const testSubmit = (answer: string) => {
    setIsTestFinished(true);
    setResultData(answer);
  };

  const testContent = [
    {
      background: 'url("/trip-test1.png")',
      numberImg: "/number1.png",
      desc: "당장 떠나고 싶은 날",
      question: "어떤 여행을 가고 싶으세요?",
      answers: [
        "여기저기 보고 느끼는 여행이 좋아!",
        "남들과는 다른 특별한 경험을 해 보고 싶어!",
        "힐링 여행이 최고지!",
      ],
    },
    {
      background: 'url("/trip-test2.png")',
      numberImg: "/number2.png",
      desc: "출발하기 전에 정해야 해!",
      question: "어떤 수단을 이용할까요?",
      answers: [
        "튼튼한 두 다리만 있으면 되지!",
        "지하철만 타도 갈 수 있는게 여행이야",
        "여행? 그거 비행기 타야 여행 아니야?",
      ],
    },
    {
      background: 'url("/trip-test3.png")',
      numberImg: "/number3.png",
      desc: "앗! 내 물건 어디갔지?",
      question: "어떤 물건을 두고 왔을까요?",
      answers: [
        "비상시 쓸 상비약을 안 챙겼네ㅠㅠ",
        "컵라면이라도 좀 가져왔어야 했는데...",
        "설마 내 장비를 두고 온 건 아니겠지?",
      ],
    },
    {
      background: 'url("/trip-test4.png")',
      numberImg: "/number4.png",
      desc: "드디어 도착했다! 역시 여행은 도전!",
      question: "어떤 액티비티를 즐겨볼까요?",
      answers: [
        lastAnswers.golf,
        lastAnswers.trekking,
        lastAnswers.ocean,
        lastAnswers.culture,
      ],
    },
  ];

  return (
    <>
      {isTestFinished ? (
        <TestResult result={resultData} />
      ) : (
        <Container background={testContent[orderNumber].background}>
          {/* {orderNumber === 0 ? null : (
            <GoChevronLeft className="left" onClick={() => goPrev()} />
          )} */}
          <section>
            <img src={testContent[orderNumber].numberImg} alt="문항 번호" />
            <Title>
              <span className="desc"> {testContent[orderNumber].desc} </span>
              <span className="question">
                {testContent[orderNumber].question}
              </span>
            </Title>
            <Buttons>
              {testContent[orderNumber].answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => {
                    orderNumber === testContent.length - 1
                      ? testSubmit(answer)
                      : goNext();
                  }}
                >
                  {answer}
                </button>
              ))}
            </Buttons>
          </section>
          {/* {orderNumber === testContent.length - 1 ? null : (
            <GoChevronRight className="right" onClick={() => goNext()} />
          )} */}
        </Container>
      )}
    </>
  );
};

const Container = styled.div<{ background: string }>`
  background-image: ${(props) => props.background || 'url("/trip-test1.png;")'};
  width: 100%;
  height: 730px;
  display: flex;

  .left {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    left: 10px;
    color: white;
    cursor: pointer;
  }
  .right {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    right: 10px;
    color: white;
    cursor: pointer;
  }

  section {
    position: relative;
    width: 50%;
    height: 478px;
    margin: auto;
    border: 20px solid transparent;
    border-radius: 8px;
    background-image: linear-gradient(#fff, #fff),
      linear-gradient(120deg, #ccd4b9, #7cd4e1, #efb2f9);
    background-origin: border-box;
    background-clip: content-box, border-box;
    opacity: 0.9;

    img {
      position: absolute;
      top: 20px;
      left: 20px;
    }
  }

  @media (max-width: 850px) {
    background-image: none;
    height: 100%;

    section {
      position: relative;
      width: 80%;
      height: 380px;
      margin-top: 40px;

      img {
        position: absolute;
        top: 30px;
        left: 30px;
        width: 40px;
      }
    }
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  justify-content: center;
  text-align: center;
  margin-top: 85px;
  color: var(--color-blue);

  .desc {
    font-size: 18px;
  }

  .question {
    font-size: 30px;
    font-weight: bold;
  }

  @media (max-width: 850px) {
    margin-top: 80px;
    gap: 8px;

    .desc {
      font-size: 15px;
    }

    .question {
      font-size: 20px;
      font-weight: bold;
    }
  }
`;

const Buttons = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  button {
    width: 75%;
    padding: 8px 5px;
    margin: 0 auto;
    border: 2px solid var(--color-blue);
    border-radius: 8px;
    background-color: transparent;
    cursor: pointer;
    font-size: 18px;

    :hover {
      background-color: var(--color-blue);
      color: white;
    }
  }

  @media (max-width: 850px) {
    margin-top: 40px;
    gap: 10px;

    button {
      width: 80%;
      height: fit-content;
      font-size: 13px;
      word-break: keep-all;
    }
  }
`;

export default TripTest;
