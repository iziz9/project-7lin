import React from "react";
import styled from "styled-components";
import { GrPowerReset } from "react-icons/gr";

const checkboxData = [
  {
    category: "theme",
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
];

const radioData = [
  {
    category: "period",
    title: "여행 기간",
    content: ["5일 미만", "5일~14일", "15일 이상"],
  },
  {
    category: "price",
    title: "가격",
    content: ["~200만원", "200~500만원", "500~1000만원", "1000만원~"],
  },
];

const Filter = () => {
  const resetClicked = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const resetForm = event.target as HTMLFormElement;
    resetForm.reset();
  };

  return (
    <Container id="filterForm">
      <h4>필터</h4>
      <button type="reset" onClick={() => resetClicked}>
        초기화
        <GrPowerReset />
      </button>
      {/* 추후 Component로 변경 가능성 있음 */}
      {checkboxData.map((element, index) => (
        <section className={element.category} key={index}>
          <h5>{element.title}</h5>
          {element.content.map((c_element, c_index) => (
            <label htmlFor={`${element.category}${c_index}`} key={c_index}>
              <input type="checkbox" id={`${element.category}${c_index}`} />
              {c_element}
            </label>
          ))}
        </section>
      ))}
      {radioData.map((element, index) => (
        <section className={element.category} key={index}>
          <h5>{element.title}</h5>
          {element.content.map((c_element, c_index) => (
            <label htmlFor={`${element.category}${c_index}`} key={c_index}>
              <input
                type="radio"
                id={`${element.category}${c_index}`}
                name={element.category}
              />
              {c_element}
            </label>
          ))}
        </section>
      ))}
    </Container>
  );
};

const Container = styled.form`
  /* background-color: pink; */
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

  // 초기화
  button {
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
    }
  }
`;

export default Filter;
