import React from "react";
import styled from "styled-components";

interface colorProps {
  bgColor: string;
}

const subwayData = [
  { color: "2961ef", title: "1호선", location: "종각역 5번 출구에서 220m" },
  {
    color: "08c151",
    title: "2호선",
    location: "을지로입구역 2번 출구에서 360m",
  },
  { color: "ffa451", title: "3호선", location: "광화문역 5번 출구에서 430m" },
  { color: "8c1aff", title: "5호선", location: "안국역 6번 출구에서 990m" },
];

const Map = () => {
  return (
    <Container>
      <h2>고투게더 by (주)더샤이니 주소</h2>
      <h3>(04521) 서울특별시 중구 청계천로40, 한국관광공사 서울센터 818호</h3>
      <div style={{ height: "400px" }}></div>
      <Subway>
        <h4>대중교통 이용 시</h4>
        <ul>
          {subwayData.map((element) => (
            <SubwayLine key={element.color} bgColor={element.color}>
              <span>{element.title}</span>
              <p>{element.location}</p>
            </SubwayLine>
          ))}
        </ul>
      </Subway>
    </Container>
  );
};

const Container = styled.div`
  h2 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
  }
  h3 {
    font-size: 18px;
    color: var(--color-grayscale40);
  }
`;

const Subway = styled.div`
  display: flex;
  color: var(--color-grayscale50);

  h4 {
    font-size: 22px;
    font-weight: 700;
    min-width: 200px;
  }

  ul {
    display: flex;
    width: calc(100% - 200px);
    flex-wrap: wrap;
  }
`;

const SubwayLine = styled.li<colorProps>`
  display: flex;
  gap: 20px;
  align-items: center;
  padding-bottom: 20px;

  span {
    width: 60px;
    padding: 6px;
    border-radius: 5px;
    text-align: center;
    color: #ffffff;
    background-color: #${(props) => props.bgColor};
  }
  p {
    width: 240px;
  }
`;

export default Map;
