import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import BreadCrumb from "../../commons/Breadcrumb";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import RecommendSlider from "./../review-detail/RecommendSlider";
import { useModal } from "../../hooks/useModal";
import Modal from "../../commons/Modal";
import ProductDetailModal from "./ProductDetailModal";

const ProductDetail = () => {
  const { id } = useParams();
  const {
    state: { image, title, price, discription },
  } = useLocation();

  const [isMore, setIsMore] = useState(false);
  const [isModal, setIsModal] = useState(false);

  console.log(image, title, price, discription);

  const { openModal } = useModal();

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

      <Review>
        <div>
          <h2>여행 후기</h2>
          <IoIosArrowDropright size={30} />
        </div>

        <List>
          {[1, 2, 3].map((item) => (
            <Item key={item}>
              <img src="/product_detail_6.png" alt="후기 이미지" />
              <div>
                <div>
                  <p>김영****</p>
                  <p>
                    <span>2023-04-11</span>
                    <span>조회수 1003</span>
                  </p>
                </div>
                <h3>남미 여행이 어땠냐면</h3>
              </div>
            </Item>
          ))}
        </List>
      </Review>

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
                title: "",
                content: (
                  <ProductDetailModal
                    image={image}
                    title={title}
                    price={price}
                  />
                ),
              });
            }}
          >
            예약하기
          </button>
          <button>장바구니 추가</button>
          <button>위시리스트 추가</button>
          <button>공유하기</button>
        </div>
      </BottomBar>

      <Modal />
    </Wrap>
  );
};

const Wrap = styled.div`
  padding-top: 100px;
  hr {
    width: 90%;
    margin: 30px auto;
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
const Review = styled.div`
  > div {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    h2 {
      margin-right: 10px;
      font-size: 25px;
      font-weight: bold;
    }
  }
`;
const List = styled.div`
  display: flex;
  justify-content: space-between;
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
    padding: 40px 0 59px 40px;
    box-sizing: border-box;
    color: white;
    font-weight: bold;
    div {
      p {
        line-height: 24px;
      }
    }
    h3 {
      font-size: 23px;
    }
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  background-color: #0d99ff;
  p {
    margin-bottom: 50px;
    font-size: 30px;
    color: white;
    font-weight: bold;
  }
  div {
    width: 100%;
    padding: 0 50px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
  }
  button {
    width: 100%;
    margin-right: 10px;
    padding: 10px 40px;
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
