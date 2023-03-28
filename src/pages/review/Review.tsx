import { BsSearch } from "react-icons/bs";
import styled from "styled-components";
import ReviewFilters from "./ReviewFilters";
import ReviewItems from "./ReviewItems";
import { useState } from "react";
import Footer from "./../../commons/Footer";

const Review = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [paging, setPaging] = useState<number[]>([0, 5]);
  const [selectPage, setSelectPage] = useState<number>(1);

  const pageNum = new Array<number>();

  for (let i = 1; i <= 10; i++) {
    pageNum.push(i);
  }

  const handleClick = () => {
    setModalOpen((prev) => !prev);
  };

  const prevPageClick = () => {
    if (paging[0] !== 0) {
      setPaging((prev) => [prev[0] - 1, prev[1] - 1]);
    }
  };
  const nextPageClick = () => {
    if (paging[1] !== 10) {
      setPaging((prev) => [prev[0] + 1, prev[1] + 1]);
    }
  };

  return (
    <Wrap>
      <Head>
        <Title>여행 후기</Title>
        <Contents>
          <Search>
            <input
              type="search"
              name="review"
              placeholder="검색어를 입력하세요"
            />
            <button>
              <BsSearch size={23} color="#939393" />
            </button>
          </Search>
          <ReviewBtn onClick={handleClick}>후기 작성하기</ReviewBtn>
        </Contents>
        {modalOpen && (
          <Modal>
            <form>
              <span>예약번호</span>
              <input type="text" />
              <button type="submit">인증</button>
            </form>
            <Button>후기 작성하기</Button>
          </Modal>
        )}
      </Head>

      <ReviewFilters />

      <ReviewItems />

      <Paging>
        <Btn onClick={() => (paging[0] !== 0 ? setPaging([0, 5]) : null)}>
          <img src="/front_icon.svg" alt="맨 앞 페이지로 가기" />
        </Btn>
        <Btn onClick={prevPageClick}>
          <img src="/Arrow-Left_icon.svg" alt="이전 페이지로 가기" />
        </Btn>
        {/* 최대 5개 페이지만 보이고 이동할때마다 해당 페이지를 중심으로 5개씩만 보여주기 */}
        {pageNum.slice(paging[0], paging[1]).map((item) => (
          <Numbers key={item} selectPage={selectPage}>
            <span
              style={{ fontWeight: selectPage === item ? "bold" : "normal" }}
              onClick={() => setSelectPage(item)}
            >
              {item}
            </span>
          </Numbers>
        ))}
        <Btn onClick={nextPageClick}>
          <img src="/Arrow-Right_icon.svg" alt="다음 페이지로 가기" />
        </Btn>
        <Btn onClick={() => (paging[1] !== 10 ? setPaging([5, 10]) : null)}>
          <img src="/back_icon.svg" alt="맨 뒤 페이지로 가기" />
        </Btn>
      </Paging>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 1225px;
  margin: 80px auto;
`;
const Head = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;
const Title = styled.h1`
  font-size: 40px;
  color: #111111;
  font-weight: bold;
`;
const Contents = styled.div`
  display: flex;
`;

const Modal = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  width: 350px;
  padding: 25px;
  border: 1px solid #939393;
  border-radius: 8px;
  z-index: 5;
  background-color: white;
  form {
    position: relative;
    display: flex;
    margin-bottom: 30px;
    span {
      position: absolute;
      bottom: 16px;
      left: 10px;
      font-size: 17px;
    }
    input {
      width: 100%;
      padding: 10px;
      padding-left: 25%;
      border: none;
      outline: none;
      border-bottom: 1px solid black;
      font-size: 17px;
    }
    button {
      flex-shrink: 0;
      margin-left: 10px;
      padding: 10px;
      border-radius: 8px;
      border: 2px solid #0d99ff;
      outline: none;
      background-color: white;
      color: #0d99ff;
      font-weight: bold;
      font-size: 16px;
      cursor: pointer;
    }
  }
`;
const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #0d99ff;
  outline: none;
  border: none;
  border-radius: 8px;
  font-size: 17px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

const Search = styled.form`
  position: relative;
  input {
    display: inline-block;
    width: 300px;
    padding: 15px;
    outline: none;
    border: none;
    border: 1px solid #939393;
    border-radius: 8px;
    font-size: 16px;
    ::placeholder {
      color: #c2c2c2;
    }
  }
  button {
    position: absolute;
    top: 25%;
    right: 10px;
    outline: none;
    border: none;
    background-color: transparent;
  }
`;
const ReviewBtn = styled.button`
  margin-left: 15px;
  padding: 0 25px;
  font-size: 16px;
  background-color: #0d99ff;
  color: white;
  font-weight: bold;
  outline: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const Paging = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;
const Numbers = styled.div<{ selectPage: number }>`
  span {
    display: inline-block;
    margin: 0 2px;
    border-radius: 5px;
    padding: 1px 3px;
    box-sizing: border-box;
    border: 1px solid transparent;
    cursor: pointer;
    :nth-child(
        ${({ selectPage }) => {
            return selectPage;
          }}
      ) {
      font-weight: bold;
    }
    :hover {
      border: 1px solid black;
    }
  }
`;

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
`;

export default Review;
