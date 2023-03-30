import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BasicBtn } from "../../../commons/Button";
import { useModal } from "../../../hooks/useModal";
import { scrollToTop } from "../../../utils/scroll";

const ShowPwModal = () => {
  const { closeModal } = useModal();
  return (
    <Container>
      <div className="show-id">
        <span className="name">7조</span>님의 이메일{" "}
        <span className="id">7lin@gmail.com</span>로 임시 비밀번호가
        전송되었습니다.
      </div>
      <div
        onClick={() => {
          scrollToTop();
          closeModal();
        }}
      >
        <BasicBtn>로그인 하러가기</BasicBtn>
      </div>
    </Container>
  );
};

const Container = styled.div`
  line-height: 140%;
  letter-spacing: -0.02em;
  font-style: normal;
  font-size: 23px;
  word-break: keep-all;
  .show-id {
    margin-bottom: 29px;
    text-align: center;
    color: rgba(98, 98, 98, 0.78);
    .name {
      font-weight: 600;
    }
    .id {
      color: #0d99ff;
      font-weight: 600;
    }
  }
  @media (max-width: 850px) {
    font-size: 16px;
  }
`;

export default ShowPwModal;
