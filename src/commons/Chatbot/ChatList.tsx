import React, { useState } from "react";
import styled from "styled-components";
import { TimeFormatEnum, currentTime } from "../../utils/CurrentTime";
import { useRecoilState } from "recoil";
import { chatListState } from "../../store/chatbotAtom";

type ChatPropsType = {
  startTime: string;
};

const ChatList = ({ startTime }: ChatPropsType) => {
  const [chatList, setChatList] = useRecoilState(chatListState);

  return (
    <ChatListContainer>
      <div className="start-time">{"오늘 " + startTime}</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
      <div>sdfdsfsd</div>
    </ChatListContainer>
  );
};

const ChatListContainer = styled.div`
  height: 430px;
  overflow: auto;
  padding: 0 10px;

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

  .start-time {
    text-align: center;
    margin-bottom: 15px;
    color: var(--color-blue);
  }

  @media (max-width: 850px) {
    height: 300px;
  }
`;

export default ChatList;
