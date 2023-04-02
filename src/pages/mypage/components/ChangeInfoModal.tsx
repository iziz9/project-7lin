import React from "react";
import styled from "styled-components";
import { BasicBtn } from "../../../commons/Button";
import { BasicInput } from "../../../commons/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ChangeInfoFormValue } from "../../../@types/data";

const ChangeInfoModal = () => {
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("비밀번호를 입력해주세요!")
      .trim()
      .min(8, "비밀번호는 8 ~ 16자 길이여야 합니다!")
      .max(16, "비밀번호는 8 ~ 16자 길이여야 합니다!"),
    confirmPassword: Yup.string()
      .required("비밀번호 확인을 해주세요!")
      .trim()
      .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다!"),
    phone: Yup.string()
      .required("전화번호를 입력해주세요!")
      .trim()
      .matches(
        /^\d{2,3}-?\d{3,4}-?\d{4}$/,
        "전화번호 형식이 올바르지 않습니다!",
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeInfoFormValue>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  const onSubmitHandler: SubmitHandler<ChangeInfoFormValue> = (data) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <Container>
      <div className="profile">
        <div className="img-wrapper">
          <img src="/default_profile.png" />
        </div>
        <div>일반 회원, 7lin'</div>
      </div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <section>
          <div>
            <BasicInput
              className="disabled"
              type="text"
              disabled
              value="7lin'@gmail.com"
            />
          </div>
          <div className="error-wrapper">
            {errors.password ? (
              <span className="invalid">{errors.password?.message}</span>
            ) : null}
            <div>
              <BasicInput
                className={errors.password ? "warning" : ""}
                type="password"
                placeholder="새로운 비밀번호를 입력해주세요."
                {...register("password")}
              />
            </div>
          </div>
          <div className="error-wrapper">
            {errors.confirmPassword ? (
              <span className="invalid">{errors.confirmPassword?.message}</span>
            ) : null}
            <div>
              <BasicInput
                className={errors.confirmPassword ? "warning" : ""}
                type="password"
                placeholder="비밀번호 확인"
                {...register("confirmPassword")}
              />
            </div>
          </div>
        </section>
        <section>
          <div className="sub-title">연락처</div>
          <div className="error-wrapper">
            {errors.phone ? (
              <div className="invalid">{errors.phone?.message}</div>
            ) : null}
            <div>
              <BasicInput
                className={errors.phone ? "warning" : ""}
                type="tel"
                defaultValue="01012345678"
                {...register("phone")}
              />
            </div>
          </div>
        </section>
        <div className="btn-wrapper">
          <BasicBtn type="submit">변경하기</BasicBtn>
        </div>
      </form>
    </Container>
  );
};

const Container = styled.div`
  font-size: 18px;

  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    .img-wrapper {
      img {
        width: 85px;
        height: 85px;
        border-radius: 50%;
      }
    }
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;

    .error-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }

  .disabled {
    background-color: #f3f3f3;
  }

  .warning {
    border: 1px solid #dc3545;
  }

  .invalid {
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    color: #dc3545;

    /* @media (max-width: 850px) {
      font-size: 14px;
    } */
  }
`;

export default ChangeInfoModal;
