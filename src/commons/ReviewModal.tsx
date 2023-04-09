import React, { useState } from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { IReviewModalProps } from "./../@types/props.d";

const ReviewModal = ({ title }: IReviewModalProps) => {
  return (
    <Modal>
      <form>
        <p>비밀번호</p>
        <div>
          <input type="text" />
          <button type="submit">확인</button>
        </div>
      </form>
      <button>수정하기</button>
    </Modal>
  );
};

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: white;
  h2 {
    font-size: 25px;
    font-weight: bold;
    text-align: center;
  }
  form {
    width: 80%;
    div {
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
`;

export default ReviewModal;
