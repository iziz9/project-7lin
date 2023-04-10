import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import test from "/review.png";
import { GetAllReviewsReviewList } from "../../@types/data";

export interface IReviewItemsProps {
  data: GetAllReviewsReviewList[] | undefined;
}

const ReviewItems = ({ data }: IReviewItemsProps) => {
  return (
    <List>
      {data &&
        data?.map((item) => (
          <Link to={`/review/${item.reviewId}`} key={item.reviewId}>
            <Content>
              <Img>
                <img
                  src={item.reviewThumbnail}
                  onError={(e) =>
                    (e.currentTarget.src = "/review_onError_img.png")
                  }
                  alt="후기 미리보기 이미지"
                />
              </Img>
              <p>평점 {item.reviewGrade}</p>
            </Content>

            <ReviewTitle>{item.reviewTitle}</ReviewTitle>
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
  p {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 17px;
    color: white;
    text-shadow: 2px 2px 6px black;
  }
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
