import { useState, useEffect } from "react";
import styled from "styled-components";
import FloatingInput from "./FloatingInput";
import { PersonalData } from "./Terms";
import { TimeFormatEnum, currentTime } from "../utils/CurrentTime";
import { useMediaQuery } from "react-responsive";

export interface ChatListType {
  person: string;
  time: string;
  message: string;
}

const FloatingModal = () => {
  const isMobile: boolean = useMediaQuery({
    query: "(max-width:850px)",
  });
  const questions = [
    "안녕하세요. 고투게더 여행 그룹 추천 상담봇입니다. 정확한 결과 발송을 위해 연락처를 남겨주세요. <br /> ex) 01012345678",
    "이름 또는 닉네임을 입력해주세요.",
    "함께 여행하고 싶은 연령대 그룹은? <br /> (중복 선택 가능)",
    "함께 여행하고 싶은 그룹 유형은? <br /> (중복 선택 가능)",
    "여행에 함께 참가하는 동행자의 유형은? <br /> (중복 선택 가능)",
    "함께 여행하고 싶은 종교적 성향의 그룹은?",
    "함께 여행하고 싶은 정치적 성향의 그룹은?",
    "가고 싶은 여행의 테마는?",
    "원하는 여행 시기는?",
    "연평균 해외여행 횟수는?",
  ];
  const [orderNumber, setOrderNumber] = useState(0);
  const [recievedMessage, setRecievedMessage] = useState<string>(
    questions[orderNumber],
  );
  const [myMessage, setMyMessage] = useState<string>("");
  const [chatList, setChatList] = useState<Array<ChatListType>>([]);
  const time = currentTime(1000, TimeFormatEnum.HHmm);

  useEffect(() => {
    myMessage.length >= 1 &&
      setChatList((prev) => [
        ...prev,
        { person: "me", time: time, message: myMessage },
      ]);
  }, [myMessage]);

  useEffect(() => {
    recievedMessage.length >= 1 &&
      setChatList((prev) => [
        ...prev,
        { person: "question", time: time, message: recievedMessage },
      ]);
  }, [recievedMessage]);

  return (
    <>
      {isMobile ? (
        <MobileModal>
          <div className="inner">
            {/* <PersonalData /> */}
            <FloatingInput
              setMyMessage={setMyMessage}
              orderNumber={orderNumber}
            />
          </div>
        </MobileModal>
      ) : (
        <Modal>
          <div className="inner">
            {/* <PersonalData /> */}
            <FloatingInput
              setMyMessage={setMyMessage}
              orderNumber={orderNumber}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

const MobileModal = styled.div`
  width: 280px;
  height: 460px;
  z-index: -99;
  position: absolute;
  right: 30px;
  bottom: 70px;
  background-color: #f5f5f5;
  opacity: 0.95;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 2px 2px 5px 1px var(--color-grayscale20);

  .inner {
    width: 250px;
    height: 300px;
    margin: 15px auto;
    border-radius: 8px;
  }
`;

const Modal = styled.div`
  width: 450px;
  height: 700px;
  z-index: -99;
  position: absolute;
  right: 60px;
  bottom: 70px;
  background-color: #f5f5f5;
  opacity: 0.95;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 2px 2px 5px 1px var(--color-grayscale20);

  .inner {
    width: 420px;
    height: 530px;
    margin: 20px auto;
  }
`;

export default FloatingModal;
