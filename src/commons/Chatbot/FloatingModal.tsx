import { useState, useEffect } from "react";
import styled from "styled-components";
import FloatingInput from "./FloatingInput";
import { PersonalData } from "../Terms";
import { TimeFormatEnum, currentTime } from "../../utils/CurrentTime";
import { chatbotIntro, questions } from "./questionsAndAnswers";
import { useRecoilState } from "recoil";
import {
  chatListState,
  chatbotStepState,
  orderNumberState,
} from "../../store/chatbotAtom";
import { BasicBtn } from "../Button";
import { FcVoicePresentation, FcIdea, FcApproval } from "react-icons/fc";
import ChatList from "./ChatList";

const FloatingModal = () => {
  const time = currentTime(1000, TimeFormatEnum.HHmm);
  const [chatbotStep, setChatbotStep] = useRecoilState(chatbotStepState);
  const [chatList, setChatList] = useRecoilState(chatListState);
  const [orderNumber, setOrderNumber] = useRecoilState(orderNumberState);

  const [answer, setAnswer] = useState([]);
  const [myMessage, setMyMessage] = useState<string>("");

  useEffect(() => {
    orderNumber.totalNumbering === 0 &&
      setChatList([{ question: true, time: time, text: [questions[0]] }]);
  }, [orderNumber]);

  return (
    <Modal>
      <div className="inner">
        {chatbotStep.step === 0 && (
          <IntroContainer>
            <div className="intro-text">
              <div className="blue">
                <FcVoicePresentation className="icon1" />
                <span>{chatbotIntro[0]}</span>
              </div>
              <div className="col">
                <span>
                  <FcIdea className="icon2" />
                  {chatbotIntro[1]}
                </span>
                <span>
                  <FcIdea className="icon2" />
                  {chatbotIntro[2]}
                </span>
                <span>
                  <FcIdea className="icon2" />
                  {chatbotIntro[3]}
                </span>
              </div>
            </div>
            <IntroBtn onClick={() => setChatbotStep({ step: 1 })}>
              여행그룹 추천 설문 시작하기
            </IntroBtn>
          </IntroContainer>
        )}

        {chatbotStep.step === 1 && (
          <IntroContainer>
            <h2>개인정보 수집이용 동의</h2>
            <PersonalData />
            <IntroBtn
              onClick={() => {
                setChatbotStep({ step: 2, time: time });
              }}
            >
              동의하고 시작하기
            </IntroBtn>
          </IntroContainer>
        )}

        {chatbotStep.step === 2 && (
          <div>
            <ChatList />
            <FloatingInput answer={answer} setAnswer={setAnswer} />
          </div>
        )}

        {chatbotStep.step === 3 && (
          <IntroContainer>
            <div className="intro-text">
              <FcApproval className="complete" />
              <span className="complete-text">설문 제출이 완료되었습니다.</span>
            </div>
            <IntroBtn onClick={() => setChatbotStep({ step: 0 })}>
              설문 다시 시작하기
            </IntroBtn>
          </IntroContainer>
        )}
      </div>
    </Modal>
  );
};

const Modal = styled.div`
  width: 450px;
  height: 600px;
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

  @media (max-width: 850px) {
    width: 380px;
    height: 460px;
    right: 30px;
    bottom: 70px;

    .inner {
      width: 350px;
      height: 300px;
      margin: 15px auto;
    }
  }

  @media (max-width: 600px) {
    width: 280px;
    height: 460px;
    right: 30px;
    bottom: 70px;

    .inner {
      width: 250px;
      height: 300px;
    }
  }
`;

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
  }

  pre {
    height: 400px;
  }

  button {
    margin: 50px auto 0;
  }

  .intro-text {
    width: 85%;
    background-color: white;
    margin: auto;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    white-space: pre-line;
    font-size: 18px;
    line-height: 22px;
    border-radius: 8px;

    .blue {
      color: var(--color-blue);
      display: flex;
      gap: 10px;

      .icon1 {
        width: 40px;
        height: 40px;
      }
    }

    .col {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 20px;

      .icon2 {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }

    .complete {
      width: 50px;
      height: 50px;
      margin: auto;
    }

    .complete-text {
      color: var(--color-blue);
      margin: auto;
      font-size: 20px;
    }
  }

  @media (max-width: 850px) {
    h2 {
      text-align: center;
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: bold;
    }

    pre {
      height: 300px;
    }

    .intro-text {
      font-size: 15px;
      line-height: 18px;
      gap: 10px;
    }

    button {
      margin-top: 30px;
    }
  }

  @media (max-width: 600px) {
    .intro-text {
      font-size: 14px;
      line-height: 18px;
      gap: 5px;
      .complete-text {
        font-size: 18px;
      }
    }
  }
`;

const IntroBtn = styled(BasicBtn)`
  margin-top: 30px;
  width: 85%;
`;

export default FloatingModal;
