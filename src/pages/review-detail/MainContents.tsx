import React from "react";
import styled from "styled-components";
import ProductInfosCard from "./../../commons/ProductInfosCard";

interface IMainContentsProps {
  thumnail: string;
}

const MainContents = ({ thumnail }: IMainContentsProps) => {
  return (
    <Main>
      <ProductInfosCard />

      <MainContent>
        <img src={thumnail} alt="후기 본문 이미지" />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
          molestiae eligendi totam dolore, sequi officiis tempore nesciunt cum
          earum necessitatibus ducimus. Hic a magnam in eligendi sunt. Officiis,
          ducimus placeat.
        </p>
        <img src="/review_img_2.png" alt="후기 본문 이미지" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat eos
          praesentium nobis voluptas facilis. Provident voluptas qui nam natus
          sapiente ex, fugit, nobis mollitia amet eum eveniet eius, voluptate
          sunt labore? Dignissimos sequi optio quaerat quos. Soluta voluptate
          assumenda labore?
        </p>
      </MainContent>

      <Tags>
        {["태그", "태그", "태그", "태그", "태그"].map((tag, index) => (
          <button key={index}>{tag}</button>
        ))}
      </Tags>
    </Main>
  );
};
const Main = styled.div`
  margin-top: 60px;
`;

const MainContent = styled.div`
  margin-top: 50px;
  img {
    border-radius: 10px;
    width: 100%;
    margin-bottom: 30px;
  }
  p {
    margin-bottom: 30px;
    line-height: 30px;
    font-size: 18px;
  }
`;
const Tags = styled.div`
  margin-top: 50px;
  button {
    margin-right: 20px;
    border: 1px solid #4a4a4a;
    outline: none;
    border-radius: 20px;
    padding: 5px 25px;
    background-color: transparent;
    font-size: 12px;
    color: #4a4a4a;
  }
`;

export default MainContents;
