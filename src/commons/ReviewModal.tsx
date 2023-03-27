import React, { useState } from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";

interface IReviewModalProps {
  title: string;
  setModalOpen: React.Dispatch<React.SetStateAction<string>>;
}

const ReviewModal = ({ setModalOpen, title }: IReviewModalProps) => {
  return (
    <Modal>
      <div>
        <GrClose size={25} onClick={() => setModalOpen("")} />
        <h2>{title}하시겠습니까?</h2>
        <form>
          <p>비밀번호</p>
          <div>
            <input type="text" />
            <button type="submit">확인</button>
          </div>
        </form>
        <button>수정하기</button>
      </div>
    </Modal>
  );
};

const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: #0000005e;
  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 250px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    background-color: white;
    svg {
      position: absolute;
      right: 40px;
      cursor: pointer;
    }
    h2 {
      margin-top: 40px;
      font-size: 25px;
      font-weight: bold;
      text-align: center;
    }
    form {
      margin-top: 30px;
      width: 80%;
      > div {
        display: flex;
        input {
          width: 100%;
          border: none;
          outline: none;
          border-bottom: 1px solid #000;
          font-size: 15px;
        }
        button {
          padding: 10px;
          flex-shrink: 0;
          margin-left: 10px;
          border: 1px solid #8e8e93;
          border-radius: 8px;
          outline: none;
          background-color: transparent;
          color: #636366;
          cursor: pointer;
        }
      }
    }
    > button {
      width: 80%;
      margin-top: 20px;
      padding: 15px;
      outline: none;
      border: none;
      border-radius: 8px;
      background-color: #0d99ff;
      color: white;
      font-size: 15px;
      cursor: pointer;
    }
  }
`;

export default ReviewModal;
