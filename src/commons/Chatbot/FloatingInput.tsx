import { useState } from "react";
import styled from "styled-components";
import { IoIosPaperPlane } from "react-icons/io";
import { questions, answers } from "./questionsAndAnswers";
import {
  chatListState,
  orderNumberState,
  chatbotStepState,
} from "../../store/chatbotAtom";
import { useRecoilState } from "recoil";
import { currentTime, TimeFormatEnum } from "../../utils/CurrentTime";

type FloatingInputPropsType = {
  answer: string[];
  setAnswer: any;
};

const FloatingInput = ({ answer, setAnswer }: FloatingInputPropsType) => {
  const [chatbotStep, setChatbotStep] = useRecoilState(chatbotStepState);
  const [chatList, setChatList] = useRecoilState(chatListState);
  const [orderNumber, setOrderNumber] = useRecoilState(orderNumberState);
  const time = currentTime(1000, TimeFormatEnum.HHmm);

  const handleSubmit = (answers: string[]) => {
    setChatList((prev) => [
      ...prev,
      { question: false, time: time, text: [...(answers + " ")] },
    ]);

    orderNumber.buttonNumbering < 7 &&
      setTimeout(() => {
        setChatList((prev) => [
          ...prev,
          {
            question: true,
            time: time,
            text: [...questions[orderNumber.totalNumbering + 1]],
          },
        ]);
      }, 300);

    orderNumber.textNumbering < 2 &&
      setOrderNumber({
        totalNumbering: orderNumber.totalNumbering + 1,
        buttonNumbering: 0,
        textNumbering: orderNumber.textNumbering + 1,
      });

    orderNumber.textNumbering === 2 &&
      setOrderNumber({
        totalNumbering: orderNumber.totalNumbering + 1,
        buttonNumbering: orderNumber.buttonNumbering + 1,
        textNumbering: 2,
      });

    if (orderNumber.buttonNumbering === 7) {
      const filteredList = chatList
        .filter((item) => {
          return !item.question;
        })
        .map((item) => item.text.join(""));
      // api연결코드 작성

      setChatbotStep({ step: 3 }); // step3 제출 완료 안내화면으로
      setOrderNumber({
        totalNumbering: 0,
        buttonNumbering: 0,
        textNumbering: 0,
      }); //초기화
      setChatList([]); // 저장된 채팅리스트 지우기
    }
  };

  return (
    <InputSection>
      {orderNumber.textNumbering < 2 ? ( //<
        <TextForm
          onSubmit={(e) => {
            e.preventDefault();
            console.log(answer);
            // orderNumber.textNumbering === 0 && answer.matches(/^\d{2,3}-?\d{3,4}-?\d{4}$/)
            answer.length < 2
              ? alert("정확한 답변을 작성해주세요.")
              : handleSubmit(answer);
            setAnswer([]);
          }}
        >
          <input
            type="text"
            placeholder="여기에 메시지 입력"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
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
            let clickedArr: string[] = [];
            for (const pair of entries) {
              clickedArr.push(String(pair[1]));
            }

            clickedArr.length < 1
              ? alert("원하는 유형을 최소 1개 선택해주세요.")
              : handleSubmit(clickedArr);
          }}
        >
          <div className="formInner">
            <div className="innerSection">
              {answers[orderNumber.buttonNumbering].map((answer) => (
                <div key={answer}>
                  <input
                    type="checkbox"
                    id={answer + orderNumber.buttonNumbering}
                    name={answer + orderNumber.buttonNumbering}
                    value={answer}
                    defaultChecked={false}
                  />
                  <label htmlFor={answer + orderNumber.buttonNumbering}>
                    {answer}
                  </label>
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

  @media (max-width: 850px) {
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
      width: 370px;
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

  @media (max-width: 850px) {
    width: 350px;
    height: 130px;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .formInner {
      .innerSection {
        width: 300px;
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

  @media (max-width: 600px) {
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

  @media (max-width: 850px) {
    input {
      width: 350px;
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

  @media (max-width: 600px) {
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
