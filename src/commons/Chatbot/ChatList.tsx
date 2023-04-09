import React, { useState } from "react";
import styled from "styled-components";
import { TimeFormatEnum, currentTime } from "../../utils/CurrentTime";
import { useRecoilState } from "recoil";
import {
  chatListState,
  chatbotStepState,
  orderNumberState,
} from "../../store/chatbotAtom";
import { questions } from "./questionsAndAnswers";

const ChatList = () => {
  const [chatList, setChatList] = useRecoilState(chatListState);
  const [chatbotStep] = useRecoilState(chatbotStepState);
  const [orderNumber, setOrderNumber] = useRecoilState(orderNumberState);

  return (
    <ChatListContainer>
      <section className="start-time">{"오늘 " + chatbotStep.time}</section>
      <section className="chat-list">
        {chatList.map((chatItem, index) => (
          <div key={index} className={chatItem.question ? "question" : "me"}>
            {chatItem.question ? (
              <div className="chat-bubble">
                <div className="text">{chatItem.text}</div>
                <div className="time">{chatItem.time}</div>
              </div>
            ) : (
              <div className="chat-bubble">
                <div className="time">{chatItem.time}</div>
                <div className="text">{chatItem.text}</div>
              </div>
            )}
          </div>
        ))}
      </section>
    </ChatListContainer>
  );
};

const ChatListContainer = styled.div`
  height: 430px;
  overflow: auto;
  padding: 0 10px;

  .question {
    display: flex;
    align-items: center;
  }
  .me {
  }

  .chat-list {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .chat-bubble {
      display: flex;

      .text {
        background-color: var(--color-blue);
        padding: 10px 15px;
        font-size: 16px;
      }
      .time {
        font-size: 13px;
      }
    }
  }

  .start-time {
    text-align: center;
    margin-bottom: 15px;
    color: var(--color-blue);
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    height: 30%;
    background: var(--color-blue);
    border-radius: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(126, 126, 126, 0.432);
    border-radius: 8px;
  }

  @media (max-width: 850px) {
    height: 300px;
  }
`;

export default ChatList;
