import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { BasicBtn } from "../../../commons/Button";
import { BasicInput } from "../../../commons/Input";
import { useModal } from "../../../hooks/useModal";
import { modalState } from "../../../store/modalAtom";
import ShowIdModal from "./ShowIdModal";
import ShowPwModal from "./ShowPwModal";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FindIdFormValue, FindPwFormValue } from "../../../@types/data";

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

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const validationIdSchema = Yup.object().shape({
    name: Yup.string().required("이름을 입력해주세요!").trim(),
    phone: Yup.string()
      .required("전화번호를 입력해주세요!")
      .trim()
      .matches(
        /^\d{2,3}-?\d{3,4}-?\d{4}$/,
        "전화번호 형식이 올바르지 않습니다!",
      ),
  });

  const validationPwSchema = Yup.object().shape({
    email: Yup.string()
      .required("이메일을 입력해주세요!")
      .trim()
      .matches(
        /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
        "이메일 형식이 올바르지 않습니다!",
      ),
    phone: Yup.string()
      .required("전화번호를 입력해주세요!")
      .trim()
      .matches(
        /^\d{2,3}-?\d{3,4}-?\d{4}$/,
        "전화번호 형식이 올바르지 않습니다!",
      ),
  });

  const findIdForm = useForm<FindIdFormValue>({
    resolver: yupResolver(validationIdSchema),
    mode: "onBlur",
  });

  const findPwForm = useForm<FindPwFormValue>({
    resolver: yupResolver(validationPwSchema),
    mode: "onBlur",
  });

  const onSubmitHandler: SubmitHandler<FindIdFormValue | FindPwFormValue> = (
    data,
  ) => {
    console.log(JSON.stringify(data, null, 2));
    isFindId ? openModal(showIdModalData) : openModal(showPwModalData);
  };

  return (
    <Container>
      <FindOptions>
        <div
          className={isFindId ? "find-option active" : "find-option"}
          onClick={() => {
            setIsFindId(true);
            findIdForm.clearErrors("name");
            // findIdForm.clearErrors("phone");
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
            findPwForm.clearErrors("email");
            // findPwForm.clearErrors("phone");
            setModalDataState((prev) => {
              return { ...prev, title: "비밀번호 찾기" };
            });
          }}
        >
          <div>비밀번호 찾기</div>
        </div>
      </FindOptions>
      <Description>{description}</Description>
      <form
        onSubmit={
          isFindId
            ? findIdForm.handleSubmit(onSubmitHandler)
            : findPwForm.handleSubmit(onSubmitHandler)
        }
      >
        <div style={{ marginBottom: "10px" }}>
          {isFindId ? (
            <>
              {findIdForm.formState.errors.name ? (
                <div className="invalid">
                  {findIdForm.formState.errors.name.message}
                </div>
              ) : null}
              <BasicInput
                type="text"
                placeholder="이름"
                {...findIdForm.register("name")}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  findIdForm.setValue("name", e.target.value);
                }}
              />
            </>
          ) : (
            <>
              {findPwForm.formState.errors.email ? (
                <div className="invalid">
                  {findPwForm.formState.errors.email.message}
                </div>
              ) : null}
              <BasicInput
                type="text"
                placeholder="아이디"
                {...findPwForm.register("email")}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  findPwForm.setValue("email", e.target.value);
                }}
              />
            </>
          )}
        </div>{" "}
        <div style={{ marginBottom: "20px" }}>
          {findIdForm.formState.errors.phone ||
          findPwForm.formState.errors.phone ? (
            <div className="invalid">
              {findIdForm.formState.errors.phone
                ? findIdForm.formState.errors.phone.message
                : findPwForm.formState.errors.phone!.message}
            </div>
          ) : null}
          <BasicInput
            type="tel"
            placeholder="연락처"
            {...(isFindId
              ? findIdForm.register("phone")
              : findPwForm.register("phone"))}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              findIdForm.setValue("phone", e.target.value);
              findPwForm.setValue("phone", e.target.value);
            }}
          />
        </div>
        <BasicBtn type="submit" value="Submit">
          {isFindId ? "아이디 찾기" : "비밀번호 찾기"}
        </BasicBtn>
      </form>
    </Container>
  );
};

const Container = styled.div`
  font-size: 18px;
  line-height: 140%;
  letter-spacing: -0.02em;
  font-style: normal;

  .warning {
    border: 1px solid #dc3545;
  }
  .invalid {
    width: 100%;
    padding-bottom: 0.4rem;
    font-size: 16px;
    font-weight: bold;
    color: #dc3545;
  }

  @media (max-width: 850px) {
    .invalid {
      font-size: 16px;
    }
    font-size: 16px;
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

const Description = styled.div`
  margin-top: 26px;
  margin-bottom: 20px;
  font-weight: 300;
  word-break: keep-all;
  color: rgba(98, 98, 98, 0.78);
  line-height: 140%;
  font-size: 18px;

  @media (max-width: 850px) {
    font-size: 15px;
  }
`;

export default FindIdPasswordModal;
