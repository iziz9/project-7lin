import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { BiPlus, BiMinus } from "react-icons/bi";
import { IProductDetailModalOptionCardProps } from "../../@types/props";
import { OptionKey } from "../../@types/enum";
import { IProductDetailSelectOptionData } from "../../@types/data";
import { selectOptionData } from "./ProductDetailModal";

const ProductDetailModalOptionCard = ({
  title,
  type,
  basicPrice,
  selectItem,
  setSelectItem,
}: IProductDetailModalOptionCardProps) => {
  const onClickMinus = () => {
    if (type === "period") {
      return setSelectItem((prev: IProductDetailSelectOptionData) => {
        return {
          period: {
            periodId: prev.period.periodId,
            content: prev.period.content,
            amount: prev.period.amount === 1 ? 1 : prev.period.amount - 1,
          },
          optionRoom: {
            optionId: prev.optionRoom.optionId,
            content: prev.optionRoom.content,
            price: prev.optionRoom.price,
            amount:
              prev.period.amount === prev.optionRoom.amount
                ? prev.period.amount === 1
                  ? 1
                  : prev.optionRoom.amount - 1
                : prev.optionRoom.amount,
          },
          optionFlight: {
            optionId: prev.optionFlight.optionId,
            content: prev.optionFlight.content,
            price: prev.optionFlight.price,
            amount:
              prev.period.amount === prev.optionFlight.amount
                ? prev.period.amount === 1
                  ? 1
                  : prev.optionFlight.amount - 1
                : prev.optionFlight.amount,
          },
        };
      });
    } else if (type === "optionRoom") {
      return setSelectItem((prev: IProductDetailSelectOptionData) => {
        return {
          period: { ...prev.period },
          optionRoom: {
            optionId: prev.optionRoom.optionId,
            content: prev.optionRoom.content,
            price: prev.optionRoom.price,
            amount:
              prev.optionRoom.amount === 1 ? 1 : prev.optionRoom.amount - 1,
          },
          optionFlight: { ...prev.optionFlight },
        };
      });
    } else {
      return setSelectItem((prev: IProductDetailSelectOptionData) => {
        return {
          period: { ...prev.period },
          optionRoom: { ...prev.optionRoom },
          optionFlight: {
            optionId: prev.optionFlight.optionId,
            content: prev.optionFlight.content,
            price: prev.optionFlight.price,
            amount:
              prev.optionFlight.amount === 1 ? 1 : prev.optionFlight.amount - 1,
          },
        };
      });
    }
  };

  const onClickPlus = () => {
    if (type === "period") {
      return setSelectItem((prev: IProductDetailSelectOptionData) => {
        return {
          period: {
            periodId: prev.period.periodId,
            content: prev.period.content,
            amount: prev.period.amount + 1,
          },
          optionRoom: { ...prev.optionRoom },
          optionFlight: { ...prev.optionFlight },
        };
      });
    } else if (type === "optionRoom") {
      return setSelectItem((prev: IProductDetailSelectOptionData) => {
        return {
          period: { ...prev.period },
          optionRoom: {
            optionId: prev.optionRoom.optionId,
            content: prev.optionRoom.content,
            price: prev.optionRoom.price,
            amount:
              prev.period.amount === prev.optionRoom.amount
                ? prev.optionRoom.amount
                : prev.optionRoom.amount + 1,
          },
          optionFlight: { ...prev.optionFlight },
        };
      });
    } else {
      return setSelectItem((prev: IProductDetailSelectOptionData) => {
        return {
          period: { ...prev.period },
          optionRoom: { ...prev.optionRoom },
          optionFlight: {
            optionId: prev.optionFlight.optionId,
            content: prev.optionFlight.content,
            price: prev.optionFlight.price,
            amount:
              prev.period.amount === prev.optionFlight.amount
                ? prev.optionFlight.amount
                : prev.optionFlight.amount + 1,
          },
        };
      });
    }
  };

  const onClickDelete = () => {
    if (type === "optionRoom") {
      return setSelectItem((prev: IProductDetailSelectOptionData) => {
        return {
          period: { ...prev.period },
          optionRoom: { ...selectOptionData.optionRoom },
          optionFlight: { ...prev.optionFlight },
        };
      });
    } else {
      return setSelectItem((prev: IProductDetailSelectOptionData) => {
        return {
          period: { ...prev.period },
          optionRoom: { ...prev.optionRoom },
          optionFlight: { ...selectOptionData.optionFlight },
        };
      });
    }
  };
  return (
    <OptionCard>
      <Top>
        <strong>{type === "period" ? "필수" : "선택"}옵션</strong>
        <p>
          {title} - {selectItem[`${type as keyof typeof OptionKey}`].amount}개
        </p>
        {type === "period" ? null : (
          <IoMdClose onClick={onClickDelete} size={20} />
        )}
      </Top>
      <Bottom>
        <p>
          <BiMinus size={23} onClick={onClickMinus} />
          <span>{selectItem[`${type as keyof typeof OptionKey}`].amount}</span>

          <BiPlus size={23} onClick={onClickPlus} />
        </p>
        <h2>
          {(type === "period" &&
            basicPrice &&
            (basicPrice * selectItem.period.amount)?.toLocaleString()) ||
            (type === "optionRoom" &&
              (
                selectItem.optionRoom.price * selectItem.optionRoom.amount
              ).toLocaleString()) ||
            (type === "optionFlight" &&
              (
                selectItem.optionFlight.price * selectItem.optionFlight.amount
              ).toLocaleString())}
          원
        </h2>
      </Bottom>
    </OptionCard>
  );
};

const OptionCard = styled.li`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
  :last-child {
    margin-bottom: 0;
  }
`;

const Top = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  color: #48484a;
  strong {
    margin-right: 17px;
    flex-shrink: 0;
  }
  svg {
    margin-left: auto;
    flex-shrink: 0;
    cursor: pointer;
  }
`;
const Bottom = styled.div`
  width: 85%;
  align-self: flex-end;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > p {
    padding: 5px;
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 8px;
    > svg {
      border: 1px solid #0d99ff;
      border-radius: 100%;
      color: #0d99ff;
      cursor: pointer;
    }
    span {
      width: 50px;
      font-size: 21px;
      text-align: center;
    }
  }
  h2 {
    font-size: 23px;
    font-weight: bold;
    @media screen and (max-width: 450px) {
      font-size: 16px;
    }
  }
`;

export default ProductDetailModalOptionCard;
