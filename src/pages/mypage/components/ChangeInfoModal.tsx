import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BasicBtn } from "../../../commons/Button";
import { BasicInput } from "../../../commons/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ChangeInfoFormValue, UpdateMemberRequest } from "../../../@types/data";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../store/userInfoAtom";
import { useMutation } from "react-query";
import { phoneCheck, updateMemberInfo } from "../../../apis/auth";
import { useModal } from "../../../hooks/useModal";
import useUserInfoQuery from "../../../hooks/useUserInfoQuery";

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
    getValues,
    setError,
    clearErrors,
    setFocus,
    formState: { errors },
  } = useForm<ChangeInfoFormValue>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  const onSubmitHandler: SubmitHandler<ChangeInfoFormValue> = (data) => {
    console.log(JSON.stringify(data, null, 2));
    if (!isCheckPhoneDuplicate) {
      alert("전화번호 중복검사를 해주세요!");
      setFocus("phone");
      return;
    }

    if (isPhoneDuplicate) {
      alert("이미 존재하는 전화번호입니다!");
      setFocus("phone");
      return;
    }

    if (confirm("정말로 정보를 수정하시겠습니까?")) {
      const updateMemberPayload: UpdateMemberRequest = {
        newPassword: data.password,
        validNewPassword: data.confirmPassword,
        phone: data.phone,
      };
      updateMembreInfoMutation.mutateAsync(updateMemberPayload);
    }
  };

  const { closeModal } = useModal();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const { userInfoData, refetch: userInfoRefetch } = useUserInfoQuery({
    onSuccess(res) {
      setUserInfo(res.data);
    },
    onError(error) {
      alert("회원정보 조회 실패: " + error);
    },
    enabled: false,
  });

  const updateMembreInfoMutation = useMutation(updateMemberInfo, {
    onSuccess: async (res: any) => {
      if (res.message === "회원정보 수정에 성공했습니다") {
        await userInfoRefetch();
        alert("회원정보 수정 성공");
        closeModal();
      }
    },
    onError: (error) => {
      alert("회원정보 수정 실패: " + error);
    },
  });

  const [isCheckPhoneDuplicate, setIsCheckPhoneDuplicate] =
    useState<boolean>(true);
  const [isPhoneDuplicate, setIsPhoneDuplicate] = useState<boolean>(false);

  const checkPhoneDuplicate = async () => {
    setIsCheckPhoneDuplicate(true);
    const { phone } = getValues();
    if (phone === userInfo.phone) return;

    if (errors.phone || !phone) {
      alert("전화번호를 제데로 입력해주세요");
      return;
    }

    try {
      const data = await phoneCheck(phone);
      setIsPhoneDuplicate(data);

      if (data === true) {
        clearErrors("phone");
        setError("phone", { message: "이미 존재하는 전화번호입니다!" });
        alert("이미 존재하는 전화번호입니다!");
        return;
      } else {
        clearErrors("phone");
      }
    } catch (e) {
      alert("전화번호 중복검사 실패");
      setIsCheckPhoneDuplicate(false);
    }
  };

  const [phone, setPhone] = useState<string>(userInfo.phone);

  useEffect(() => {
    if (userInfo.phone === phone) {
      setIsCheckPhoneDuplicate(true);
      setIsPhoneDuplicate(false);
      return;
    }
    setIsCheckPhoneDuplicate(false);
    if (!isPhoneDuplicate) {
      setIsPhoneDuplicate(true);
      clearErrors(["password", "confirmPassword", "phone"]);
    }
  }, [phone]);

  // if (updateMembreInfoMutation.isLoading) return <div>회원정보 수정 중</div>;

  return (
    <Container>
      <div className="profile">
        <div className="img-wrapper">
          <img src="/default_profile.png" />
        </div>
        <div>일반 회원, {userInfo.name}</div>
      </div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <section>
          <div>
            <BasicInput
              className="disabled"
              type="text"
              disabled
              value={userInfo.email}
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
                placeholder="새로운 비밀번호 확인"
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
            {isPhoneDuplicate ||
            !isCheckPhoneDuplicate ||
            errors.phone ? null : (
              <div className="valid">사용 가능한 전화번호입니다!</div>
            )}
            <div className="phone-area">
              <div className="phone-input">
                <BasicInput
                  className={errors.phone ? "warning" : ""}
                  type="tel"
                  defaultValue={userInfo.phone}
                  {...register("phone", {
                    onChange: (e) => setPhone(e.target.value),
                  })}
                />
              </div>
              <div className="btn-wrapper" onClick={checkPhoneDuplicate}>
                <BasicBtn
                  type="button"
                  style={{ height: "49px" }}
                  // disabled={isIdDuplicate ? true : false}
                >
                  중복확인
                </BasicBtn>
              </div>
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

      .phone-area {
        display: flex;
        gap: 10px;

        .phone-input {
          width: 85%;
        }
      }
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

  .valid {
    width: 100%;
    /* padding: 0.8rem 0; */
    font-size: 16px;
    font-weight: bold;
    color: #0d99ff;
  }
`;

export default ChangeInfoModal;
