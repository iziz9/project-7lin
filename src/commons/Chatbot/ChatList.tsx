import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { chatListState, chatbotStepState } from "../../store/chatbotAtom";

const ChatList = () => {
  const [chatList, setChatList] = useRecoilState(chatListState);
  const [chatbotStep] = useRecoilState(chatbotStepState);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  return (
    <ChatListContainer ref={scrollRef}>
      <section className="start-time">{"오늘 " + chatbotStep.time}</section>
      <section className="chat-list">
        {chatList.map((chatItem, index) => (
          <div key={index} className={chatItem.question ? "question" : "me"}>
            {chatItem.question ? (
              <>
                <div className="icon">
                  <img src="/floating.png" alt="챗봇아이콘" />
                </div>
                <div className="text">{chatItem.text}</div>
                <div className="time">{chatItem.time}</div>
              </>
            ) : (
              <>
                <div className="time">{chatItem.time}</div>
                <div className="text">{chatItem.text}</div>
              </>
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
  white-space: pre-line;

  .start-time {
    text-align: center;
    margin-bottom: 20px;
    color: var(--color-blue);
  }

  .chat-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 97%;
    margin: 0 auto 15px;

    .question {
      display: flex;
      gap: 10px;
      align-items: center;

      .text {
        background-color: var(--color-yellow);
        padding: 10px 15px;
        font-size: 16px;
        border-radius: 15px 15px 15px 0;
      }
      .time {
        font-size: 12px;
      }
      .icon {
        img {
          width: 40px;
        }
      }
    }
    .me {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      align-items: center;

      .text {
        background-color: var(--color-blue);
        padding: 10px 15px;
        font-size: 16px;
        border-radius: 15px 15px 0 15px;
        color: white;
      }
      .time {
        font-size: 12px;
      }
      .icon {
        img {
          width: 35px;
        }
      }
    }
  }

  @media (max-width: 850px) {
    .start-time {
      font-size: 14px;
    }
    .chat-list {
      .question {
        gap: 5px;
        .text {
          padding: 10px 15px;
          font-size: 13px;
        }
        .time {
          font-size: 10px;
        }
        .icon {
          img {
            width: 30px;
          }
        }
      }

      .me {
        gap: 5px;

        .text {
          background-color: var(--color-blue);
          padding: 10px 15px;
          font-size: 13px;
          color: white;
        }
        .time {
          font-size: 10px;
        }
        .icon {
          img {
            width: 25px;
          }
        }
      }
    }
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
