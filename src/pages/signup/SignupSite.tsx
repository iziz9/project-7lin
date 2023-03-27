import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BasicBtn } from "../../commons/Button";
import { BasicInput } from "../../commons/Input";
import { BasicSelect } from "../../commons/Select";

const SignupSite = () => {
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    console.log(terms);
  }, [terms]);

  return (
    <Container>
      <div className="wrapper">
        <div className="title">회원가입</div>
        <LoginForm onSubmit={handleSubmit}>
          <div className="id-pw">
            <div className="id-area">
              <div className="input_form id">
                <BasicInput type="text" placeholder="이메일" />
              </div>
              <div className="btn-wrapper">
                <BasicBtn style={{ height: "49px" }}>중복확인</BasicBtn>
              </div>
            </div>
            <div className="input_form password">
              <BasicInput type="password" placeholder="비밀번호" />
            </div>
            <div className="input_form password-check">
              <BasicInput type="password" placeholder="비밀번호 확인" />
            </div>
          </div>

          <section>
            <div className="sub-title">이름</div>
            <div>
              <BasicInput type="text" placeholder="이름을 입력하세요." />
            </div>
          </section>

          <section>
            <div className="sub-title">전화번호</div>
            <div>
              <BasicInput type="text" placeholder="전화번호를 입력하세요." />
            </div>
          </section>

          <section>
            <div className="sub-title">생년월일</div>
            <div className="check-birth">
              <BasicSelect
                name="year"
                value={date.year}
                onChange={(e) => setDate({ ...date, year: e.target.value })}
              >
                <option value="0">년도</option>
                {years.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </BasicSelect>
              <BasicSelect
                name="month"
                value={date.month}
                onChange={(e) => setDate({ ...date, month: e.target.value })}
              >
                <option value="0">월</option>
                {month.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </BasicSelect>
              <BasicSelect
                name="day"
                value={date.day}
                onChange={(e) => setDate({ ...date, day: e.target.value })}
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
            <div className="sub-title">성별</div>
            <div className="label-wrapper">
              <label>
                <input type="radio" name="jender" />
                여성
              </label>
              <label>
                <input type="radio" name="jender" />
                남성
              </label>
            </div>
          </section>

          <section>
            <div className="sub-title">약관동의</div>
            <div className="agree-wrapper">
              <div className="agree">
                <div className="box all">
                  <label>
                    <input
                      type="checkbox"
                      name="all"
                      checked={terms.length === 3 ? true : false}
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
          <BasicBtn backgroundColor="#8692A5" fontColor="#fff">
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
  background: #fafafa;
  width: 100%;
  min-width: 328px;
  font-size: 23px;
  letter-spacing: -0.02em;
  .wrapper {
    max-width: 700px;
    padding: 155px 0;
    margin: 0 auto;
  }
  .title {
    font-weight: bold;
    font-size: 30px;
    color: #5b5b5b;
    margin-bottom: 55px;
  }
  .sub-title {
    font-weight: bold;
    font-size: 25px;
    color: rgba(0, 0, 0, 0.8);
    margin-bottom: 27px;
  }
  .btn-wrapper {
    margin-bottom: 20px;
  }

  section {
    margin-bottom: 42px;
    .check-birth {
      display: flex;
      justify-content: space-between;
      gap: 50px;
    }
    .agree-wrapper {
      border: 1px solid #000;
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
              width: 30px;
              height: 30px;
            }
          }
        }
      }
    }
  }

  @media (max-width: 870px) {
    margin-top: 35px;
    margin-bottom: 0;
    font-size: 16px;
    width: 80%;
    .wrapper {
      padding: 50px 40px;
    }
    .title {
      font-size: 20px;
      margin-bottom: 37px;
    }
    .sub-title {
      font-size: 20px;
      margin-bottom: 20px;
    }
    .btn-wrapper {
      margin-bottom: 10px;
    }
    section {
      margin-bottom: 20px;
      .check-birth {
        gap: 20px;
      }
      .agree-wrapper {
        font-size: 11px;
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
    margin-bottom: 72px;
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
    @media (max-width: 560px) {
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
        @media (max-width: 560px) {
          width: 20px;
          height: 20px;
        }
      }
      @media (max-width: 560px) {
        /* margin: 22px 0; */
      }
    }
    @media (max-width: 560px) {
      gap: 34px;
    }
  }
`;

export default SignupSite;
