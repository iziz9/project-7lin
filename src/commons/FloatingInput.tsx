import { useState } from "react";
import styled from "styled-components";
import { IoIosPaperPlane } from "react-icons/io";
import { useMediaQuery } from "react-responsive";

type PropsType = {
  setMyMessage: any;
  orderNumber: number;
};

const FloatingInput = ({ setMyMessage, orderNumber }: PropsType) => {
  const isMobile: boolean = useMediaQuery({
    query: "(max-width:849px)",
  });
  // 질문 3번째부터는 text input 대신 button형식으로 변경하기
  // 질문 순서에 따른 버튼목록
  const answers = [
    ["2030", "3040", "4050", "5060", "6070", "모든 연령대"],
    ["여자끼리", "남자끼리", "자녀동반", "상관없음"],
    ["나홀로", "친구/동료", "연인/부부", "자녀 동반 가족", "상관없음"],
    ["하나님과 함께하는 여행", "상관없음", "부처님의 발자취를 찾아"],
    ["보수적인 그룹", "진보적인 그룹", "상관없음"],
    [
      "휴양 및 힐링",
      "문화탐방",
      "골프여행",
      "오지탐험",
      "트레킹",
      "봉사활동",
      "성지순례",
    ],
    ["봄", "여름", "가을", "겨울", "아무때나"],
    ["연 1회 이하", "연 2회", "연 3회", "연 4회", "연 5회 이상"],
  ];

  const [text, setText] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(text);
    setMyMessage(text);
    setText("");
  };

  return (
    <InputSection>
      {orderNumber > 2 ? (
        <TextForm
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}
        >
          <input
            type="text"
            placeholder="여기에 메시지 입력"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">
            <IoIosPaperPlane className="send" />
          </button>
        </TextForm>
      ) : (
        <ButtonsForm
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            let entries = formData.entries();
            for (const pair of entries) {
              console.log(String(pair[0]));
              setText(String(pair[0]));
            }
            onSubmit(e);
          }}
        >
          <div className="formInner">
            <div className="innerSection">
              {answers[orderNumber].map((answer) => (
                <div key={answer}>
                  <input
                    type="checkbox"
                    id={answer}
                    name={answer}
                    value={answer}
                  />
                  <label htmlFor={answer}>{answer}</label>
                </div>
              ))}
            </div>
          </div>
          <button type="submit">
            <IoIosPaperPlane className="send" />
          </button>
        </ButtonsForm>
      )}
    </InputSection>
  );
};

const InputSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: auto;
  position: absolute;
  bottom: 20px;
  border-radius: 8px;

  @media (max-width: 849px) {
    bottom: 10px;
  }
`;

const ButtonsForm = styled.form`
  width: 420px;
  height: 120px;
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  word-break: keep-all;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .formInner {
    .innerSection {
      width: 380px;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      display: flex;
      justify-content: center;
    }
  }

  label {
    display: block;
    padding: 15px 10px;
    background-color: var(--color-buttonGray);
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    line-height: 18px;
  }

  input[type="checkbox"] {
    display: none;

    &:checked + label {
      background-color: var(--color-blue);
      color: white;
    }
  }

  button {
    width: 40px;
    height: 40px;
    background-color: transparent;
    color: white;
    border: none;
    border-radius: 8px;
    position: absolute;
    top: 5px;
    right: 5px;

    .send {
      cursor: pointer;
      width: 60px;
      height: 30px;
      margin: 0 -20px;
      color: var(--color-grayscale50);

      :hover {
        color: var(--color-blue);
      }
    }
  }

  @media (max-width: 849px) {
    width: 250px;
    height: 130px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .formInner {
      .innerSection {
        width: 210px;
        gap: 8px;
      }
    }

    label {
      padding: 8px 10px;
    }

    button {
      width: 40px;
      height: 40px;
      top: 0px;
      right: 0px;

      .send {
        width: 18px;
        height: 18px;
      }
    }
  }
`;

const TextForm = styled.form`
  position: relative;

  input {
    width: 420px;
    height: 100px;
    box-sizing: border-box;
    margin: auto;
    padding: 10px 10px 50px;
    border: 1px solid transparent;
    white-space: pre;
    resize: none;
    border-radius: 8px;

    :focus {
      outline: none;
    }

    ::placeholder {
      margin-left: 50px;
    }
  }

  button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;

    .send {
      width: 30px;
      height: 30px;
      color: var(--color-grayscale50);
      cursor: pointer;
      z-index: 99;
      :hover {
        color: var(--color-blue);
      }
    }
  }

  @media (max-width: 849px) {
    input {
      width: 250px;
      height: 50px;
    }

    button {
      top: 10px;
      right: 10px;

      .send {
        width: 18px;
        height: 18px;
      }
    }
  }
`;

export default FloatingInput;
