import React from "react";
import styled from "styled-components";
import { BasicBtn } from "../../../commons/Button";
import { useMutation } from "react-query";
import { widthdrawal } from "../../../apis/auth";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../store/userInfoAtom";
import { removeCookie } from "../../../utils/cookie";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../hooks/useModal";

const WithdrawlModal = () => {
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const withDrawalMutation = useMutation(widthdrawal, {
    onSuccess: (res: any) => {
      if (res) {
        alert("회원탈퇴 성공");
        setUserInfo({ email: "", name: "", gender: "", age: 0, phone: "" });
        removeCookie("accessToken", { path: "/" });
        closeModal();
        window.location.href = "/";
        // navigate("/");
      }
    },
    onError: (error) => {
      alert("회원탈퇴 실패" + error);
    },
  });

  return (
    <Container>
      <div className="info">
        <div>
          가입된 회원정보가 모두 삭제됩니다. 작성하신 게시물은 삭제되지
          않습니다.
        </div>
        <div>
          탈퇴 후 같은 아아디 혹은 같은 전화번호로 재가입이 불가능하며 기존에
          가지고 있던 적립금은 복원되지 않으며, 사용 및 다운로드했던 쿠폰도 사용
          불가능합니다.
        </div>
        <div>회원탈퇴를 진행하시겠습니까?</div>
      </div>
      <div
        className="btn-wrapper"
        onClick={() => {
          withDrawalMutation.mutate();
        }}
      >
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
