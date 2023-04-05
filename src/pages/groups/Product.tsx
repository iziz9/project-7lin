import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// 목업 데이터
const mockupData = [
  {
    id: "123",
    image: "https://cdn.imweb.me/thumbnail/20220330/ea0dbb6095678.png",
    title: "중앙아시아 3국 15일",
    price: 5790000,
    discription:
      "5070 누구나 참가하는 중앙아시아 3국 일주 여행<br/>3국 중 가장 아름다운 키르키즈스탄 특화 여행상품<br/>힘들지 않는 가벼운 트레킹 및 하이킹 포함 일정",
  },
  {
    id: "456",
    image: "https://cdn.imweb.me/thumbnail/20220804/b2c35e3dc9f22.jpg",
    title: "스페인 산티아고 순례길 하이라이트 17일",
    price: 5290000,
    discription:
      "#스페인 #산티아고 #산티아고순례길 #250Km #까미노 #카미노데산티아고 #생쟝 #피니스테라 #사리아 #피스테라 #피레네산맥 #무시아 #마드리드",
  },
  {
    id: "789",
    image: "https://cdn.imweb.me/thumbnail/20220830/6d1a7d5c70594.jpg",
    title: "누구나 가능한 이지워킹 스위스 알프스 초급 트레킹 10일",
    price: 4990000,
    discription:
      "#스위스 #이지워킹 #트레킹 #리기산 #엥겔베르그 #피르스트 #뮈렌 #라보 #레만호수 #취리히 #루체른 #인터라켄 #베른 #로쟌 #체르마트 #마조레",
  },
  {
    id: "101112",
    image: "https://cdn.imweb.me/thumbnail/20220507/59b9d6e747e98.png",
    title: "코카서스 12일 풀패키지 ",
    price: 5590000,
    discription:
      "와인을 최초로 만들기 시작한 코카서스 지역 여행<br/>와이너리 방문, 가정집 하우스와인, 꼬냑 제조장 방문<br/>오래된 성을 호텔로 사용하는 고성호텔 숙박 체험",
  },
  {
    id: "131415",
    image: "https://cdn.imweb.me/thumbnail/20220330/1242df3a189a7.png",
    title: "와인러버들끼리 코카서스 3국 일주 18일  ",
    price: 6390000,
    discription:
      "와인 애주가들끼리 떠나는 코카서스 3국 일주<br/>코카서스의 백미 조지아를 샅샅히 둘러보는 상품<br/>패키지의 안전함과 자유여행의 즐거움을 동시에~",
  },
];

const Product = () => {
  return (
    <Container>
      {mockupData.map((props) => (
        <Link
          key={props.id}
          to={`/product/${props.id}`}
          state={{
            ...props,
          }}
        >
          <Item key={props.id}>
            <img className="image" src={props.image} alt={props.title} />
            <AiOutlineHeart />
            <h3 className="title">{props.title}</h3>
            <span className="price">
              {props.price.toLocaleString("ko-KR")}원
            </span>
            <p
              className="body"
              dangerouslySetInnerHTML={{ __html: props.discription }}
            ></p>
          </Item>
        </Link>
      ))}
    </Container>
  );
};

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(auto, 310px));
  grid-auto-rows: auto;
  gap: 20px;
  row-gap: 40px;
  max-width: 970px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  // 모바일 환경
  @media (max-width: 850px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Item = styled.li`
  /* overflow: hidden; */
  position: relative;
  display: flex;
  flex-direction: column;
  line-height: 1.6;

  svg {
    position: absolute;
    right: 16px;
    top: 16px;
    font-size: 25px;
  }
  .image {
    width: 100%;
    object-fit: cover;
    &:hover {
      opacity: 0.4;
    }
  }
  .title {
    font-weight: 700;
    font-size: 20px;
    margin: 14px 0 4px;
    line-height: 1.5;
  }
  .price {
    font-size: 18px;
    color: #0080c6;
  }
  .body {
    font-size: 15px;
    color: var(--color-grayscale40);
  }

  @media (max-width: 850px) {
    svg {
      right: 8px;
      top: 8px;
      font-size: 20px;
    }
    .title {
      margin-top: 14px;
      font-size: 16px;
    }
    .price {
      font-size: 14px;
      margin-bottom: 8px;
    }
    .body {
      font-size: 14px;
    }
  }
`;

export default Product;
