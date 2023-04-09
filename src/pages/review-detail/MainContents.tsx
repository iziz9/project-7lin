import React from "react";
import styled from "styled-components";
import ProductInfosCard from "./../../commons/ProductInfosCard";
import { IMainContentsProps } from "./../../@types/props.d";
import { useMediaQuery } from "react-responsive";

const MainContents = ({ title, thumnail }: IMainContentsProps) => {
  const isMobile: boolean = useMediaQuery({
    query: "(max-width:850px)",
  });

  return (
    <Main>
      {isMobile ? null : <h1>{title}</h1>}

      <ProductInfosCard />

      <MainContent>
        <ImgArea>
          <img src={thumnail} alt="후기 본문 이미지" />
          <img src="/review_img_2.png" alt="후기 본문 이미지" />
          <img src={thumnail} alt="후기 본문 이미지" />
          <img src="/review_img_2.png" alt="후기 본문 이미지" />
          <img src={thumnail} alt="후기 본문 이미지" />
          <img src="/review_img_2.png" alt="후기 본문 이미지" />
          <img src={thumnail} alt="후기 본문 이미지" />
          <img src="/review_img_2.png" alt="후기 본문 이미지" />
        </ImgArea>
        <TxtArea>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis
            animi ullam delectus nisi nam dolor voluptatem fuga esse minus autem
            perferendis sint quam, temporibus nihil quod distinctio non atque
            illum quidem cupiditate quas. Placeat facilis sequi aliquam
            perspiciatis nulla ad quidem at earum nam magnam tempora sint ut
            laborum error saepe a dolorum accusamus commodi soluta temporibus
            inventore magni pariatur, deleniti exercitationem. Reprehenderit
            quia, maiores nihil ipsa quisquam sint, cupiditate architecto
            temporibus harum vitae cumque odit eaque tempora consequatur eum
            repellendus quaerat molestias. Nobis, mollitia ad quaerat accusamus
            laudantium eos explicabo esse id ea alias repudiandae consequuntur
            modi? Animi, voluptatem. Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Blanditiis animi ullam delectus nisi nam dolor
            voluptatem fuga esse minus autem perferendis sint quam, temporibus
            nihil quod distinctio non atque illum quidem cupiditate quas.
            Placeat facilis sequi aliquam perspiciatis nulla ad quidem at earum
            nam magnam tempora sint ut laborum error saepe a dolorum accusamus
            commodi soluta temporibus inventore magni pariatur, deleniti
            exercitationem. Reprehenderit quia, maiores nihil ipsa quisquam
            sint, cupiditate architecto temporibus harum vitae cumque odit eaque
            tempora consequatur eum repellendus quaerat molestias. Nobis,
            mollitia ad quaerat accusamus laudantium eos explicabo esse id ea
            alias repudiandae consequuntur modi? Animi, voluptatem.
          </p>
        </TxtArea>
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
  padding-top: 50px;
  h1 {
    margin-bottom: 50px;
    font-size: 45px;
    font-weight: bold;
  }
`;

const MainContent = styled.div`
  margin-top: 50px;
`;
const ImgArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  img {
    width: 290px;
    height: 290px;
    border-radius: 10px;
  }
`;
const TxtArea = styled.div`
  margin-top: 50px;
  p {
    margin-bottom: 30px;
    line-height: 30px;
    font-size: 20px;
  }
`;
const Tags = styled.div`
  margin-top: 50px;
  button {
    margin-right: 20px;
    margin-bottom: 10px;
    border: 1px solid #4a4a4a;
    outline: none;
    border-radius: 20px;
    padding: 5px 25px;
    background-color: transparent;
    font-size: 16px;
    color: #4a4a4a;
  }
`;

export default MainContents;
