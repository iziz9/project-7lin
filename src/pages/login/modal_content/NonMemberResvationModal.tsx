import React from "react";
import { BasicBtn } from "../../../commons/Button";
import { BasicInput } from "../../../commons/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { NonMemberFormValue } from "../../../@types/data";
import styled from "styled-components";

const NonMemberResvationModal = () => {
  const validationSchema = Yup.object().shape({
    orderNum: Yup.string().required("주문번호를 입력해주세요!").trim(),
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
  } = useForm<NonMemberFormValue>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  const onSubmitHandler: SubmitHandler<NonMemberFormValue> = (data) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <NonMemberLoginForm onSubmit={handleSubmit(onSubmitHandler)}>
      <div style={{ marginBottom: "10px" }}>
        {errors.orderNum ? (
          <div className="invalid">{errors.orderNum?.message}</div>
        ) : null}
        <BasicInput
          className={errors.orderNum ? "warning" : ""}
          type="text"
          placeholder="주문번호"
          {...register("orderNum")}
        />
      </div>{" "}
      <div style={{ marginBottom: "20px" }}>
        {errors.phone ? (
          <div className="invalid">{errors.phone?.message}</div>
        ) : null}
        <BasicInput
          className={errors.phone ? "warning" : ""}
          type="tel"
          placeholder="연락처"
          {...register("phone")}
        />
      </div>
      <BasicBtn type="submit" value="Submit">
        로그인
      </BasicBtn>
    </NonMemberLoginForm>
  );
};

const NonMemberLoginForm = styled.form`
  .warning {
    border: 1px solid #dc3545;
  }
  .invalid {
    width: 100%;
    padding-bottom: 0.8rem;
    font-size: 18px;
    font-weight: bold;
    color: #dc3545;
    @media (max-width: 850px) {
      font-size: 16px;
    }
  }
`;

export default NonMemberResvationModal;
