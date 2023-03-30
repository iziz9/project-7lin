import React, { useEffect, useRef } from "react";
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

const Way = () => {
  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어주기
    const location = new naver.maps.LatLng(37.5685, 126.9816);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    const marker = new naver.maps.Marker({ position: location, map });

    var contentString = [
      "<div class='ballon'>",
      "   <span style='font-weight:bold'>Go Together</span>",
      "   <span>(주)더샤이니</span>",
      "</div>",
    ].join("");

    // 말풍선 커스텀
    const infowindow = new naver.maps.InfoWindow({
      content: contentString,
      maxWidth: 90,
      borderColor: "var(--color-grayscale60)",
      borderWidth: 1,
      anchorSize: new naver.maps.Size(10, 1),
      anchorSkew: true,
      pixelOffset: new naver.maps.Point(0, -10),
    });

    infowindow.open(map, marker);
  }, []);

  return (
    <Container>
      <h2>고투게더 by (주)더샤이니 주소</h2>
      <h3>(04521) 서울특별시 중구 청계천로40, 한국관광공사 서울센터 818호</h3>
      <Map ref={mapElement} />
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
  .ballon {
    font-size: 16px;
    margin: 10px;
    span:nth-child(1) {
      display: block;
      margin-bottom: 8px;
    }
  }
`;

const Map = styled.div`
  max-width: 850px;
  height: 600px;
  margin: 20px 0 30px;
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
    width: calc(100% - 300px);
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

export default Way;
