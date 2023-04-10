import React from "react";
import styled from "styled-components";
import { IMainContentsProps } from "./../../@types/props.d";
import { useMediaQuery } from "react-responsive";
import { ReviewContentDtolist } from "../../@types/data";

const MainContents = ({ data, tag }: IMainContentsProps) => {
  const imgs = data.filter(
    (item: ReviewContentDtolist) => item.type === "IMAGE",
  );
  const txts = data.filter(
    (item: ReviewContentDtolist) => item.type === "TEXT",
  );

  console.log(imgs);
  console.log(txts);

  return (
    <>
      <MainContent>
        <ImgArea>
          {imgs.map((item: ReviewContentDtolist) => (
            <img
              key={item.reviewId}
              onError={(e) => e.currentTarget.src === "/img_error.png"}
              src={item.content}
              alt="후기 본문 이미지"
            />
          ))}
        </ImgArea>
        <TxtArea>
          {txts.map((item: ReviewContentDtolist) => (
            <p key={item.reviewContentId}>{item.content}</p>
          ))}
        </TxtArea>
      </MainContent>

      <Tags>
        {tag.map((tag: string, index: number) => (
          <button key={index}>{tag}</button>
        ))}
      </Tags>
    </>
  );
};

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
