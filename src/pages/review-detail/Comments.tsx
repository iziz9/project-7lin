import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { HiOutlineShare } from "react-icons/hi";

const Comments = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <CommentList>
      <CommentInfo>
        <p>
          <BsChatDots size={30} color="#4a4a4a" />
          <span>댓글 3</span>
        </p>
        <HiOutlineShare size={30} color="#4a4a4a" />
      </CommentInfo>

      <Comment>
        <CommentTop>
          <Texts>
            <strong>이은****</strong>
            <span>2023년 12월 12일 13:45 작성</span>
          </Texts>
          <Btns>
            <button onClick={() => setModalOpen(true)}>수정하기</button>
            <button>삭제하기</button>
          </Btns>
          {/* {modalOpen && (
              <Modal>
                <h2>수정하시겠습니까?</h2>
                <p>비밀번호</p>
                <form>
                  <input type="text" />
                  <button type="submit">확인</button>
                </form>
                <button>여행 후기 수정하기</button>
              </Modal>
            )} */}
        </CommentTop>
        <CommentMain>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque
          suscipit expedita illum iusto neque hic inventore. Possimus voluptatem
          necessitatibus eveniet facere qui corrupti unde libero, minus autem
          quae voluptatum ipsa.
        </CommentMain>
      </Comment>
      <Comment>
        <CommentTop>
          <Texts>
            <strong>이은****</strong>
            <span>2023년 12월 12일 13:45 작성</span>
          </Texts>
          <Btns>
            <button onClick={() => setModalOpen(true)}>수정하기</button>
            <button>삭제하기</button>
          </Btns>
          {/* {modalOpen && (
              <Modal>
                <h2>수정하시겠습니까?</h2>
                <p>비밀번호</p>
                <form>
                  <input type="text" />
                  <button type="submit">확인</button>
                </form>
                <button>여행 후기 수정하기</button>
              </Modal>
            )} */}
        </CommentTop>
        <CommentMain>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque
          suscipit expedita illum iusto neque hic inventore. Possimus voluptatem
          necessitatibus eveniet facere qui corrupti unde libero, minus autem
          quae voluptatum ipsa.
        </CommentMain>
      </Comment>
      <Comment>
        <CommentTop>
          <Texts>
            <strong>정호****</strong>
            <span>2023년 12월 15일 15:25 작성</span>
          </Texts>
          <Btns>
            <button onClick={() => setModalOpen((prev) => !prev)}>
              수정하기
            </button>
            <button onClick={() => setModalOpen((prev) => !prev)}>
              삭제하기
            </button>
          </Btns>
          {/* {modalOpen && (
              <Modal>
                <h2>수정하시겠습니까?</h2>
                <p>비밀번호</p>
                <form>
                  <input type="text" />
                  <button type="submit">확인</button>
                </form>
                <button>여행 후기 수정하기</button>
              </Modal>
            )} */}
        </CommentTop>
        <CommentMain>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
          consequatur id itaque veniam minima ab? Pariatur recusandae
          consequatur, quidem fugit repellendus porro dolore laudantium quasi
          consectetur id numquam. Ab, perspiciatis?
        </CommentMain>
      </Comment>
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
  padding: 30px 0;
  border-bottom: 1px solid black;
`;
const CommentTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const Texts = styled.div`
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
const CommentMain = styled.div`
  font-size: 18px;
  line-height: 30px;
`;
const CommentForm = styled.form`
  margin-top: 30px;
  padding: 30px;
  border: 1px solid black;
  border-radius: 8px;
  position: relative;
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
    font-size: 15px;
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
  }
`;
const InputArea = styled.div`
  input {
    width: 20%;
    margin-right: 20px;
    padding: 10px 20px;
    border: 1px solid #848484;
    border-radius: 8px;
    outline: none;
  }
`;

export default Comments;
