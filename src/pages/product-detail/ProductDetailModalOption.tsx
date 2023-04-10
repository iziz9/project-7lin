import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import {
  IProductDetailDataOptionsFilter,
  IProductDetailDataPeriod,
  IProductDetailSelectOptionData,
} from "../../@types/data";
import { IProductDetailModalOptionProps } from "../../@types/props";

const ProductDetailModalOption = ({
  data,
  selectItem,
  setSelectItem,
  type,
  isChange,
}: IProductDetailModalOptionProps) => {
  const [drop, setDrop] = useState<boolean>(false);
  let select = false;

  useEffect(() => {
    if (data && type === "필수") {
      setSelectItem((prev: IProductDetailSelectOptionData) => {
        return {
          period: {
            id: data[0].productPeriodId,
            content: data[0].startDate + " ~ " + data[0].endDate,
            amount: 1,
          },
          optionRoom: { ...prev.optionRoom },
          optionFlight: { ...prev.optionFlight },
        };
      });
    }
  }, []);

  const handleOptionClick = (id: number, content: string, price: number) => {
    setDrop(false);
    if (type === "필수") {
      return setSelectItem((prev: IProductDetailSelectOptionData) => {
        return {
          period: {
            periodId: id,
            content,
            amount: 1,
          },
          optionRoom: { ...prev.optionRoom },
          optionFlight: { ...prev.optionFlight },
        };
      });
    } else if (type === "룸선택") {
      return setSelectItem((prev: IProductDetailSelectOptionData) => {
        return {
          period: { ...prev.period },
          optionRoom: {
            optionId: id,
            content,
            price,
            amount: 1,
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
            optionId: id,
            content,
            price,
            amount: 1,
          },
        };
      });
    }
  };

  const checkOptionTitle = (type: string) => {
    if (type === "필수") return selectItem.period.content;
    else if (type === "룸선택")
      return selectItem.optionRoom.content
        ? selectItem.optionRoom.content
        : "객실 1인 사용료";
    else
      return selectItem.optionFlight.content
        ? selectItem.optionFlight.content
        : "비즈니스 또는 비상구 좌석";
  };

  return (
    <Option>
      <div>
        <strong>{type === "필수" ? type : "선택"}옵션</strong>
        <span>
          {(type === "필수" && "출발일시 및 도착일시") ||
            (type === "룸선택" && "객실 1인 사용료") ||
            (type === "좌석선택" && "비즈니스 또는 비상구 좌석")}
        </span>
      </div>
      <p onClick={() => setDrop((prev) => !prev)}>
        {checkOptionTitle(type)}

        <IoIosArrowDown color="#868686" />
      </p>
      {drop && (
        <ul>
          {data &&
            data.map(
              (
                item:
                  | IProductDetailDataPeriod
                  | IProductDetailDataOptionsFilter,
              ) => (
                <li
                  key={
                    "productPeriodId" in item
                      ? item.productPeriodId
                      : item.productOptionId
                  }
                  onClick={() =>
                    handleOptionClick(
                      "productPeriodId" in item
                        ? item.productPeriodId
                        : item.productOptionId,
                      "startDate" in item
                        ? item.startDate + " ~ " + item.endDate
                        : item.content,
                      "price" in item ? item.price : 0,
                    )
                  }
                >
                  {type === "필수" ? (
                    <span>
                      {"startDate" in item && item.startDate} ~{" "}
                      {"endDate" in item && item.endDate}
                    </span>
                  ) : (
                    <p>
                      <span>{"content" in item && item.content}</span>
                      <span>
                        +{"price" in item && item.price.toLocaleString()}원
                      </span>
                    </p>
                  )}
                </li>
              ),
            )}
        </ul>
      )}
    </Option>
  );
};

const Option = styled.li`
  margin-bottom: 30px;
  div {
    margin-bottom: 10px;
    strong {
      margin-right: 10px;
      font-weight: bold;
      color: #5b5b5b;
    }
  }
  > p {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 5px;
    padding: 10px;
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    box-sizing: border-box;
    cursor: pointer;
  }
  ul {
    border: 1px solid #000;
    border-radius: 8px;
    li {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      border-radius: 8px;
      cursor: pointer;
      :hover {
        background-color: #f5f5f5;
        color: #48484a;
        font-weight: bold;
      }
      p {
        width: 100%;
        display: flex;
        justify-content: space-between;
        span:last-child {
          font-weight: bold;
        }
      }
    }
  }
`;
export default React.memo(ProductDetailModalOption);
