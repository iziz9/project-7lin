import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDragScroll } from "../../utils/useDragScroll";
import { useMediaQuery } from "react-responsive";
import { GetAllReviewsReviewList, IRelatedProduct } from "../../@types/data";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

interface IRecommendSliderProps {
  data: GetAllReviewsReviewList[] | IRelatedProduct[] | undefined;
  type: string;
}

const RecommendSlider = ({ data, type }: IRecommendSliderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [view, setView] = useState([0, 4]);

  // 가로스크롤 마우스
  useDragScroll(ref);

  const isMobile: boolean = useMediaQuery({
    query: "(max-width:850px)",
  });

  useEffect(() => {
    console.log(isMobile);

    if (data && isMobile) setView([0, data.length]);
    else setView([0, 4]);
  }, [isMobile]);

  return (
    <Wrap ref={ref}>
      <Recommend>
        <RecommendMain isMobile={isMobile}>
          <button
            onClick={() =>
              setView((prev) =>
                prev[0] === 0 ? [...prev] : [prev[0] - 4, prev[1] - 4],
              )
            }
          >
            <IoIosArrowBack size={30} />
          </button>
          <Imgs type={type}>
            <AnimatePresence>
              {type === "후기" &&
                data
                  ?.slice(view[0], view[1])
                  .map(
                    (
                      item: GetAllReviewsReviewList | IRelatedProduct,
                      index: number,
                    ) => (
                      <motion.div
                        key={"productId" in item ? item.productId : index}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{
                          x: 0,
                          opacity: 1,
                          transition: { duration: 0.3 },
                        }}
                      >
                        <Link
                          key={"reviewId" in item ? item.reviewId : index}
                          to={`/review/${
                            "reviewId" in item ? item.reviewId : ""
                          }`}
                        >
                          <img
                            src={"reviewId" in item ? item.reviewThumbnail : ""}
                            alt="추천 후기 이미지"
                          />
                          <div className="review">
                            <strong>
                              {"reviewId" in item ? item.reviewTitle : ""}
                            </strong>
                          </div>
                        </Link>
                      </motion.div>
                    ),
                  )}
              {type === "연관" &&
                data
                  ?.slice(view[0], view[1])
                  .map(
                    (
                      item: GetAllReviewsReviewList | IRelatedProduct,
                      index: number,
                    ) => (
                      <motion.div
                        key={"productId" in item ? item.productId : index}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{
                          x: 0,
                          opacity: 1,
                          transition: { duration: 0.3 },
                        }}
                      >
                        <Link
                          to={`/product/${
                            "productId" in item ? item.productId : ""
                          }`}
                        >
                          <img
                            src={"thumbnail" in item ? item.thumbnail : ""}
                            alt="추천 후기 이미지"
                          />
                          <div className="related">
                            <p>
                              {"productName" in item ? item.productName : ""}
                            </p>
                            <p>
                              {"productPrice" in item
                                ? item.productPrice.toLocaleString()
                                : ""}
                              원
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    ),
                  )}
            </AnimatePresence>
          </Imgs>
          <button
            onClick={() =>
              setView((prev) =>
                data && data?.length <= prev[1]
                  ? [...prev]
                  : [prev[0] + 4, prev[1] + 4],
              )
            }
          >
            <IoIosArrowForward size={30} />
          </button>
        </RecommendMain>
      </Recommend>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding-top: 30px;
  padding-bottom: 15%;
  overflow-x: scroll;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
  button {
    cursor: pointer;
  }
`;

const Recommend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const RecommendMain = styled.div<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? "100%" : "92%")};
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  button {
    padding: 10px;
    display: ${({ isMobile }) => (isMobile ? "none" : "flex")};
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    border: none;
    border-radius: 100%;
    background-color: white;
    box-shadow: 0px 0px 10px #aaa;
    :first-child {
      left: -25px;
    }
    :last-child {
      right: -25px;
    }
  }
`;
const Imgs = styled.div<{ type: string }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 23.5%));
  grid-gap: 0 2%;
  @media screen and (max-width: 850px) {
    display: flex;
    grid-gap: 0 20px;
  }
  a {
    display: block;
    width: 100%;
    height: 90%;
    position: relative;
    @media screen and (max-width: 850px) {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
    }
    img {
      margin-bottom: 10px;
      width: 100%;
      height: ${({ type }) => (type === "후기" ? "100%" : "")};
      border-radius: 10px;
    }
    div {
      width: 100%;
      position: absolute;
      strong {
        font-size: 23px;
        font-weight: bold;
        display: block;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        @media screen and (max-width: 850px) {
          font-size: 20px;
        }
      }
      p {
        line-height: 25px;
        :nth-child(1) {
          font-size: 20px;
          font-weight: bold;
        }
        :nth-child(2) {
          font-size: 18px;
        }
      }
    }
  }
`;
const Item = styled(Link);

export default RecommendSlider;
