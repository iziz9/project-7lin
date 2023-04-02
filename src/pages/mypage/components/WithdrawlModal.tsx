import React from "react";
import styled from "styled-components";
import { BasicBtn } from "../../../commons/Button";

const WithdrawlModal = () => {
  return (
    <Container>
      <div className="info">
        <div>
          가입된 회원정보가 모두 삭제됩니다. 작성하신 게시물은 삭제되지
          않습니다.
        </div>
        <div>
          탈퇴 후 같은 계정으로 재가입 시 기존에 가지고 있던 적립금은 복원되지
          않으며, 사용 및 다운로드했던 쿠폰도 사용 불가능합니다.
        </div>
        <div>회원탈퇴를 진행하시겠습니까?</div>
      </div>
      <div className="btn-wrapper">
        <BasicBtn>탈퇴하기</BasicBtn>
      </div>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  font-size: 18px;
  .info {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;
    word-break: keep-all;
  }
`;

export default WithdrawlModal;
