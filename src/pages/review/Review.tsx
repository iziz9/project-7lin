import { BsSearch } from "react-icons/bs";
import styled from "styled-components";
import ReviewFilters from "./ReviewFilters";
import ReviewItems from "./ReviewItems";

const Review = () => {
  const pageNum = new Array<number>();

  for (let i = 1; i <= 10; i++) {
    pageNum.push(i);
  }

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
          <ReviewBtn>후기 작성하기</ReviewBtn>
        </Contents>
      </Head>

      <ReviewFilters />

      <ReviewItems />

      <Paging>
        <Btn>
          <img src="/front_icon.svg" alt="맨 앞 페이지로 가기" />
        </Btn>
        <Btn>
          <img src="/Arrow-Left_icon.svg" alt="이전 페이지로 가기" />
        </Btn>
        {/* 최대 5개 페이지만 보이고 이동할때마다 해당 페이지를 중심으로 5개씩만 보여주기 */}
        {pageNum.map((item) => (
          <span key={item}>{item}</span>
        ))}
        <Btn>
          <img src="/Arrow-Right_icon.svg" alt="다음 페이지로 가기" />
        </Btn>
        <Btn>
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
`;
const Title = styled.h1`
  font-size: 40px;
  color: #5b5b5b;
  font-weight: bold;
`;
const Contents = styled.div`
  display: flex;
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
`;
const Paging = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  span {
    display: inline-block;
    margin: 0 2px;
    border-radius: 5px;
    padding: 1px 3px;
    box-sizing: border-box;
    border: 1px solid transparent;
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
`;

export default Review;
