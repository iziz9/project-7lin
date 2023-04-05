import React from "react";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";
import { BasicBtn } from "../../commons/Button";
import { BasicInput } from "../../commons/Input";

type Props = {};

const EditUserInfoModal = (props: Props) => {
  const { openModal, closeModal } = useModal();
  // 상태관리쓰기

  return (
    <Container>
      <div className="content">
        <div className="box name">
          <h3>예약자 이름</h3>
          <BasicInput type="text" placeholder="이땡땡" />
        </div>
        <div className="box phone">
          <h3>휴대폰 번호</h3>
          <BasicInput type="text" placeholder="01012345678" />
        </div>
        <div className="box email">
          <h3>이메일 주소</h3>
          <BasicInput type="text" placeholder="abc@abc.com" />
        </div>
      </div>
      <div
        onClick={() => {
          closeModal();
        }}
      >
        <BasicBtn onClick={() => console.log("예약자 정보 바꾸기")}>
          예약자 정보 수정
        </BasicBtn>
      </div>
    </Container>
  );
};

const Container = styled.div`
  font-style: normal;
  font-size: 20px;
  word-break: keep-all;
  position: relative;

  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;

    .box {
      display: flex;
      justify-content: center;
      gap: 30px;
      line-height: 40px;

      h3 {
        font-size: 20px;
      }

      input {
        width: 220px;
        height: 40px;
      }
    }
  }

  @media (max-width: 850px) {
    .content {
      .box {
        gap: 15px;
        line-height: 35px;

        h3 {
          font-size: 15px;
        }
        input {
          padding: 12px;
          width: 150px;
          height: 35px;
          font-size: 12px;
        }
      }
    }
  }
`;

export default EditUserInfoModal;
