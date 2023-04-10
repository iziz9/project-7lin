import React, { useState } from "react";
import styled from "styled-components";
import { GrPowerReset, GrClose } from "react-icons/gr";
import { useMediaQuery } from "react-responsive";
import { BiFilterAlt } from "react-icons/bi";
import { FilterCategoryState, filterState } from "../../store/categoryAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { getPeriodRange, getPriceRange } from "../../utils/filter";

const filterData = [
  {
    category: "theme",
    type: "checkbox",
    title: "여행 테마",
    content: [
      "골프여행",
      "문화탐방",
      "휴양지",
      "트래킹",
      "성지순례",
      "볼런투어",
    ],
  },
  {
    category: "destination",
    type: "checkbox",
    title: "여행 지역",
    content: [
      "동남아/태평양",
      "인도/중앙아시아",
      "아프리카/중동",
      "유럽/코카서스",
      "중남미/북미",
      "대만/중국/일본",
    ],
  },
  {
    category: "period",
    type: "radio",
    title: "여행 기간",
    content: ["5일 미만", "5일~14일", "15일 이상"],
  },
  {
    category: "price",
    type: "radio",
    title: "가격",
    content: ["~200만원", "200~500만원", "500~1000만원", "1000만원~"],
  },
];

const Filter = ({ filterClick }: any) => {
  // 반응형
  const isMobile = useMediaQuery({ query: "(max-width:850px)" });
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const [filter, setFilter] = useRecoilState(filterState);
  const [filterCategory, setFilterCategory] =
    useRecoilState(FilterCategoryState);

  // X 버튼 클릭
  const closeClicked = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsFilterOpened(false);
  };

  // 필터 버튼 클릭
  const filterClicked = () => {
    setIsFilterOpened((prev) => !prev);
  };

  const resetClick = () => {
    setFilterCategory([]);
    setFilter({});
  };

  const isChecked = (title: string, name: string) => {
    const value = filterCategory.map((e: any) => e.middleCategory);
    const result = value.filter((e) => e === name);

    switch (title) {
      case "period":
        return getPeriodRange(name).minPeriod === filter.minPeriod
          ? true
          : false;
      case "price":
        return getPriceRange(name).minPrice === filter.minPrice ? true : false;
      case "theme":
        return result.length !== 0 ? true : false;
      case "destination":
        return result.length !== 0 ? true : false;
      default:
        return false;
    }
  };

  return (
    <>
      {isMobile ? (
        <MobileContainer>
          <h4 onClick={filterClicked}>
            필터 <BiFilterAlt />
          </h4>
          {isFilterOpened && (
            <div className="modal">
              <ResetButton onClick={resetClick} type="reset">
                초기화
                <GrPowerReset />
              </ResetButton>
              <CloseButton onClick={closeClicked}>
                <GrClose />
              </CloseButton>
              {filterData.map((element, index) => (
                <section className={element.category} key={index}>
                  <h5 className="optionTitle">{element.title}</h5>{" "}
                  <div className="optionItems">
                    {element.content.map((item, itemIndex) => (
                      <label htmlFor={item} key={itemIndex}>
                        <input
                          type={element.type}
                          id={item}
                          name={element.category}
                          onChange={filterClick}
                          checked={isChecked(element.category, item)}
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </MobileContainer>
      ) : (
        <PCContainer>
          <h4>필터</h4>
          <ResetButton onClick={resetClick} type="reset">
            초기화
            <GrPowerReset />
          </ResetButton>
          {filterData.map((element, index) => (
            <section className={element.category} key={index}>
              <h5>{element.title}</h5>
              {element.content.map((item, itemIndex) => (
                <label htmlFor={item} key={itemIndex}>
                  <input
                    type={element.type}
                    id={item}
                    name={element.category}
                    onChange={filterClick}
                    checked={isChecked(element.category, item)}
                  />
                  {item}
                </label>
              ))}
            </section>
          ))}
        </PCContainer>
      )}
    </>
  );
};

const MobileContainer = styled.form`
  z-index: 100;

  .modal {
    background-color: #fff;
    position: absolute;
    height: 100vh;
    width: 100%;
  }

  // 필터
  h4 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    margin: 0 20px;
    font-weight: 700;
    font-size: 18px;
    padding: 16px 0;
    &:hover {
      cursor: pointer;
    }
    svg {
      font-size: 22px;
      /* color: var(--color-grayscale60); */
    }
  }

  // 필터 상세
  section {
    display: flex;
    gap: 10px;
    padding: 20px;
    border-bottom: 1px solid var(--color-grayscale20);
    flex-wrap: wrap;
    flex-direction: column;

    .optionTitle {
      min-width: 70px;
    }

    .optionItems {
      display: grid;
      grid-template-columns: repeat(2, minmax(140px, auto));
      grid-auto-rows: 30px;
    }

    label {
      font-size: 14px;
      color: var(--color-grayscale60);
      /* color: blue; */
      display: flex;
      align-items: center;
      column-gap: 3px;
      margin-right: 16px;

      input {
        zoom: 1.2;
      }
      &:hover,
      input:hover {
        cursor: pointer;
      }
    }
  }
`;

const PCContainer = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  position: relative;
  padding: 10px 0;

  // 필터
  h4 {
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 24px;
  }

  // 필터별 섹션
  section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 30px 0;
    border-bottom: 1px solid var(--color-grayscale20);

    h5 {
      font-size: 18px;
      margin-bottom: 8px;
    }

    label {
      font-size: 14px;
      color: var(--color-grayscale60);
      display: flex;
      align-items: center;
      column-gap: 6px;
      input {
        zoom: 1.2;
      }
      &:hover,
      input:hover {
        cursor: pointer;
      }
    }
  }
`;

const ResetButton = styled.button`
  // 초기화 버튼
  position: absolute;
  right: 0;
  top: 6px;
  display: flex;
  gap: 3px;
  align-items: center;
  padding: 5px 7px;
  font-size: 15px;
  background-color: #fff;
  border: 1px solid var(--color-grayscale20);
  border-radius: 3px;

  @media (max-width: 850px) {
    top: -40px;
    right: 60px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const CloseButton = styled.button`
  background-color: #fff;
  border: none;
  position: absolute;
  top: -40px;
  right: 10px;
  font-size: 26px;

  &:hover {
    cursor: pointer;
  }
`;

export default Filter;
