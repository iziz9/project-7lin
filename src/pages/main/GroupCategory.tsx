import React from "react";
import styled from "styled-components";

type Props = {};

const GroupCategory = (props: Props) => {
  return (
    <Section>
      <h2 className="title">어떤 그룹과 여행하고 싶으세요?</h2>
      <div className="category-container">
        <div className="category-first">
          <img src="/category-senior.png" />
          <img src="/category-all.png" />
        </div>
        <div className="category-second">
          <img src="/category-w.png" />
          <img src="/category-m.png" />
          <img src="/category-fam.png" />
        </div>
      </div>
    </Section>
  );
};

const Section = styled.section`
  background-color: wheat;
  margin-top: 30px;
  padding-bottom: 30px;

  h2 {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .category-container {
    display: flex;
    flex-direction: column;
    gap: 30px;

    .category-first {
      display: flex;
      justify-content: space-between;
      // gap: 30px;

      img {
        width: 48%;
        // min-height: 150px;
        max-height: 250px;
        object-fit: cover;
        border-radius: 10px;

        :hover {
          cursor: pointer;
          background-color: 0D99FF;
        }
      }
    }

    .category-second {
      display: flex;
      justify-content: space-between;

      img {
        width: 30%;
        // min-height: 150px;
        height: 250px;
        max-height: 250px;
        object-fit: cover;
        border-radius: 10px;

        :hover {
          cursor: pointer;
          background-color: 0D99FF;
        }
      }
    }
  }
`;

export default GroupCategory;
