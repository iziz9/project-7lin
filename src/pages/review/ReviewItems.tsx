import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import test from "/review.png";

const ReviewItems = () => {
  const data = new Array();

  for (let i = 0; i < 12; i++) {
    data.push(i);
  }

  return (
    <List>
      {data.map((item) => (
        <Link
          to={`${item}`}
          key={item}
          state={{
            thumnail: test,
            date: "2023.12.12",
            views: 1234,
            title: "남미 여행이 어땠냐면",
            name: "김영***",
          }}
        >
          <Content>
            <Img>
              <img src={test} alt="thumnail" />
            </Img>
            <Text>
              <p>
                2023.12.12 <span>조회 1234</span>
              </p>
              <p>김영***</p>
            </Text>
          </Content>

          <ReviewTitle>
            남미 여행이 어땠냐면 끝내줘요 죽여줘요 사랑해요 또 가고 싶어요
          </ReviewTitle>
        </Link>
      ))}
    </List>
  );
};

const List = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 50px 20px;
  @media screen and (max-width: 850px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(6, 1fr);
  }
`;
const Content = styled.div`
  position: relative;
`;
const Img = styled.div`
  width: 100%;
  height: calc(1240px / 4.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
  @media screen and (max-width: 1240px) {
    height: calc(100vw / 4.5);
  }
  @media screen and (max-width: 850px) {
    height: calc(100vw / 2.5);
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
const Text = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  p {
    margin-bottom: 10px;
    font-size: 17px;
    color: white;
  }
`;
const ReviewTitle = styled.h2`
  width: 100%;
  margin-top: 20px;
  font-size: 22px;
  font-weight: bold;
  overflow: hidden;
  line-height: 25px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  word-break: break-all;
  /* 말줄임 적용 */
`;

export default ReviewItems;
