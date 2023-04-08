import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import BreadCrumb from "../../commons/Breadcrumb";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import RecommendSlider from "./../review-detail/RecommendSlider";
import { useModal } from "../../hooks/useModal";
import Modal from "../../commons/Modal";
import ProductDetailModal from "./ProductDetailModal";
import ProductDetailReviews from "./ProductDetailReviews";
import { useMediaQuery } from "react-responsive";

const ProductDetail = () => {
  const { id } = useParams();
  const {
    state: { image, title, price, discription },
  } = useLocation();

  const [isMore, setIsMore] = useState(false);

  console.log(image, title, price, discription);

  const { openModal, closeModal } = useModal();

  const isMobile: boolean = useMediaQuery({
    query: "(max-width:850px)",
  });

  return (
    <Wrap>
      <BreadCrumb
        data={[
          {
            title: "HOME",
            link: "/",
          },
          {
            title: "그룹별 여행",
            link: "/groups",
          },
          {
            title: "5070끼리",
            link: "/",
          },
          {
            title: "액티브 시니어",
            link: "/",
          },
        ]}
      />

      <Img>
        <img src={image} alt={title} />
      </Img>

      <Infos>
        <h1>{title}</h1>
        <Rating>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
          <span>4.3점 (14,305)</span>
        </Rating>
        <p>
          페루/볼리비아/칠레/아르헨티나/브라질
          <br />
          이스터 섬에서 아마존까지!
          <br />
          활동적인 액티비티 한 가득한 남미 탐험 여행
        </p>
        <ul>
          <li>
            <img src="/product_detail_icon_1.svg" alt="그룹 투어 아이콘" />
            그룹 투어
          </li>
          <li>
            <img src="/product_detail_icon_2.svg" alt="36박 37일 아이콘" />
            36박 37일
          </li>
          <li>
            <img src="/product_detail_icon_3.svg" alt="가이드 동행 아이콘" />
            가이드 동행
          </li>
          <li>
            <img src="/product_detail_icon_4.svg" alt="호텔 제공 아이콘" />
            호텔 제공
          </li>
          <li>
            <img src="/product_detail_icon_5.svg" alt="4인 이상 아이콘" />
            4인 이상
          </li>
          <li>
            <img src="/product_detail_icon_6.svg" alt="차량 이동 아이콘" />
            차량 이동
          </li>
        </ul>
      </Infos>

      <hr />

      <ProductDetailReviews />

      <hr />

      <Discription isMore={isMore}>
        <h1>상품설명</h1>
        <div>
          <img src="/product_detail_1.jpg" alt="상품설명" />
          <img src="/product_detail_2.jpg" alt="상품설명" />
          <img src="/product_detail_3.jpg" alt="상품설명" />
          <img src="/product_detail_4.jpg" alt="상품설명" />
          <img src="/product_detail_5.jpg" alt="상품설명" />
          {/* '포함 및 불포함 사항', '상세일정' 까지 이미지 */}
        </div>
        <button onClick={() => setIsMore((prev) => !prev)}>
          {isMore ? "상품 설명 접기" : "상품 설명 더 보기"}
        </button>
      </Discription>

      <hr />

      <Order>
        {/* framer-motion 으로 드롭 다운 */}
        <h2>예약 방법</h2>
        <img src="/product_detail_7.png" alt="예약방법 이미지" />
      </Order>

      <hr />

      {/* 해당 카테고리의 상품들 가져오기 */}
      {/* 슬라이드를 재사용 컨포넌트로 만들기 */}
      <Recommend>
        <h2>연관상품</h2>
        <RecommendSlider>
          <p>36박 37일 남미 5개국 탐험</p>
          <p>123,334,747원</p>
        </RecommendSlider>
      </Recommend>

      <BottomBar>
        <p>123,334,747원 부터~</p>
        <div>
          <button
            onClick={() => {
              openModal({
                title: "옵션 선택",
                content: (
                  <ProductDetailModal
                    image={image}
                    title={title}
                    price={price}
                    closeModal={closeModal}
                    type="선택"
                  />
                ),
              });
            }}
          >
            {isMobile ? "예약" : "예약하기"}
          </button>
          <button>{isMobile ? "장바구니" : "장바구니 추가"}</button>
          <button>{isMobile ? "찜" : "찜에 추가하기"}</button>
          <button>{isMobile ? "공유" : "공유하기"}</button>
        </div>
      </BottomBar>

      <Modal />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  padding: 100px 10px 0;
  box-sizing: border-box;
  hr {
    width: 90%;
    margin: 30px auto;
  }
  img {
    width: 100%;
  }
  @media screen and (max-width: 850px) {
    padding-bottom: 200px;
  }
`;
const Img = styled.div`
  margin-top: 27px;
  height: 354px;
  display: flex;
  align-items: center;
  overflow-y: hidden;
  img {
    width: 100%;
  }
`;
const Infos = styled.div`
  margin-top: 35px;
  h1 {
    font-size: 30px;
    font-weight: bold;
  }
  p {
    font-size: 18px;
    line-height: 28px;
  }
  ul {
    margin-top: 25px;
    width: 529px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    @media screen and (max-width: 850px) {
      width: 100%;
    }
    @media screen and (max-width: 500px) {
      display: block;
      li {
        margin-bottom: 20px;
      }
    }
    li {
      display: flex;
      align-items: center;
      img {
        width: 40px;
        margin-right: 15px;
      }
    }
  }
`;
const Rating = styled.div`
  margin: 23px 0;
  display: flex;
  align-items: center;
  svg {
    margin-right: 10px;
  }
`;

const Discription = styled.div<{ isMore: boolean }>`
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 50px;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: ${({ isMore }) => (isMore ? "" : "200px")};
    overflow-y: ${({ isMore }) => (isMore ? "visible" : "hidden")};
  }
  button {
    align-self: center;
    padding: 15px;
    margin-top: 30px;
    font-size: 15px;
    border-radius: 8px;
    border: 1px solid #000;
    background-color: transparent;
    font-weight: bold;
    cursor: pointer;
    outline: none;
  }
`;
const Order = styled.div`
  h2 {
    font-size: 25px;
    font-weight: bold;
  }
`;
const Recommend = styled.div`
  h2 {
    font-size: 25px;
    font-weight: bold;
  }
`;

const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  background-color: #0d99ff;
  @media screen and (max-width: 850px) {
    bottom: 80px;
    p {
      font-size: 20px;
    }
  }
  p {
    margin-bottom: 30px;
    font-size: 30px;
    color: white;
    font-weight: bold;
    @media screen and (max-width: 850px) {
      font-size: 25px;
    }
  }
  div {
    width: 100%;
    padding: 0 50px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    @media screen and (max-width: 850px) {
      padding: 0 10px;
      button {
        padding: 10px 0;
        border-radius: 10px;
      }
    }
  }
  button {
    width: 100%;
    margin-right: 10px;
    padding: 10px 0;
    border: 3px solid white;
    border-radius: 60px;
    background-color: transparent;
    color: white;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }
`;

export default ProductDetail;
