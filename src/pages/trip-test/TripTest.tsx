import { useEffect, useState } from "react";
import styled from "styled-components";
import { scrollToTop } from "../../utils/scroll";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

type Props = {};

const TripTest = (props: Props) => {
  const [orderNumber, setOrderNumber] = useState(0);

  useEffect(() => {
    scrollToTop();
  }, []);

  const goPrev = () => {
    // 배경사진, 문항번호, 타이틀, 버튼내용 바꾸기
    setOrderNumber(orderNumber - 1);
  };

  console.log(orderNumber);

  const goNext = () => {
    setOrderNumber(orderNumber + 1);
  };

  // 첫번째 장에서는 left 버튼 x
  // 이전 문항으로 돌아간 게 아니면 right 버튼 x
  // 마지막 장에서는 right 버튼 x, 결과보기 버튼 o

  const testSubmit = () => {
    console.log("api 연결");
  };

  const testContent = [
    {
      background: 'url("/trip-test1.png")',
      numberImg: "/number1.png",
      desc: "당장 떠나고 싶은 날",
      question: "어떤 여행을 가고 싶으세요?",
      answers: [
        "여기저기 보고 느끼는 여행이 좋아!",
        "쉬고싶다... 힐링 여행이 최고지!",
      ],
    },
    {
      background: 'url("/trip-test2.png")',
      numberImg: "/number2.png",
      desc: "출발하기 전에 정해야 해!",
      question: "어떤 수단을 이용할까요?",
      answers: [
        "당연히 렌트 해서 가는거지",
        "기차가 최고야 KTX 타고 고고",
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
        "설마 내 장비를 두고 온 건 아니겠지?",
        "컵라면이라도 좀 가져왔어야 했는데...",
      ],
    },
    {
      background: 'url("/trip-test4.png")',
      numberImg: "/number4.png",
      desc: "드디어 도착했다! 역시 여행은 도전!",
      question: "어떤 액티비티를 즐겨볼까요?",
      answers: [
        "이번에도 남들이 안 가본 새로운 곳을 찾아",
        "액티비티도 좋지만 기도부터 해야지",
        "이번 여행은 건강건강! 도전하자!",
      ],
    },
    {
      background: 'url("/trip-test5.png")',
      numberImg: "/number5.png",
      desc: "역시 여행은 도전!",
      question: "어떤 액티비티를 즐겨볼까요?",
      answers: [
        "이날을 위해 스크린에서 연습했지. 라운딩 가자!",
        "멋진 풍경을 배경삼아 한번 걸어볼까?",
        "일단 그래도 이 곳 문화가 어떤지 알아봐야지",
        "노는 것도 좋지만 도움이 필요한 곳은 없을까?",
      ],
    },
  ];

  return (
    <Container background={testContent[orderNumber].background}>
      {orderNumber === 0 ? null : (
        <GoChevronLeft className="left" onClick={() => goPrev()} />
      )}
      <section>
        <img src={testContent[orderNumber].numberImg} alt="문항 번호" />
        <Title>
          <span className="desc"> {testContent[orderNumber].desc} </span>
          <span className="question">{testContent[orderNumber].question}</span>
        </Title>
        <Buttons>
          {testContent[orderNumber].answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => {
                orderNumber === testContent.length - 1
                  ? testSubmit()
                  : goNext();
              }}
            >
              {answer}
            </button>
          ))}
        </Buttons>
        {/* <div className="submit">
          <button onClick={() => testSubmit()}>결과보기</button>
        </div> */}
      </section>
      {orderNumber === testContent.length - 1 ? null : (
        <GoChevronRight className="right" onClick={() => goNext()} />
      )}
    </Container>
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

    // .submit {
    //   display: flex;
    //   justify-content: center;

    //   button {
    //     width: 123px;
    //     height: 46px;
    //     margin-top: 30px;
    //     color: white;
    //     font-size: 23px;
    //     background-color: var(--color-blue);
    //     border: none;
    //     border-radius: 8px;
    //     cursor: pointer;
    //   }
    // }
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
`;

const Buttons = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  button {
    width: 75%;
    height: 41px;
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
`;

export default TripTest;
