import React, { useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Comments from "./Comments";
import RecommendSlider from "./RecommendSlider";
import MainContents from "./MainContents";
import ReviewModal from "../../commons/ReviewModal";
import BreadCrumb from "./../../commons/Breadcrumb";

const ReviewDetail = () => {
  const { id } = useParams();
  const {
    state: { date, thumnail, title, views, name },
  } = useLocation();

  const [modalOpen, setModalOpen] = useState("");

  return (
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
            title,
            link: `/review/${id}`,
          },
        ]}
      />

      <Title>여행후기</Title>

      <Head>
        <h2>{title}</h2>
        <Buttons>
          <button onClick={() => setModalOpen("edit")}>수정하기</button>
          <button onClick={() => setModalOpen("delete")}>삭제하기</button>
        </Buttons>
        {modalOpen === "edit" && (
          <ReviewModal title="수정" setModalOpen={setModalOpen} />
        )}
        {modalOpen === "delete" && (
          <ReviewModal title="삭제" setModalOpen={setModalOpen} />
        )}
      </Head>

      <Infos>
        <Left>
          <img src="/profile_img.png" alt="프로필 이미지" />
          <div>
            <p>{name}</p>
            <Rating>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
              <span>4.3점</span>
            </Rating>
          </div>
        </Left>
        <Right>
          <p>{date} 작성</p>
          <p>조회 {views}</p>
        </Right>
      </Infos>

      <MainContents thumnail={thumnail} />

      <Comments />

      <Recommend>
        <RecommendHead>
          <h2>다른 상품 후기 보기</h2>
          <span>전체 후기 목록 보기</span>
        </RecommendHead>
        <RecommendSlider>
          <strong>후기 글 제목</strong>
        </RecommendSlider>
      </Recommend>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 1225px;
  margin: 80px auto;
`;

const Title = styled.h1`
  margin-top: 50px;
  font-size: 22px;
  color: #5b5b5b;
`;
const Head = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  h2 {
    font-size: 40px;
  }
`;
const Buttons = styled.div`
  button {
    margin-left: 20px;
    padding: 15px 35px;
    border: none;
    outline: none;
    font-size: 15px;
    background-color: transparent;
    border-radius: 8px;
    cursor: pointer;
    :first-child {
      border: 1px solid #848484;
      color: #848484;
    }
    :last-child {
      border: 1px solid #e14544;
      color: #e14544;
    }
  }
`;
const Infos = styled.div`
  margin-top: 40px;
  padding-bottom: 30px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #4a4a4a;
`;
const Left = styled.div`
  display: flex;
  img {
    margin-right: 20px;
  }
  p {
    margin-top: 10px;
    margin-bottom: 20px;
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
