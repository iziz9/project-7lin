import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowDropright } from "react-icons/io";
import { useDragScroll } from "../../utils/useDragScroll";
import { Link, useNavigate } from "react-router-dom";
import { IProductDetailReviewsProps } from "../../@types/props";
import { IProductDetailReviewData } from "../../@types/data";

const ProductDetailReviews = ({
  reviewData,
  thumnail,
}: IProductDetailReviewsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <>
      <Head>
        <h2>여행 후기</h2>
        <IoIosArrowDropright size={30} onClick={() => navigate("/review")} />
      </Head>

      <Review ref={ref}>
        <List>
          {reviewData.length === 0 ? (
            <p>여행후기가 없습니다</p>
          ) : (
            reviewData.map((item: IProductDetailReviewData) => (
              <Item key={item.reviewId} to={`/review/${item.reviewId}`}>
                <img
                  onError={(e) => (e.currentTarget.src = thumnail)}
                  src={item.thumbnail}
                  alt="후기 이미지"
                />
                <div>
                  <div>
                    <p>
                      <span>{item.createdDate}</span>
                      <span>조회수 {item.viewCount}</span>
                    </p>
                  </div>
                  <h3>{item.title}</h3>
                </div>
              </Item>
            ))
          )}
        </List>
      </Review>
    </>
  );
};

const Head = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  h2 {
    margin-right: 10px;
    font-size: 25px;
    font-weight: bold;
  }
  svg {
    cursor: pointer;
  }
`;

const Review = styled.div`
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const List = styled.div`
  display: flex;
  gap: 30px;
  padding: 0 40px;
  > p {
    margin: 30px auto;
    font-size: 30px;
    font-weight: bold;
  }
  @media screen and (max-width: 850px) {
    width: 850px;
    padding: 0;
    > p {
      margin: 30px 0;
      margin-left: 50px;
    }
  }
`;

const Item = styled(Link)`
  display: inline-block;
  width: 33%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  > div {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10% 0 20% 10%;
    box-sizing: border-box;
    color: white;
    font-weight: bold;
    text-shadow: 2px 2px 6px black;
    div {
      p {
        line-height: 24px;
        display: flex;
        flex-direction: column;
      }
    }
    h3 {
      width: 90%;
      word-break: break-all;
      font-size: 22px;
      line-height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
`;
export default ProductDetailReviews;
