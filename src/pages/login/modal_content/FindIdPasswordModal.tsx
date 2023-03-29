import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { BasicBtn } from "../../../commons/Button";
import { BasicInput } from "../../../commons/Input";
import { useModal } from "../../../hooks/useModal";
import { modalState } from "../../../store/modalAtom";
import ShowIdModal from "./ShowIdModal";
import ShowPwModal from "./ShowPwModal";

interface Props {
  findPw?: boolean;
}

const FindIdPasswordModal = ({ findPw }: Props) => {
  const [isFindId, setIsFindId] = useState<boolean>(findPw ? false : true);

  const [modalDataState, setModalDataState] = useRecoilState(modalState);

  const { openModal } = useModal();

  const setDescription = () => {
    if (isFindId) {
      return "회원가입시 입력한 연락처를 입력해주세요.";
    } else {
      return "아이디와 회원가입시 입력한 연락처를 입력해주세요.";
    }
  };

  const description = setDescription();

  const showIdModalData = {
    title: "아이디 찾기",
    content: <ShowIdModal />,
  };

  const showPwModalData = {
    title: "비밀번호 찾기",
    content: <ShowPwModal />,
  };

  return (
    <Container>
      <FindOptions>
        <div
          className={isFindId ? "find-option active" : "find-option"}
          onClick={() => {
            setIsFindId(true);
            setModalDataState((prev) => {
              return { ...prev, title: "아이디 찾기" };
            });
          }}
        >
          <div>아이디 찾기</div>
        </div>
        <div
          className={!isFindId ? "find-option active" : "find-option"}
          onClick={() => {
            setIsFindId(false);
            setModalDataState((prev) => {
              return { ...prev, title: "비밀번호 찾기" };
            });
          }}
        >
          <div>비밀번호 찾기</div>
        </div>
      </FindOptions>
      {/* <RadioOptions>
        <div>
          <label onClick={() => setIsFindByPhone(true)}>
            <input type="radio" name="chk-info" defaultChecked={true} />
            연락처로 찾기
          </label>
        </div>
        <div>
          <label onClick={() => setIsFindByPhone(false)}>
            <input type="radio" name="chk-info" />
            이메일로 찾기
          </label>
        </div>
      </RadioOptions> */}
      <Description>{description}</Description>
      <div style={{ marginBottom: "10px" }}>
        <BasicInput type="text" placeholder={isFindId ? "이름" : "아이디"} />
      </div>{" "}
      <div style={{ marginBottom: "20px" }}>
        <BasicInput type="text" placeholder="연락처" />
      </div>
      <BasicBtn
        type="submit"
        value="Submit"
        onClick={() =>
          isFindId ? openModal(showIdModalData) : openModal(showPwModalData)
        }
      >
        {isFindId ? "아이디 찾기" : "비밀번호 찾기"}
      </BasicBtn>
    </Container>
  );
};

const Container = styled.div`
  font-size: 23px;
  line-height: 140%;
  letter-spacing: -0.02em;
  font-style: normal;

  @media (max-width: 560px) {
    font-size: 14px;
  }
`;

const FindOptions = styled.div`
  display: flex;
  margin-bottom: 21px;
  color: #757575;
  font-weight: 600;
  box-sizing: border-box;
  .find-option {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    padding: 10px 16px;
    text-align: center;
    box-sizing: border-box;
    background-color: #d9d9d9;
    cursor: pointer;
    &.active {
      background-color: #fff;
      color: #0d99ff;
      border: 3px solid #0d99ff;
    }
  }
  .find-password {
    width: 50%;
  }
`;

const RadioOptions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  color: #757575;
  font-weight: 500;
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    input {
      margin: 0;
      margin-right: 10px;
      width: 25px;
      height: 25px;

      @media (max-width: 560px) {
        width: 15px;
        height: 15px;
      }
    }
  }
`;

const Description = styled.div`
  margin-top: 26px;
  margin-bottom: 20px;
  font-weight: 300;
  word-break: keep-all;
  color: rgba(98, 98, 98, 0.78);
  line-height: 140%;

  @media (max-width: 560px) {
    font-size: 13.3px;
  }
`;

export default FindIdPasswordModal;
