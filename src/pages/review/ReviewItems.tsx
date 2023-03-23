import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import test from "/test.png";

const ReviewItems = () => {
  const data = new Array();

  for (let i = 0; i < 16; i++) {
    data.push(i);
  }

  return (
    <List>
      {data.map((item) => (
        <Link to={`${item}`} key={item}>
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

          <ReviewTitle>남미 여행이 어땠냐면</ReviewTitle>
        </Link>
      ))}
    </List>
  );
};

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 50px 20px;
  margin-top: 80px;
`;
const Content = styled.div`
  position: relative;
`;
const Img = styled.div`
  width: 290px;
  height: 290px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;

  img {
    height: 100%;
  }
`;
const Text = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  p {
    margin-bottom: 10px;
    font-size: 13px;
    color: white;
  }
`;
const ReviewTitle = styled.h2`
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
`;

export default ReviewItems;
