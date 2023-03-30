import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

type Props = {};

const GroupCategory = (props: Props) => {
  // const isMobile: boolean = useMediaQuery({
  //   query: "(max-width:849px)",
  // });
  return (
    <Section>
      <h2 className="title">어떤 그룹과 여행하고 싶으세요?</h2>
      <CategoryContainer>
        <ul className="category-first">
          <li>
            <img src="/category-senior.png" alt="5070만의 특별한 여행" />
            <div className="overlay">5070만의 특별한 여행</div>
          </li>
          <li>
            <img src="/category-all.png" alt="누구와 함께 가도 좋을 여행" />
            <div className="overlay">누구와 함께 가도 좋을 여행</div>
          </li>
        </ul>
        <ul className="category-second">
          <li>
            <img src="/category-w.png" alt="여자끼리" />
            <div className="overlay">여자끼리</div>
          </li>
          <li>
            <img src="/category-m.png" alt="남자끼리" />
            <div className="overlay">남자끼리</div>
          </li>
          <li>
            <img src="/category-fam.png" alt="가족끼리" />
            <div className="overlay">가족끼리</div>
          </li>
        </ul>
      </CategoryContainer>
    </Section>
  );
};

const Section = styled.section`
  margin-top: 60px;

  h2 {
    font-size: 30px;
    font-weight: bold;
    margin: 0 20px 10px;
  }

  @media (max-width: 849px) {
    margin-top: 0;

    h2 {
      font-size: 20px;
      margin: 0 0 14px;
    }
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 849px) {
    gap: 10px;
  }

  .category-first {
    display: flex;
    justify-content: space-between;

    li {
      position: relative;
      width: 48%;
      max-height: 250px;
      border-radius: 10px;
      color: transparent;

      .overlay {
        font-size: 30px;
        display: none;
        background-color: #0d99ff;
        opacity: 0.8;
        color: white;
        cursor: pointer;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        border-radius: 10px;
        justify-content: center;
        align-items: center;
        font-weight: bold;
      }

      :hover .overlay {
        display: flex;
      }
    }
    :hover {
      cursor: pointer;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }

    @media (max-width: 849px) {
      li {
        .overlay {
          font-size: 16px;
          text-align: center;
        }
      }
    }
  }

  .category-second {
    display: flex;
    justify-content: space-between;

    li {
      position: relative;
      width: 31%;
      min-height: 150px;
      max-height: 250px;
      border-radius: 10px;
      color: transparent;
      font-size: 30px;

      .overlay {
        font-size: 30px;
        display: none;
        background-color: #0d99ff;
        opacity: 0.8;
        color: white;
        cursor: pointer;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        border-radius: 10px;
        justify-content: center;
        align-items: center;
        font-weight: bold;
      }

      :hover .overlay {
        display: flex;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }

    @media (max-width: 849px) {
      li {
        min-height: 82px;

        img {
          min-height: 82px;
        }
        .overlay {
          font-size: 16px;
          min-height: 82px;
        }
      }
    }
  }
`;

export default GroupCategory;
