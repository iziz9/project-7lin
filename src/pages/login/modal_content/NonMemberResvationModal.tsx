import React from "react";
import { BasicBtn } from "../../../commons/Button";
import { BasicInput } from "../../../commons/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { NonMemberFormValue } from "../../../@types/data";
import styled from "styled-components";
import { useMutation } from "react-query";
import { getNonMemberReservation } from "../../../apis/auth";
import ReservationDetailModal from "../../mypage/components/ReservationDetailModal";
import { useModal } from "../../../hooks/useModal";

const NonMemberResvationModal = () => {
  const validationSchema = Yup.object().shape({
    reservationCode: Yup.string().required("주문번호를 입력해주세요!").trim(),
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

  const { openModal } = useModal();

  const nonMemberReservationMutation = useMutation(getNonMemberReservation, {
    onSuccess: (res) => {
      if (res.message === "성공") {
        const ReservationDetailModalData = {
          title: "예약내역 상세",
          content: (
            <ReservationDetailModal isMember={false} detailData={res.data} />
          ),
        };
        openModal(ReservationDetailModalData);
      }
    },
    onError: (error) => {
      alert("비회원 예약조회 실패: " + error);
    },
  });

  const onSubmitHandler: SubmitHandler<NonMemberFormValue> = (data) => {
    const phone = data.phone.replaceAll("-", "");

    const payload: NonMemberFormValue = {
      reservationCode: data.reservationCode,
      phone: phone,
    };
    nonMemberReservationMutation.mutate(payload);
  };

  return (
    <NonMemberLoginForm onSubmit={handleSubmit(onSubmitHandler)}>
      <div style={{ marginBottom: "10px" }}>
        {errors.reservationCode ? (
          <div className="invalid">{errors.reservationCode?.message}</div>
        ) : null}
        <BasicInput
          className={errors.reservationCode ? "warning" : ""}
          type="text"
          placeholder="주문번호"
          {...register("reservationCode")}
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
