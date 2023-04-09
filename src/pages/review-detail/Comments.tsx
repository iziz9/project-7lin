import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { HiOutlineShare } from "react-icons/hi";
import ReviewModal from "../../commons/ReviewModal";
import { useMediaQuery } from "react-responsive";
import { FiMoreVertical } from "react-icons/fi";
import Modal from "../../commons/Modal";
import { useModal } from "../../hooks/useModal";

const Comments = () => {
  const [modalOpen, setModalOpen] = useState("");
  const [mobileBtnOpen, setMobileBtnOpen] = useState(false);

  const isMobile: boolean = useMediaQuery({
    query: "(max-width:850px)",
  });

  const { openModal } = useModal();

  const handleModalOpen = (mode: string) => {
    if (isMobile) {
      setMobileBtnOpen(false);
      openModal({
        title: `${mode}하시겠습니까?`,
        content: <ReviewModal title={mode} />,
      });
    } else
      openModal({
        title: `${mode}하시겠습니까?`,
        content: <ReviewModal title={mode} />,
      });
  };

  return (
    <CommentList>
      <CommentInfo>
        <p>
          <BsChatDots size={30} color="#4a4a4a" />
          <span>댓글 3</span>
        </p>
        <HiOutlineShare size={30} color="#4a4a4a" />
      </CommentInfo>

      {[1, 2, 3].map((item) => (
        <Comment key={item}>
          <CommentTop>
            <Texts>
              <strong>이은****</strong>
              <span>2023년 12월 12일 13:45 작성</span>
            </Texts>
            {isMobile ? (
              <MobileBtns>
                <FiMoreVertical
                  size={30}
                  onClick={() => setMobileBtnOpen((prev) => !prev)}
                />
                {mobileBtnOpen ? (
                  <div>
                    <button onClick={() => handleModalOpen("수정")}>
                      수정하기
                    </button>
                    <button onClick={() => handleModalOpen("삭제")}>
                      삭제하기
                    </button>
                  </div>
                ) : null}
              </MobileBtns>
            ) : (
              <Btns>
                <button onClick={() => handleModalOpen("수정")}>
                  수정하기
                </button>
                <button onClick={() => handleModalOpen("삭제")}>
                  삭제하기
                </button>
              </Btns>
            )}
          </CommentTop>
          <CommentMain>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque
            suscipit expedita illum iusto neque hic inventore. Possimus
            voluptatem necessitatibus eveniet facere qui corrupti unde libero,
            minus autem quae voluptatum ipsa.
          </CommentMain>
        </Comment>
      ))}

      <Modal />

      {isMobile ? (
        <MobileCommentForm>
          <textarea placeholder="댓글을 남겨주세요"></textarea>
          <div>
            <div>
              <input type="text" placeholder="작성자 이름" />
              <input type="text" placeholder="비밀번호" />
            </div>
            <button>작성</button>
          </div>
        </MobileCommentForm>
      ) : (
        <CommentForm>
          <div>
            <input type="text" placeholder="작성자 이름" />
            <input type="text" placeholder="비밀번호" />
          </div>
          <textarea placeholder="댓글을 남겨주세요"></textarea>
          <button>작성하기</button>
        </CommentForm>
      )}
    </CommentList>
  );
};

const CommentList = styled.div`
  margin-top: 80px;
`;
const CommentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  padding-bottom: 30px;
  p {
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
    }
  }
`;
const Comment = styled.div`
  margin: 50px 0;
  padding: 30px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;
const CommentTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const Texts = styled.div`
  font-size: 18px;
  strong {
    margin-right: 40px;
  }
  span {
    font-size: 13px;
    color: #5b5b5b;
  }
`;
const Btns = styled.div`
  button {
    margin-left: 20px;
    padding: 10px 15px;
    border: none;
    outline: none;
    background-color: transparent;
    border-radius: 10px;
    cursor: pointer;
    :first-child {
      color: #848484;
      border: 1px solid #848484;
    }
    :last-child {
      color: #e14544;
      border: 1px solid #e14544;
    }
  }
`;
const MobileBtns = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  div {
    position: absolute;
    top: 100%;
    right: 0;
    display: flex;
    flex-direction: column;
    width: 100px;
    box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: white;
    button {
      font-size: 17px;
      border: none;
      outline: none;
      padding: 13px 0;
      border-radius: 8px;
      background-color: white;
      cursor: pointer;
      :hover {
        font-weight: bold;
      }
      :last-child {
        color: #e14544;
      }
    }
  }
`;
const CommentMain = styled.div`
  font-size: 20px;
  line-height: 30px;
`;
const CommentForm = styled.form`
  margin-top: 30px;
  padding: 30px;
  border-radius: 8px;
  position: relative;
  background-color: #f5f5f5;
  input {
    width: 20%;
    margin-right: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    outline: none;
    font-size: 16px;
  }
  textarea {
    display: block;
    width: 100%;
    height: 80px;
    margin-top: 25px;
    box-sizing: border-box;
    overflow: hidden;
    resize: none;
    border: none;
    outline: none;
    font-size: 16px;
    background-color: transparent;
    ::placeholder {
      color: #48484a;
    }
  }
  button {
    padding: 12px 35px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    border: none;
    outline: none;
    background-color: #848484;
    border-radius: 8px;
    color: white;
    font-size: 16px;
  }
`;
const MobileCommentForm = styled.form`
  width: 100%;
  position: fixed;
  bottom: 80px;
  left: 0;
  z-index: 10;
  border-top: 1px solid #8e8e93;
  background-color: white;
  textarea {
    width: 100%;
    height: 60px;
    font-size: 20px;
    padding: 20px;
    box-sizing: border-box;
    display: block;
    overflow: hidden;
    resize: none;
    border: none;
    outline: none;
    background-color: transparent;
  }
  > div {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    border-top: 1px solid #8e8e93;
    border-bottom: 1px solid #8e8e93;
    background-color: white;
    div {
      width: 85%;
      padding: 10px;
      display: flex;
      input {
        width: 45%;
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        outline: none;
        font-size: 16px;
        background-color: #f5f5f5;
        :first-child {
          margin-right: 10px;
        }
      }
    }
    button {
      width: 15%;
      align-self: stretch;
      background-color: #0d99ff;
      border: none;
      outline: none;
      color: white;
      font-size: 18px;
    }
  }
`;

export default Comments;
