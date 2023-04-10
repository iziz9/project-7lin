import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowDropright } from "react-icons/io";
import { useDragScroll } from "../../utils/useDragScroll";
import { Link } from "react-router-dom";
import { IProductDetailReviewsProps } from "../../@types/props";
import { IProductDetailReviewData } from "../../@types/data";

const ProductDetailReviews = ({
  reviewData,
  thumnail,
}: IProductDetailReviewsProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useDragScroll(ref);

  return (
    <>
      <Head>
        <h2>여행 후기</h2>
        <IoIosArrowDropright size={30} />
      </Head>

      <Review ref={ref}>
        <List>
          {reviewData.length === 0 ? (
            <p>여행후기가 없습니다</p>
          ) : (
            reviewData.map((item: IProductDetailReviewData) => (
              <Link key={item.reviewId} to={`/review/${item.reviewId}`}>
                <Item>
                  <img
                    onError={(e) => (e.currentTarget.src = thumnail)}
                    src={item.thumbnail}
                    alt="후기 이미지"
                  />
                  <div>
                    <div>
                      <p>
                        <span>{item.createdDate}</span>{" "}
                        <span>조회수 {item.viewCount}</span>
                      </p>
                    </div>
                    <h3>{item.title}</h3>
                  </div>
                </Item>
              </Link>
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
`;
const Review = styled.div`
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const List = styled.div`
  display: flex;
  justify-content: space-between;
  > p {
    margin: 30px auto;
    font-size: 30px;
    font-weight: bold;
  }
  @media screen and (max-width: 850px) {
    width: 850px;
    > p {
      margin: 30px 0;
      margin-left: 50px;
    }
  }
`;
const Item = styled.div`
  width: 30%;
  position: relative;
  img {
    width: 100%;
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
    div {
      p {
        line-height: 24px;
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
