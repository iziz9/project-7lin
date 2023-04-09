import React, { useState } from "react";
import styled from "styled-components";
import ModalProductCard from "../../commons/ModalProductCard";

const ReviewModal = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputVal = event.currentTarget.value.trim();
    if (inputVal === "") setError("예약한 상품의 번호를 입력해주세요.");
    else setValue(inputVal);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value === "") {
      setError("예약한 상품의 번호를 입력해주세요.");
      setIsSubmit(false);
    } else if (value === "12345") {
      setIsSubmit(true);
      setError("");
    } else setError("예약하지 않은 번호입니다.");
    setValue("");
  };

  return (
    <Modal>
      <span>예약번호</span>
      <form onSubmit={onSubmit}>
        <input type="number" value={value} onChange={onChange} />
        <button type="submit">인증</button>
      </form>
      {error && <span className="error">{error}</span>}
      {isSubmit && (
        <div>
          <ModalProductCard />
          <ModalProductCard />
          <ModalProductCard />
        </div>
      )}
      <button>후기 작성하기</button>
    </Modal>
  );
};

const Modal = styled.div`
  width: 100%;
  margin: auto;
  border-radius: 8px;
  background-color: white;
  > button {
    width: 100%;
    margin-top: 20px;
    padding: 15px;
    background-color: #0d99ff;
    outline: none;
    border: none;
    border-radius: 8px;
    font-size: 20px;
    font-weight: bold;
    color: white;
    cursor: pointer;
  }
  span {
    font-size: 20px;
  }
  .error {
    display: flex;
    align-items: center;
    padding: 10px 0;
    font-size: 13px;
    color: #e14544;
    ::before {
      content: "";
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 5px;
      background: url("/input_error_icon.svg") no-repeat center;
    }
  }

  form {
    display: flex;
    input {
      width: 100%;
      padding: 10px;
      border: none;
      outline: none;
      border-bottom: 1px solid black;
      font-size: 17px;
      appearance: none;
    }
    button {
      flex-shrink: 0;
      margin-left: 10px;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #0d99ff;
      outline: none;
      background-color: white;
      color: #0d99ff;
      font-weight: bold;
      font-size: 20px;
      cursor: pointer;
    }
  }

  > div {
    margin-top: 30px;
  }
`;

export default ReviewModal;
