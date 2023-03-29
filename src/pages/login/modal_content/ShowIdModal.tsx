import React from "react";
import styled from "styled-components";
import { BasicBtn } from "../../../commons/Button";
import { useModal } from "../../../hooks/useModal";
import { scrollToTop } from "../../../utils/scroll";
import FindIdPasswordModal from "./FindIdPasswordModal";

type Props = {};

const ShowIdModal = (props: Props) => {
  const { openModal, closeModal } = useModal();

  const findIdPasswordModalData = {
    title: "비밀번호 찾기",
    content: <FindIdPasswordModal findPw={true} />,
  };

  return (
    <Container>
      <div className="show-id">
        <span className="name">7조</span>님의 아이디는
        <span className="id"> 7lin@gmail.com</span> 입니다.
      </div>
      <div
        style={{ marginBottom: "10px" }}
        onClick={() => openModal(findIdPasswordModalData)}
      >
        <BasicBtn backgroundColor="#fff" fontColor="#757575">
          비밀번호 찾기
        </BasicBtn>
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

export default ShowIdModal;
