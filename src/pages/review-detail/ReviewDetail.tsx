import React, { useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import Comments from "./Comments";
import RecommendSlider from "../review/RecommendSlider";
import MainContents from "./MainContents";

const ReviewDetail = () => {
  const { id } = useParams();
  const {
    state: { date, thumnail, title, views, name },
  } = useLocation();

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Wrap>
      <Breadcrumb>
        <span>HOME</span>
        <MdKeyboardArrowRight size={20} />
        <span>여행 후기</span>
        <MdKeyboardArrowRight size={20} />
        <span>{title}</span>
      </Breadcrumb>

      <Title>여행후기</Title>

      <Head>
        <h2>{title}</h2>
        <Buttons>
          <button onClick={() => setModalOpen(true)}>수정하기</button>
          <button onClick={() => setModalOpen(true)}>삭제하기</button>
        </Buttons>
        {modalOpen && (
          <Modal>
            <div>
              <GrClose size={25} onClick={() => setModalOpen(false)} />
              <h2>수정하시겠습니까?</h2>
              <form>
                <p>비밀번호</p>
                <div>
                  <input type="text" />
                  <button type="submit">확인</button>
                </div>
              </form>
              <button>수정하기</button>
            </div>
          </Modal>
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

      <RecommendSlider />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 1225px;
  margin: 80px auto;
`;
const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-right: 10px;
  }
  svg {
    margin-right: 10px;
  }
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
const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0000005e;
  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 250px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    background-color: white;
    svg {
      position: absolute;
      right: 40px;
      cursor: pointer;
    }
    h2 {
      margin-top: 40px;
      font-size: 25px;
      font-weight: bold;
      text-align: center;
    }
    form {
      margin-top: 30px;
      width: 80%;
      > div {
        display: flex;
        input {
          width: 100%;
          border: none;
          outline: none;
          border-bottom: 1px solid #000;
          font-size: 15px;
        }
        button {
          padding: 10px;
          flex-shrink: 0;
          margin-left: 10px;
          border: 1px solid #8e8e93;
          border-radius: 8px;
          outline: none;
          background-color: transparent;
          color: #636366;
          cursor: pointer;
        }
      }
    }
    > button {
      width: 80%;
      margin-top: 20px;
      padding: 15px;
      outline: none;
      border: none;
      border-radius: 8px;
      background-color: #0d99ff;
      color: white;
      font-size: 15px;
      cursor: pointer;
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

export default ReviewDetail;
