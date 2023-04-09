import React, { useState } from "react";
import styled from "styled-components";
import ProductDetailModalOption from "./ProductDetailModalOption";
import { IoMdClose } from "react-icons/io";
import { BiPlus, BiMinus } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";
import { IProductDetailModalProps } from "../../@types/props";
import { CartState, IProductDetailSelectOptionData } from "../../@types/data";
import ProductDetailModalOptionCard from "./ProductDetailModalOptionCard";
import { useNavigate } from "react-router";

export const selectOptionData = {
  period: {
    periodId: 0,
    content: "",
    amount: 1,
  },
  optionRoom: {
    optionId: 0,
    content: "",
    price: 0,
    amount: 1,
  },
  optionFlight: {
    optionId: 0,
    content: "",
    price: 0,
    amount: 1,
  },
};

const ProductDetailModal = ({
  id,
  image,
  title,
  price,
  closeModal,
  type,
  funcType,
  options,
  period,
}: IProductDetailModalProps) => {
  const isMobile: boolean = useMediaQuery({
    query: "(max-width:850px)",
  });

  const navigate = useNavigate();

  const [selectItem, setSelectItem] =
    useState<IProductDetailSelectOptionData>(selectOptionData);

  const filterRoom = options?.filter((item) => item.type === "room");
  const filterFlight = options?.filter((item) => item.type === "flight");

  const handleSubmit = () => {
    console.log(funcType);

    let options;
    if (selectItem.optionRoom?.content && selectItem.optionFlight?.content)
      options = [{ ...selectItem.optionRoom }, { ...selectItem.optionFlight }];
    else if (selectItem.optionRoom?.content)
      options = [{ ...selectItem.optionRoom }];
    else if (selectItem.optionFlight?.content)
      options = [{ ...selectItem.optionFlight }];
    else options = null;

    if (funcType === "예약") {
      navigate("/reservation", {
        state: {
          productId: id,
          title,
          image,
          totalPrice,
          periods: { ...selectItem.period },
          options,
        },
      });
    } else if (funcType === "장바구니") {
      navigate("/cart");

      const storeCart = {
        productId: id,
        title,
        image,
        productPrice: price,
        totalPrice,
        selectPeriod: { ...selectItem.period },
        selectOptions: options,
        allOption: options,
        allPeriod: period,
      };

      const loadCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const isDuplication = loadCart.filter(
        (item: CartState) => item.productId === id,
      );
      if (isDuplication.length !== 0) {
        confirm(
          "장바구니에 해당 상품이 추가되어 있습니다. 장바구니로 이동하시겠습니까?",
        )
          ? navigate("/cart")
          : navigate(`/product/${id}`);

        closeModal();
        return;
      }

      const addCart = [...loadCart, { ...storeCart }];
      localStorage.setItem("cart", JSON.stringify(addCart));
    }

    closeModal();
  };

  const totalPrice =
    price * selectItem.period.amount +
    (filterRoom?.length !== 0 && selectItem.optionRoom?.content
      ? selectItem.optionRoom.amount * selectItem.optionRoom.price
      : 0) +
    (filterFlight?.length !== 0 && selectItem.optionFlight?.content
      ? selectItem.optionFlight.amount * selectItem.optionFlight.price
      : 0);

  return (
    <Wrap>
      {isMobile && <IoMdClose size={25} onClick={() => closeModal()} />}
      {isMobile ? (
        type === "선택" ? (
          <h1>옵션 선택</h1>
        ) : (
          <h1>옵션 / 수량 변경</h1>
        )
      ) : null}

      <ProductCard>
        <img src={image} alt="상품 이미지" />
        <div>
          <strong>{title} </strong>
          <p>{Number(price).toLocaleString()}원</p>
        </div>
      </ProductCard>

      <Options>
        <ProductDetailModalOption
          type="필수"
          data={period}
          selectItem={selectItem}
          setSelectItem={setSelectItem}
        />
        {filterRoom?.length !== 0 && (
          <ProductDetailModalOption
            type="룸선택"
            data={filterRoom}
            selectItem={selectItem}
            setSelectItem={setSelectItem}
          />
        )}
        {filterFlight?.length !== 0 && (
          <ProductDetailModalOption
            type="좌석선택"
            data={filterFlight}
            selectItem={selectItem}
            setSelectItem={setSelectItem}
          />
        )}
      </Options>

      <ChangeWrap>
        <h4>{type}된 옵션</h4>
        <div>
          <ProductInfo>
            <img src={image} alt="상품 이미지" />
            <div>
              <h5>{title}</h5>
              <p>
                <strong>여행 기간</strong>
                <span>{selectItem.period.content}</span>
              </p>
            </div>
          </ProductInfo>

          <OptionCards>
            <ProductDetailModalOptionCard
              title={selectItem.period?.content}
              basicPrice={price}
              type="period"
              selectItem={selectItem}
              setSelectItem={setSelectItem}
            />
            {filterRoom?.length !== 0 && selectItem.optionRoom?.content && (
              <ProductDetailModalOptionCard
                title={selectItem.optionRoom?.content}
                type="optionRoom"
                selectItem={selectItem}
                setSelectItem={setSelectItem}
              />
            )}
            {filterFlight?.length !== 0 && selectItem.optionFlight?.content && (
              <ProductDetailModalOptionCard
                title={selectItem.optionFlight?.content}
                type="optionFlight"
                selectItem={selectItem}
                setSelectItem={setSelectItem}
              />
            )}
          </OptionCards>

          <p>
            <span>총 예약 금액</span>
            <strong>{totalPrice.toLocaleString()}원</strong>
          </p>
        </div>
      </ChangeWrap>

      <Buttons>
        {!isMobile && <button onClick={() => closeModal()}>취소하기</button>}
        <button onClick={handleSubmit}>
          {type === "변경"
            ? "선택하기"
            : funcType === "장바구니"
            ? funcType + "에 넣기"
            : funcType + "하기"}
        </button>
      </Buttons>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  h1 {
    margin-top: 10px;
    margin-bottom: 30px;
    font-size: 30px;
    font-weight: bold;
  }
  > svg {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  @media screen and (max-width: 850px) {
    width: 100vw;
    height: 100vh;
    padding: 30px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: white;
    overflow-y: auto;
  }
`;
const ProductCard = styled.div`
  width: 100%;
  padding: 10px;
  border: 1px solid #bbbbbb;
  border-radius: 8px;
  display: flex;
  box-sizing: border-box;
  img {
    width: 90px;
    border-radius: 8px;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
    width: 100%;
    font-weight: bold;
    strong {
      display: block;
      margin-bottom: 15px;
      font-size: 20px;
      word-break: break-all;
    }
    p {
      font-size: 23px;
      color: #0d99ff;
    }
  }
`;
const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    width: 100%;
    padding: 10px 0;
    background-color: transparent;
    outline: none;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    font-size: 20px;
    cursor: pointer;
    :first-child {
      margin-right: 10px;
      border: 1px solid #bbbbbb;
      color: #5b5b5b;
    }
    :last-child {
      background-color: #0d99ff;
      color: white;
      @media screen and (max-width: 850px) {
        position: fixed;
        bottom: 0;
        right: 6px;
        border-radius: 0;
      }
    }
  }
`;

const Options = styled.ul`
  width: 100%;
  align-self: flex-start;
  margin-top: 30px;
  li:first-child {
    strong {
      color: #0d99ff; // 필수옵션만 이 색상
    }
  }
`;

// 선택된 옵션
const ChangeWrap = styled.div`
  margin-top: 20px;
  margin-bottom: 70px;
  width: 100%;
  > h4 {
    font-size: 23px;
    color: #48484a;
    font-weight: bold;
  }
  > div {
    margin-top: 30px;
    padding: 25px;
    border: 1px solid #bbbbbb;
    border-radius: 8px;
    > p {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 25px;
      > span {
        margin-right: 25px;
        font-size: 21px;
        color: #8e8e93;
      }
      > strong {
        font-size: 25px;
        font-weight: bold;
        color: #0d99ff;
        @media screen and (max-width: 850px) {
          font-size: 22px;
        }
      }
    }
  }
`;
const ProductInfo = styled.div`
  display: flex;
  margin-bottom: 20px;
  img {
    width: 90px;
    height: 90px;
    margin-right: 15px;
    border-radius: 8px;
  }
  > div {
    width: 100%;
    h5 {
      margin-bottom: 15px;
      font-size: 22px;
      font-weight: bold;
      @media screen and (max-width: 450px) {
        font-size: 18px;
      }
    }
    p {
      margin-bottom: 10px;
      :last-child {
        margin-bottom: 0;
      }
      strong {
        display: inline-block;
        width: 70px;
        color: #acacac;
      }
      span {
        color: #5b5b5b;
      }
    }
  }
`;
const OptionCards = styled.ul`
  li:first-child strong {
    color: #0d99ff;
  }
`;

export default ProductDetailModal;
