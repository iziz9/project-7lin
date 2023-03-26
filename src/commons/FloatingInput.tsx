import React from "react";
import styled from "styled-components";
import { IoIosPaperPlane } from "react-icons/io";

type Props = {};

const FloatingInput = (props: Props) => {
  // 질문 3번째부터는 text input 대신 button형식으로 변경하기
  // 질문 순서에 따른 버튼목록
  const answerAge = ["2030", "3040", "4050", "5060", "6070", "모든 연령대"];
  const answerType = ["여자끼리", "남자끼리", "자녀동반", "상관없음"];
  const answerPartner = [
    "나홀로 참가",
    "친구나 동료",
    "연인이나 부부",
    "자녀를 동반하는 가족",
    "상관없음",
  ];
  const answerReligion = [
    "하나님과 함께하는 여행",
    "부처님의 발자취를 찾아",
    "상관없음",
  ];
  const answerPolitical = ["보수적인 그룹", "진보적인 그룹", "상관없음"];
  const answerTheme = [
    "문화탐방",
    "골프여행",
    "리조트 휴양 및 힐링",
    "오지탐험",
    "트레킹",
    "봉사활동",
    "성지순례",
  ];
  const answerWeather = ["봄", "여름", "가을", "겨울", "아무때나"];
  const answerTrip = [
    "연 1회 이하",
    "연 2회",
    "연 3회",
    "연 4회",
    "연 5회 이상",
  ];

  return (
    <InputSection>
      <Buttons>
        <div>
          <input type="checkbox" id="check1" />
          <label htmlFor="check1">선택1sdfsdfsdf</label>
        </div>
        <div>
          <input type="checkbox" id="check2" />
          <label htmlFor="check2">선택2sdfds</label>
        </div>
        <div>
          <input type="checkbox" id="check3" />
          <label htmlFor="check3">선택3df</label>
        </div>
        <div>
          <input type="checkbox" id="check4" />
          <label htmlFor="check4">선택4sdfdsfdsfds</label>
        </div>
      </Buttons>
      <TextArea>
        <input type="text" placeholder="여기에 메시지 입력" />
        <IoIosPaperPlane className="send" />
      </TextArea>
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
`;

const Buttons = styled.div`
  width: 420px;
  height: 150px;
  position: absolute;
  bottom: 120px;
  box-sizing: border-box;
  padding: 10px;
  background-color: white;
  display: flex;
  justify-content: center;
  gap: 10px;
  border-radius: 8px;

  label {
    display: block;
    padding: 5px;
    height: 50px;
    background-color: var(--color-buttonGray);
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
  }

  input[type="checkbox"] {
    display: none;

    &:checked + label {
      background-color: var(--color-blue);
      color: white;
    }
  }
`;

const TextArea = styled.div`
  position: relative;
  input {
    width: 420px;
    box-sizing: border-box;
    margin: auto;
    padding: 10px 10px 50px;
    border: 1px solid transparent;
    white-space: pre;
    resize: none;
    rows: 2;
    border-radius: 8px;

    :focus {
      outline: none;
    }

    ::placeholder {
      margin-left: 50px;
    }
  }
  .send {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    color: var(--color-grayscale50);
    cursor: pointer;
  }
`;

export default FloatingInput;
