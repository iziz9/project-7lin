import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import Modal from "../../commons/Modal";
import { useModal } from "../../hooks/useModal";
import PaymentModal from "./PaymentModal";
import { PersonalData } from "../../commons/Terms";
import { useLocation } from "react-router";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../store/userInfoAtom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import NonMemberResvationModal from "../login/modal_content/NonMemberResvationModal";
import { useMutation, useQueryClient } from "react-query";
import { addReservation } from "../../apis/auth";
import { getCookie } from "../../utils/cookie";
import { AddReservationRequest, ReservationUserInfo } from "../../@types/data";
import * as Yup from "yup";

interface OptionsType {
  optionId: number;
  amount: number;
  content?: string;
  price?: number;
}

const Reservation = () => {
  const { state } = useLocation();
  const [savedUserInfo, setSavedUserInfo] = useRecoilState(userInfoState);
  const [recievedNumber, setRecievedNumber] = useState(0);
  const isMobile: boolean = useMediaQuery({
    query: "(max-width:850px)",
  });
  const { openModal } = useModal();

  const queryClient = useQueryClient();
  const addReservationMutation = useMutation(addReservation, {
    onSuccess: (res: any) => {
      if (res.message === "성공") {
        console.log(res);
        const reservationNumber = res.data.match(/\d+/)![0];
        const token = getCookie("accessToken");
        alert("예약추가 성공");
        if (token)
          return queryClient.invalidateQueries({
            queryKey: ["memberReservation"],
          });
      }
    },
    onError: (error) => {
      alert("예약추가 실패: " + error);
    },
  });

  const {
    name: memberName,
    phone: memberPhone,
    email: memberEmail,
  } = savedUserInfo;
  const { periods, totalPrice, options } = state;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("이름을 입력해주세요!").trim(),
    phone: Yup.string()
      .required("전화번호를 입력해주세요!")
      .trim()
      .matches(
        /^\d{2,3}-?\d{3,4}-?\d{4}$/,
        "전화번호 형식이 올바르지 않습니다!",
      ),
    email: Yup.string()
      .required("이메일을 입력해주세요!")
      .trim()
      .matches(
        /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
        "이메일 형식이 올바르지 않습니다!",
      ),
    acceptTerms: Yup.bool().oneOf([true], "전체 약관에 동의해주세요!"),
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    setFocus,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ReservationUserInfo>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  const PaymentModalData = {
    title: "입금 계좌 안내",
    content: <PaymentModal reservationNumber={12345} />,
  };
  const TermsModalData = {
    title: "개인정보 수집 및 이용",
    content: <PersonalData />,
  };

  const [terms, setTerms] = useState<string[]>([]);
  const checkAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setTerms(["agree1", "agree2"]) : setTerms([]);
  };
  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? setTerms([...terms, e.target.name])
      : setTerms(terms.filter((term) => term !== e.target.name));
  };

  const onSubmitHandler = (data: any) => {
    const { name, phone, email } = data;

    let filteredOptions: OptionsType[] = [];
    options?.map((option: OptionsType) =>
      filteredOptions.push({
        optionId: option.optionId,
        amount: option.amount,
      }),
    );

    const payload: AddReservationRequest = {
      periods: [
        {
          periodId: periods.id,
          amount: periods.amount,
        },
      ],
      options: filteredOptions,
      name: name,
      phone: phone.replaceAll("-", ""),
      email: email,
      totalPrice: totalPrice,
      people: periods.amount,
    };

    addReservationMutation.mutateAsync(payload);

    openModal(PaymentModalData);
  };

  useEffect(() => {
    if (savedUserInfo.name != "") {
      setValue("name", savedUserInfo.name);
      setValue("email", savedUserInfo.email);
      setValue("phone", savedUserInfo.phone);
    }
  }, []);

  useEffect(() => {
    if (terms.length === 2) {
      setValue("acceptTerms", true);
      clearErrors("acceptTerms");
    } else {
      setValue("acceptTerms", false);
    }
  }, [terms]);

  return (
    <Container onSubmit={handleSubmit(onSubmitHandler)}>
      {isMobile ? (
        <>
          <h1>예약하기</h1>
          <ProductInfo>
            <h2>예약 상품 정보</h2>
            <div className="product">
              <div>
                <img src={state.image} alt="예약 상품 이미지" />
              </div>
              <div className="product-desc">
                <span className="title">{state.title}</span>
                <span className="price">{state.productPrice}원</span>
              </div>
            </div>
            <div className="options">
              <div className="back-gray">
                <h3 className="h3blue">필수</h3>
                <span>{`${state.periods.content} - ${state.periods.amount}개`}</span>
              </div>
              {state.options?.map((option: any) => (
                <div className="back-gray" key={option.optionId}>
                  <h3>추가</h3>
                  <span>{`${option.content} - ${option.amount}개`}</span>
                </div>
              ))}
            </div>
          </ProductInfo>
          <UserInfo>
            <h2>예약자 정보</h2>
            {savedUserInfo.name !== "" ? (
              <>
                <ul>
                  <li>
                    <h3>예약자 이름</h3>
                  </li>
                  <li>
                    {errors.name && (
                      <div className="error">{errors.name?.message}</div>
                    )}
                    <input
                      type="text"
                      placeholder="홍길동"
                      {...register("name")}
                      value={savedUserInfo.name}
                      disabled
                    />
                  </li>
                </ul>
                <ul>
                  <li>
                    <h3>휴대폰 번호</h3>
                  </li>
                  <li>
                    {errors.phone && (
                      <div className="error">{errors.phone?.message}</div>
                    )}
                    <input
                      type="text"
                      placeholder="01012345678"
                      {...register("phone")}
                      value={savedUserInfo.phone}
                      disabled
                    />
                  </li>
                </ul>
                <ul>
                  <li>
                    <h3>이메일 주소</h3>
                  </li>
                  <li>
                    {errors.email && (
                      <div className="error">{errors.email?.message}</div>
                    )}
                    <input
                      type="text"
                      placeholder="abc@abc.com"
                      {...register("email")}
                      value={savedUserInfo.email}
                      disabled
                    />
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul>
                  <li>
                    <h3>예약자 이름</h3>
                  </li>
                  <li>
                    {errors.name && (
                      <div className="error">{errors.name?.message}</div>
                    )}
                    <input
                      type="text"
                      placeholder="홍길동"
                      {...register("name")}
                    />
                  </li>
                </ul>
                <ul>
                  <li>
                    <h3>휴대폰 번호</h3>
                  </li>
                  <li>
                    {errors.phone && (
                      <div className="error">{errors.phone?.message}</div>
                    )}
                    <input
                      type="text"
                      placeholder="01012345678"
                      {...register("phone")}
                    />
                  </li>
                </ul>
                <ul>
                  <li>
                    <h3>이메일 주소</h3>
                  </li>
                  <li>
                    {errors.email && (
                      <div className="error">{errors.email?.message}</div>
                    )}
                    <input
                      type="text"
                      placeholder="abc@google.com"
                      {...register("email")}
                    />
                  </li>
                </ul>
              </>
            )}
          </UserInfo>
          <PaymentSelect>
            <h2>결제 수단</h2>
            <ul className="payment">
              <li>
                <input type="radio" id="payment2" checked readOnly />
                <label htmlFor="payment2">계좌 이체</label>
              </li>
              <li>
                <input type="radio" id="payment3" disabled readOnly />
                <label htmlFor="payment3">
                  <span>신용/체크카드</span>
                  <span className="red">⚠️ 서비스 준비중입니다.</span>
                </label>
              </li>
            </ul>
          </PaymentSelect>
          <PaymentInfo>
            <h2>결제 정보</h2>
            <ul>
              <li>
                <h3>총 상품 수</h3>
              </li>
              <li>{state.periods.amount}개</li>
            </ul>
            <ul>
              <li>
                <h3>총 인원</h3>
              </li>
              <li>{state.periods.amount}인</li>
            </ul>
            <ul className="margin-border">
              <li>
                <h3>상품 금액</h3>
              </li>
              {/* <li>{state[0].price}</li> 여기도 수정해야됩니다 */}
            </ul>
            <div className="total">
              <h3>총 예약 금액</h3>
              <span className="price">
                {state.totalPrice.toLocaleString()}원
              </span>
            </div>
          </PaymentInfo>
          <CheckTerms>
            <h2>약관 동의</h2>
            <div className="all-agree">
              <input
                type="checkbox"
                id="all"
                checked={terms.length === 2 ? true : false}
                {...register("acceptTerms", { onChange: checkAll })}
              />
              <label htmlFor="all">전체동의</label>
              {errors.acceptTerms ? (
                <span className="invalid">{errors.acceptTerms?.message}</span>
              ) : null}
            </div>
            <div>
              <input
                type="checkbox"
                id="agree1"
                name="agree1"
                checked={terms.includes("agree1") ? true : false}
                onChange={check}
              />
              <label htmlFor="agree1">
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    openModal(TermsModalData);
                  }}
                >
                  개인정보 수집 및 이용{" "}
                </span>
                동의
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="agree2"
                name="agree2"
                checked={terms.includes("agree2") ? true : false}
                onChange={check}
              />
              <label htmlFor="agree2">예약조건 확인 및 결제진행에 동의</label>
            </div>
          </CheckTerms>
          <button type="submit" className="submit">
            예약하기
          </button>
        </>
      ) : (
        <>
          <div className="title-box">
            <h1>결제하기</h1>
            <div className="breadcrum">
              <span>장바구니</span>
              <span>＞</span>
              <span className="bold">결제하기</span>
              <span>＞</span>
              <span>완료</span>
            </div>
          </div>
          <div className="pc-container">
            <div className="pc-col left">
              <ProductInfo>
                <h2>예약 상품 정보</h2>
                <div className="product">
                  <div>
                    <img src={state.image} alt="예약 상품 이미지" />
                  </div>
                  <div className="product-desc">
                    <span className="title">{state.title}</span>
                    {/* <span className="price">{state[0].price}원</span> 여기가 바로 수정해야하는 그곳입니다 */}
                  </div>
                </div>
                <div className="options">
                  <div className="back-gray">
                    <h3 className="h3blue">필수</h3>
                    <span>{`${state.periods.content} - ${state.periods.amount}개`}</span>
                  </div>
                  {state.options?.map((option: any) => (
                    <div className="back-gray" key={option.optionId}>
                      <h3>추가</h3>
                      <span>{`${option.content} - ${option.amount}개`}</span>
                    </div>
                  ))}
                </div>
              </ProductInfo>
              <UserInfo>
                <h2>예약자 정보</h2>
                {savedUserInfo.name !== "" ? (
                  <>
                    <ul>
                      <li>
                        <h3>예약자 이름</h3>
                      </li>
                      <li>
                        {errors.name && (
                          <div className="error">{errors.name?.message}</div>
                        )}
                        <input
                          type="text"
                          placeholder="홍길동"
                          {...register("name")}
                          value={savedUserInfo.name}
                          disabled
                        />
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <h3>휴대폰 번호</h3>
                      </li>
                      <li>
                        {errors.phone && (
                          <div className="error">{errors.phone?.message}</div>
                        )}
                        <input
                          type="text"
                          placeholder="01012345678"
                          {...register("phone")}
                          value={savedUserInfo.phone}
                          disabled
                        />
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <h3>이메일 주소</h3>
                      </li>
                      <li>
                        {errors.email && (
                          <div className="error">{errors.email?.message}</div>
                        )}
                        <input
                          type="text"
                          placeholder="abc@abc.com"
                          {...register("email")}
                          value={savedUserInfo.email}
                          disabled
                        />
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <ul>
                      <li>
                        <h3>예약자 이름</h3>
                      </li>
                      <li>
                        {errors.name && (
                          <div className="error">{errors.name?.message}</div>
                        )}
                        <input
                          type="text"
                          placeholder="홍길동"
                          {...register("name")}
                        />
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <h3>휴대폰 번호</h3>
                      </li>
                      <li>
                        {errors.phone && (
                          <div className="error">{errors.phone?.message}</div>
                        )}
                        <input
                          type="text"
                          placeholder="01012345678"
                          {...register("phone")}
                        />
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <h3>이메일 주소</h3>
                      </li>
                      <li>
                        {errors.email && (
                          <div className="error">{errors.email?.message}</div>
                        )}
                        <input
                          type="text"
                          placeholder="abc@google.com"
                          {...register("email")}
                        />
                      </li>
                    </ul>
                  </>
                )}
              </UserInfo>
              <PaymentSelect>
                <h2>결제 수단</h2>
                <ul className="payment">
                  <li>
                    <input
                      type="radio"
                      id="payment2"
                      name="payment"
                      checked
                      readOnly
                    />
                    <label htmlFor="payment2">계좌 이체</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="payment3"
                      name="payment"
                      disabled
                      readOnly
                    />
                    <label htmlFor="payment3">
                      <span>신용/체크카드</span>
                      <span className="red">⚠️ 서비스 준비중입니다.</span>
                    </label>
                  </li>
                </ul>
              </PaymentSelect>
            </div>
            <div className="pc-col right">
              <PaymentInfo>
                <h2>결제 정보</h2>
                <ul>
                  <li>
                    <h3>총 상품 수</h3>
                  </li>
                  <li>1개</li>
                </ul>
                <ul>
                  <li>
                    <h3>총 인원</h3>
                  </li>
                  <li>{state.periods.amount}인</li>
                </ul>
                <ul className="margin-border">
                  <li>
                    <h3>상품 금액</h3>
                  </li>
                  <li>{state.productPrice}인</li>
                </ul>
                <div className="total">
                  <h3>총 예약 금액</h3>
                  <span className="price">
                    {state.totalPrice.toLocaleString()}원
                  </span>
                </div>
              </PaymentInfo>
              <CheckTerms>
                <h2>약관 동의</h2>
                <div className="all-agree">
                  <input
                    type="checkbox"
                    id="all"
                    checked={terms.length === 2 ? true : false}
                    {...register("acceptTerms")}
                    onChange={checkAll}
                  />
                  <label htmlFor="all">전체동의</label>
                  {errors.acceptTerms && (
                    <span className="invalid">
                      {errors.acceptTerms?.message}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="agree1"
                    name="agree1"
                    checked={terms.includes("agree1") ? true : false}
                    onChange={check}
                  />
                  <label htmlFor="agree1">
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        openModal(TermsModalData);
                      }}
                    >
                      개인정보 수집 및 이용{" "}
                    </span>
                    동의
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="agree2"
                    name="agree2"
                    checked={terms.includes("agree2") ? true : false}
                    onChange={check}
                  />
                  <label htmlFor="agree2">
                    예약조건 확인 및 결제진행에 동의
                  </label>
                </div>
              </CheckTerms>
              <button type="submit" className="submit">
                예약하기
              </button>
            </div>
          </div>
        </>
      )}
      <Modal />
    </Container>
  );
};

const Container = styled.form`
  height: 100%;
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  word-break: keep-all;

  .error {
    font-size: 12px;
    color: red;
    padding-bottom: 10px;
  }

  h1 {
    font-size: 20px;
    font-weight: bold;
  }

  h2 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  h3 {
    font-size: 14px;
    font-weight: 400;
    color: var(--color-grayscale40);
  }

  section {
    width: 100%;
    background-color: var(--color-grayscale10);
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 8px;
    padding: 16px;
    box-sizing: border-box;
  }

  ul {
    display: flex;
    gap: 20px;
    font-size: 14px;
    align-items: center;

    input[type="text"] {
      width: 100%;
      align-items: center;
      border: none;
      border-radius: 8px;
      padding: 10px;
      font-size: 14px;

      :focus {
        outline: none;
      }

      ::placeholder {
        color: var(--color-grayscale30);
      }

      :disabled {
        background-color: white;
      }
    }
  }

  .payment {
    align-items: start;
  }

  .submit {
    width: 100%;
    height: 58px;
    background-color: var(--color-blue);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 8px;
  }

  @media (min-width: 851px) {
    padding: 32px 0px 0;
    /* padding: 32px 20px 0; */

    .error {
      font-size: 14px;
    }

    h1 {
      font-size: 30px;
    }

    h2 {
      font-size: 26px;
      margin-bottom: 26px;
    }

    h3 {
      font-size: 18px;
    }

    section {
      padding: 30px;
    }

    ul {
      gap: 20px;
      input[type="text"] {
        font-size: 16px;
      }
    }

    .title-box {
      display: flex;
      justify-content: space-between;

      .breadcrum {
        display: flex;
        gap: 10px;
        color: var(--color-grayscale40);

        .bold {
          color: black;
          font-weight: bold;
        }
      }
    }

    .pc-container {
      display: flex;
      justify-content: space-between;

      .pc-col {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .left {
        width: 65%;
      }

      .right {
        width: 33%;
      }
    }

    .submit {
      font-size: 23px;
    }
  }
`;

const ProductInfo = styled.section`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;

  .product {
    display: flex;
    gap: 20px;

    img {
      width: 70px;
      height: 70px;
    }
    .product-desc {
      height: 70px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      justify-content: center;
      font-weight: bold;

      .title {
        font-size: 16px;
      }

      .price {
        color: var(--color-blue);
        font-size: 20px;
      }
    }

    @media (min-width: 851px) {
      img {
        width: 120px;
        height: 120px;
      }

      .product-info {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .product-desc {
        margin: auto 15px;
        gap: 20px;

        .title {
          font-size: 28px;
        }
        .price {
          color: var(--color-blue);
          font-size: 25px;
        }
      }
    }
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .h3blue {
      color: var(--color-blue);
    }

    .back-gray {
      font-size: 14px;
      background-color: white;
      padding: 12px;
      display: flex;
      gap: 7px;
      border-radius: 8px;
    }

    @media (min-width: 851px) {
      gap: 10px;

      .back-gray {
        font-size: 18px;
        gap: 12px;
      }
    }
  }
`;

const UserInfo = styled.section`
  position: relative;
  button {
    position: absolute;
    top: 10px;
    right: 15px;
    width: 75px;
    height: 30px;
    border: 1px solid var(--color-grayscale40);
    color: var(--color-grayscale40);
    font-size: 14px;
    border-radius: 8px;
    background-color: white;
    cursor: pointer;
  }

  h3 {
    color: var(--color-grayscale40);
  }

  @media (min-width: 851px) {
    button {
      top: 15px;
      right: 20px;
      width: 100px;
      height: 40px;
      font-size: 18px;
    }

    li {
      font-size: 18px;
    }
  }
`;

const PaymentInfo = styled.section`
  h3 {
    color: var(--color-grayscale40);
  }

  ul {
    justify-content: space-between;
  }

  .margin-border {
    padding-bottom: 15px;
  }

  .total {
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
    border-top: 1px solid black;
    line-height: 20px;

    .price {
      color: var(--color-blue);
      font-size: 20px;
      font-weight: bold;
    }
  }

  @media (min-width: 851px) {
    li {
      font-size: 18px;
    }

    .total {
      .price {
        font-size: 22px;
      }
    }
  }
`;

const PaymentSelect = styled.section`
  ul {
    display: flex;
    flex-direction: column;

    li {
      display: flex;
      gap: 5px;
      line-height: 16px;

      input[type="radio"] {
        transform: scale(1.2);
      }

      label {
        display: flex;
        gap: 8px;
        .red {
          color: red;
        }
      }
    }
    @media (min-width: 851px) {
      label {
        font-size: 18px;
      }
    }
  }
`;

const CheckTerms = styled.section`
  display: flex;
  flex-direction: row;

  .invalid {
    color: red;
    margin: auto 10px;
    font-size: 12px;
    text-align: center;
  }

  div {
    display: flex;

    input[type="checkbox"] {
      transform: scale(1.2);
      cursor: pointer;
    }

    label {
      margin-left: 10px;
      cursor: pointer;
      font-size: 14px;
      line-height: 20px;

      span {
        color: var(--color-blue);
      }
    }
  }

  .all-agree {
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--color-grayscale40);
  }

  @media (min-width: 851px) {
    .invalid {
      font-size: 14px;
    }

    div {
      label {
        font-size: 18px;
        line-height: 23px;
      }
    }
  }
`;

export default Reservation;
