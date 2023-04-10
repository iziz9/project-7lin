import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Comments from "./Comments";
import RecommendSlider from "./RecommendSlider";
import MainContents from "./MainContents";
import ReviewModal from "../../commons/ReviewModal";
import BreadCrumb from "./../../commons/Breadcrumb";
import { useMediaQuery } from "react-responsive";
import { FiMoreVertical } from "react-icons/fi";
import { useModal } from "../../hooks/useModal";
import Modal from "../../commons/Modal";
import { useQuery } from "react-query";
import { getAllReviews, getReviewDetail } from "../../apis/request";
import { GetReviewDetailData } from "../../@types/data";
import ProductInfosCard from "../../commons/ProductInfosCard";

const ReviewDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { isLoading, data } = useQuery(["getReviewDetail"], () => {
    if (id) return getReviewDetail(id);
  }) as { isLoading: boolean; data: GetReviewDetailData };

  const { isLoading: atherDataLoading, data: atherData } = useQuery(
    ["getAllReviews"],
    getAllReviews,
  );
  console.log(atherData);

  const [mobileBtnOpen, setMobileBtnOpen] = useState(false);

  const isMobile: boolean = useMediaQuery({
    query: "(max-width:850px)",
  });

  const { openModal } = useModal();

  const handleModalOpen = (mode: string) => {
    if (isMobile) {
      setMobileBtnOpen(false);
      openModal({
        title: `${mode}하시겠습니까?`,
        content: <ReviewModal title={mode} />,
      });
    } else
      openModal({
        title: `${mode}하시겠습니까?`,
        content: <ReviewModal title={mode} />,
      });
  };

  const date = !isLoading && new Date(data.createdDate);

  return (
    <>
      {!isLoading && (
        <Wrap>
          <BreadCrumb
            data={[
              {
                title: "HOME",
                link: "/",
              },
              {
                title: "여행 후기",
                link: "/review",
              },
              {
                title: data.reviewTitle,
                link: `/review/${data.reviewId}`,
              },
            ]}
          />

          <Title>여행후기</Title>

          {isMobile ? <h2>{data.reviewTitle}</h2> : null}

          <Infos>
            <Left>
              <img src="/profile_img.png" alt="프로필 이미지" />
              <div>
                <div>
                  <strong>{data.reviewWriter}</strong>
                  <Rating>
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiOutlineStar />
                    <span>{data.reviewGrade}점</span>
                  </Rating>
                </div>
                <div>
                  <p>조회 {data.viewCount}</p>
                  <p>
                    {date &&
                      `${date.getFullYear()}년 ${date.getMonth()} + 1월
                    ${date.getDate()}일 ${date.getHours()}:${date.getMinutes()}`}
                    작성
                  </p>
                </div>
              </div>
            </Left>
            <Right>
              {isMobile ? (
                <MobileBtns>
                  <FiMoreVertical
                    size={30}
                    onClick={() => setMobileBtnOpen((prev) => !prev)}
                  />
                  {mobileBtnOpen ? (
                    <div>
                      <button onClick={() => handleModalOpen("수정")}>
                        수정하기
                      </button>
                      <button onClick={() => handleModalOpen("삭제")}>
                        삭제하기
                      </button>
                    </div>
                  ) : null}
                </MobileBtns>
              ) : (
                <Buttons>
                  <button onClick={() => handleModalOpen("수정")}>
                    수정하기
                  </button>
                  <button onClick={() => handleModalOpen("삭제")}>
                    삭제하기
                  </button>
                </Buttons>
              )}
            </Right>
          </Infos>
          <Modal />

          <Main>
            {isMobile ? null : <h1>{data.reviewTitle}</h1>}

            <ProductInfosCard
              title={data.productTitle}
              period={data.reviewReservationPeriodDTOList}
              option={data.reviewReservationOptionDTOList}
              price={data.reservationPrice}
              count={data.reservationPeople}
              image={data.productThumbnail}
            />

            <MainContents data={data.reviewContentDTOList} tag={data.tagList} />
          </Main>

          {/* <Comments /> */}

          <Recommend>
            <RecommendHead>
              <h2>다른 후기 보기</h2>
              <span onClick={() => navigate("/review")}>
                전체 후기 목록 보기
              </span>
            </RecommendHead>
            <RecommendSlider data={atherData?.reviewList}></RecommendSlider>
          </Recommend>
        </Wrap>
      )}
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  margin: 80px auto;
  padding: 0 10px;
  box-sizing: border-box;
  > h2 {
    margin-top: 20px;
    font-size: 40px;
    font-weight: bold;
  }
`;
const Title = styled.h1`
  margin-top: 50px;
  font-size: 30px;
  font-weight: bold;
  @media screen and (max-width: 850px) {
    font-size: 20px;
    color: #5b5b5b;
  }
`;
const Infos = styled.div`
  margin-top: 40px;
  padding-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #636366;
`;
const Left = styled.div`
  display: flex;
  img {
    margin-right: 20px;
  }
  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0;
    > div {
      display: flex;
      strong {
        margin-right: 30px;
        font-size: 20px;
        font-weight: bold;
      }
      p {
        margin-right: 30px;
      }
    }
  }
`;
const Rating = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 10px;
  }
  span {
    font-size: 14px;
  }
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  font-size: 14px;
  color: #5b5b5b;
  p {
    margin-top: 20px;
    :last-child {
      font-weight: bold;
    }
  }
`;
const Main = styled.div`
  padding-top: 50px;
  h1 {
    margin-bottom: 50px;
    font-size: 45px;
    font-weight: bold;
  }
`;
const Buttons = styled.div`
  button {
    margin-left: 20px;
    padding: 15px 35px;
    border: none;
    outline: none;
    font-size: 17px;
    background-color: transparent;
    border-radius: 8px;
    cursor: pointer;
    :first-child {
      border: 2px solid #848484;
      color: #848484;
    }
    :last-child {
      border: 2px solid #e14544;
      color: #e14544;
    }
  }
`;
const MobileBtns = styled.div`
  position: relative;
  cursor: pointer;
  div {
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    width: 100px;
    box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: white;
    button {
      font-size: 17px;
      border: none;
      outline: none;
      padding: 13px 0;
      border-radius: 8px;
      background-color: white;
      cursor: pointer;
      :hover {
        font-weight: bold;
      }
      :last-child {
        color: #e14544;
      }
    }
  }
`;
const Recommend = styled.div`
  margin-top: 70px;
`;
const RecommendHead = styled.div`
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 30px;
    font-weight: bold;
    color: #5b5b5b;
  }
  span {
    font-size: 18px;
    color: #5b5b5b;
  }
`;
export default ReviewDetail;
