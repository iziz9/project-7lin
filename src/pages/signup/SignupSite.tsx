import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styled from "styled-components";
import { BasicBtn } from "../../commons/Button";
import { BasicInput } from "../../commons/Input";
import { BasicSelect } from "../../commons/Select";
import { SignupFormValue } from "../../@types/data";

const SignupSite = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("이메일을 입력해주세요!")
      .trim()
      .matches(
        /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
        "이메일 형식이 올바르지 않습니다!",
      ),
    // confirmEmail: Yup.string().required("hi"),
    password: Yup.string()
      .required("비밀번호를 입력해주세요!")
      .trim()
      .min(8, "비밀번호는 8 ~ 16자 길이여야 합니다!")
      .max(16, "비밀번호는 8 ~ 16자 길이여야 합니다!"),
    confirmPassword: Yup.string()
      .required("비밀번호 확인을 해주세요!")
      .trim()
      .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다!"),
    name: Yup.string().required("이름을 입력해주세요!").trim(),
    phone: Yup.string()
      .required("전화번호를 입력해주세요!")
      .trim()
      .matches(
        /^\d{2,3}-?\d{3,4}-?\d{4}$/,
        "전화번호 형식이 올바르지 않습니다!",
      ),
    year: Yup.string()
      .required("생년월일을 선택해주세요!")
      .min(2, "생년월일을 선택해주세요!"),
    month: Yup.string()
      .required("생년월일을 선택해주세요!")
      .min(2, "생년월일을 선택해주세요!"),
    day: Yup.string()
      .required("생년월일을 선택해주세요!")
      .min(2, "생년월일을 선택해주세요!"),
    gender: Yup.string().required("성별을 선택해주세요!"),
    acceptTerms: Yup.bool().oneOf([true], "약관에 동의해주세요!"),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignupFormValue>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  const [date, setDate] = useState({
    year: "0",
    month: "0",
    day: "0",
  });

  const now = new Date();
  let years = [];
  for (let y = now.getFullYear(); y >= 1930; y -= 1) {
    years.push(y);
  }

  let month = [];
  for (let m = 1; m <= 12; m += 1) {
    if (m < 10) {
      month.push("0" + m.toString());
    } else {
      month.push(m.toString());
    }
  }

  let days = [];
  let getDate = new Date(Number(date.year), Number(date.month), 0).getDate();
  for (let d = 1; d <= getDate; d += 1) {
    if (d < 10) {
      days.push("0" + d.toString());
    } else {
      days.push(d.toString());
    }
  }

  const [terms, setTerms] = useState<string[]>([]);

  const checkAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setTerms(["age", "service", "personal"]) : setTerms([]);
  };

  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? setTerms([...terms, e.target.name])
      : setTerms(terms.filter((term) => term !== e.target.name));
  };

  const resetForm = () => {
    reset();
    setTerms([]);
    setDate({
      year: "0",
      month: "0",
      day: "0",
    });
  };

  const onSubmitHandler: SubmitHandler<SignupFormValue> = (data) => {
    console.log(JSON.stringify(data, null, 2));
  };

  useEffect(() => {
    if (terms.length === 3) {
      setValue("acceptTerms", true);
      clearErrors("acceptTerms");
    } else {
      setValue("acceptTerms", false);
      // setError("acceptTerms", { message: errors.acceptTerms?.message });
    }
  }, [terms]);

  return (
    <Container>
      <div className="wrapper">
        <div className="title">회원가입</div>
        <LoginForm onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="id-pw">
            {errors.email ? (
              <div className="invalid">{errors.email?.message}</div>
            ) : null}
            <div className="id-area">
              <div className="input_form id">
                <BasicInput
                  type="text"
                  placeholder="이메일"
                  className={errors.email ? "warning" : ""}
                  {...register("email")}
                />
              </div>
              <div className="btn-wrapper">
                <BasicBtn
                  type="button"
                  style={{ height: "49px" }}
                  {...register("confirmEmail")}
                >
                  중복확인
                </BasicBtn>
              </div>
            </div>
            <div className="input_form password">
              {errors.password ? (
                <div className="invalid">{errors.password?.message}</div>
              ) : null}
              <BasicInput
                className={errors.password ? "warning" : ""}
                type="password"
                placeholder="비밀번호 (8 ~ 16자)"
                {...register("password")}
              />
            </div>
            <div className="input_form password-check">
              {errors.confirmPassword ? (
                <div className="invalid">{errors.confirmPassword?.message}</div>
              ) : null}
              <BasicInput
                className={errors.confirmPassword ? "warning" : ""}
                type="password"
                placeholder="비밀번호 확인"
                {...register("confirmPassword")}
              />
            </div>
          </div>

          <section>
            <div className="sub-title">
              이름 &nbsp;&nbsp;
              {errors.name ? (
                <span className="invalid">{errors.name?.message}</span>
              ) : null}
            </div>
            <div>
              <BasicInput
                className={errors.name ? "warning" : ""}
                type="text"
                placeholder="이름을 입력하세요."
                {...register("name")}
              />
            </div>
          </section>

          <section>
            <div className="sub-title">
              전화번호 &nbsp;&nbsp;
              {errors.phone ? (
                <span className="invalid">{errors.phone?.message}</span>
              ) : null}
            </div>
            <div>
              <BasicInput
                className={errors.phone ? "warning" : ""}
                type="text"
                placeholder="전화번호를 입력하세요."
                {...register("phone")}
              />
            </div>
          </section>

          <section>
            <div className="sub-title">
              생년월일 &nbsp;&nbsp;
              {errors.year || errors.month || errors.day ? (
                <span className="invalid">생년월일을 선택해주세요!</span>
              ) : null}
            </div>
            <div className="check-birth">
              <BasicSelect
                className={errors.year ? "warning" : ""}
                {...register("year", {
                  onChange: (e) => setDate({ ...date, year: e.target.value }),
                })}
                value={date.year}
              >
                <option value="0">년도</option>
                {years.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </BasicSelect>
              <BasicSelect
                className={errors.month ? "warning" : ""}
                {...register("month", {
                  onChange: (e) => setDate({ ...date, month: e.target.value }),
                })}
                value={date.month}
              >
                <option value="0">월</option>
                {month.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </BasicSelect>
              <BasicSelect
                className={errors.day ? "warning" : ""}
                {...register("day", {
                  onChange: (e) => setDate({ ...date, day: e.target.value }),
                })}
                value={date.day}
              >
                <option value="0">일</option>
                {days.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </BasicSelect>
            </div>
          </section>

          <section>
            <div className="sub-title">
              성별 &nbsp;&nbsp;
              {errors.gender ? (
                <span className="invalid">{errors.gender?.message}</span>
              ) : null}
            </div>
            <div className="label-wrapper">
              <label>
                <input type="radio" value="FEMALE" {...register("gender")} />
                여성
              </label>
              <label>
                <input type="radio" value="MALE" {...register("gender")} />
                남성
              </label>
            </div>
          </section>

          <section>
            <div className="sub-title">
              약관동의 &nbsp;&nbsp;
              {errors.acceptTerms ? (
                <span className="invalid">{errors.acceptTerms?.message}</span>
              ) : null}
            </div>
            <div
              className={
                errors.acceptTerms ? "agree-wrapper warning" : "agree-wrapper"
              }
            >
              <div className="agree">
                <div className="box all">
                  <label>
                    <input
                      type="checkbox"
                      checked={terms.length === 3 ? true : false}
                      {...register("acceptTerms")}
                      onChange={checkAll}
                    />
                    전체 동의
                  </label>
                </div>
                <div className="box essential">
                  <label>
                    <input
                      type="checkbox"
                      name="age"
                      checked={terms.includes("age") ? true : false}
                      onChange={check}
                    />
                    <span>(필수) </span> 만 15세 이상입니다.
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="service"
                      checked={terms.includes("service") ? true : false}
                      onChange={check}
                    />
                    <span>(필수)</span> 서비스 이용약관 동의
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="personal"
                      checked={terms.includes("personal") ? true : false}
                      onChange={check}
                    />
                    <span>(필수)</span> 개인정보 수집 및 이용 동의
                  </label>
                </div>
              </div>
            </div>
          </section>

          <div className="btn-wrapper">
            <BasicBtn type="submit">가입하기</BasicBtn>
          </div>
        </LoginForm>
        <div className="btn-wrapper">
          <BasicBtn
            backgroundColor="#8692A5"
            fontColor="#fff"
            onClick={resetForm}
          >
            초기화하기
          </BasicBtn>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  margin-top: 60px;
  margin-top: 2rem;
  margin-bottom: "90px";
  /* background: #fafafa; */
  width: 100%;
  min-width: 328px;
  font-size: 18px;
  letter-spacing: -0.02em;
  .wrapper {
    max-width: 400px;
    /* padding: 155px 0; */
    padding: 50px 0;
    margin: 0 auto;
  }
  .title {
    font-weight: bold;
    font-size: 30px;
    color: #5b5b5b;
    margin-bottom: 55px;
    text-align: center;
  }
  .sub-title {
    font-weight: bold;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.8);
    /* margin-bottom: 20px; */
    margin-bottom: 10px;
    /* span{
      margin-right: 8px;
    } */
  }
  .btn-wrapper {
    margin-bottom: 20px;
  }
  .warning {
    border: 1px solid #dc3545;
  }

  section {
    /* margin-bottom: 42px; */
    margin-bottom: 40px;
    .check-birth {
      display: flex;
      justify-content: space-between;
      gap: 30px;
    }
    .agree-wrapper {
      border: 1px solid #000;
      &.warning {
        border: 1px solid #dc3545;
      }
      .agree {
        max-width: 700px;
        padding: 0 25px;
        margin: 0 auto;
        .box {
          display: flex;
          flex-direction: column;
          gap: 15px;
          border-bottom: 0.3px solid #000;
          padding: 30px 0;
          &.essential {
            border: none;
            span {
              color: red;
            }
          }
          label {
            display: flex;
            align-items: center;
            gap: 15px;
            width: fit-content;
            input {
              margin: 0;
              width: 25px;
              height: 25px;
            }
          }
        }
      }
    }
  }

  .invalid {
    width: 100%;
    padding: 0.8rem 0;
    font-size: 18px;
    font-weight: bold;
    color: #dc3545;
  }

  @media (max-width: 850px) {
    margin-top: 35px;
    margin-bottom: 0;
    font-size: 16px;
    width: 80%;
    .wrapper {
      padding: 0 20px;
    }
    .title {
      font-size: 20px;
      margin-bottom: 37px;
    }
    .sub-title {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .btn-wrapper {
      margin-bottom: 10px;
    }
    .invalid {
      font-size: 16px;
    }
    section {
      margin-bottom: 20px;
      .check-birth {
        gap: 20px;
      }
      .agree-wrapper {
        .agree {
          padding: 8px 25px;
          .box {
            padding: 16px 0;
            &.essential {
              span {
                color: red;
              }
            }
            &.option {
              border: none;
              span {
                color: #757575;
              }
            }
            label {
              gap: 8px;
              input {
                width: 15px;
                height: 15px;
              }
            }
          }
        }
      }
    }
  }
`;

const LoginForm = styled.form`
  .id-pw {
    /* margin-bottom: 72px; */
    margin-bottom: 40px;
    .id-area {
      display: flex;
      gap: 15px;
      .input_form {
        width: 70%;
      }
      .btn-wrapper {
        flex-grow: 1;
      }
    }
    .input_form {
      margin-bottom: 14px;
      &.password-check {
        margin-bottom: 0px;
      }
    }
    @media (max-width: 850px) {
      margin-bottom: 40px;
    }
  }
  .label-wrapper {
    display: flex;
    gap: 150px;
    label {
      /* margin: 44px 0; */
      display: flex;
      align-items: center;
      cursor: pointer;
      input {
        display: inline-block;
        width: 25px;
        height: 25px;
        margin-right: 15px;
        @media (max-width: 850px) {
          width: 20px;
          height: 20px;
        }
      }
      @media (max-width: 850px) {
        /* margin: 22px 0; */
      }
    }
    @media (max-width: 850px) {
      gap: 34px;
    }
  }
`;

export default SignupSite;
