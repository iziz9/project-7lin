import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";
import ReviewItems from "./ReviewItems";
import { useState } from "react";
import ReviewFilterItem from "./ReviewFilterItem";
import { ReviewFilterData } from "../../@types/data";
import { useDragScroll } from "../../utils/useDragScroll";
import { useMediaQuery } from "react-responsive";
import { useModal } from "../../hooks/useModal";
import Modal from "../../commons/Modal";
import ReviewModal from "./ReviewModal";
import { useQuery } from "react-query";
import { getAllReviews } from "../../apis/request";
import { useNavigate } from "react-router";

const reviewFilterData: ReviewFilterData = {
  group: {
    content: [
      "그룹별 여행 전체",
      "5070끼리",
      "남자끼리",
      "여자끼리",
      "가족끼리",
      "누구든지",
    ],
  },
  location: {
    content: [
      "지역별 여행 전체",
      "동남아/태평양",
      "인도/중앙아시아",
      "아프리카/중동",
      "유럽/코카서스",
      "중남미/북미",
      "대만/중국/일본",
    ],
  },
  theme: {
    content: [
      "테마별 여행 전체",
      "문화탐방",
      "골프여행",
      "휴양지",
      "트레킹",
      "성지순례",
      "볼론투어",
    ],
  },
  sort: {
    content: ["최신순", "조회순", "평점높은순", "평점낮은순"],
  },
};

const Review = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [paging, setPaging] = useState<number[]>([0, 5]);
  const [selectPage, setSelectPage] = useState<number>(1);

  const navigate = useNavigate();

  const scrollRef = useRef<HTMLDivElement>(null);
  useDragScroll(scrollRef);

  const { isLoading, data } = useQuery(["getAllReviews"], getAllReviews);

  console.log(data);

  const pageNum = new Array<number>();

  const { openModal } = useModal();

  const isMobile: boolean = useMediaQuery({
    query: "(max-width:850px)",
  });

  for (let i = 1; i <= 10; i++) {
    pageNum.push(i);
  }

  const prevPageClick = () => {
    if (selectPage !== 1) {
      setSelectPage((prev) => prev - 1);
    }
    if (paging[0] !== 0) {
      setPaging((prev) => [prev[0] - 1, prev[1] - 1]);
    }
  };
  const nextPageClick = () => {
    if (selectPage !== 10) {
      setSelectPage((prev) => prev + 1);
    }
    if (paging[1] !== 10) {
      setPaging((prev) => [prev[0] + 1, prev[1] + 1]);
    }
  };
  const prevEndPageClick = () => {
    if (selectPage !== 1) {
      setSelectPage(1);
    }
    if (paging[0] !== 0) {
      setPaging([0, 5]);
    }
  };
  const nextEndPageClick = () => {
    if (selectPage !== 10) {
      setSelectPage(10);
    }
    if (paging[1] !== 10) {
      setPaging([5, 10]);
    }
  };

  return (
    <>
      {!isLoading && (
        <Wrap>
          <Head>
            <Title>여행 후기</Title>
            <Contents>
              {/* {isMobile ? null : (
                <Search isMobile={isMobile}>
                  <input
                    type="text"
                    name="review"
                    placeholder="검색어를 입력하세요"
                  />
                  <button>
                    <BsSearch size={23} color="#939393" />
                  </button>
                </Search>
              )} */}
              <ReviewBtn
                onClick={
                  () => {
                    navigate("/review/write", { state: {} });
                  }

                  // openModal({
                  //   title: "예약번호를 입력해주세요",
                  //   content: <ReviewModal />,
                  // })
                }
              >
                후기 작성하기
              </ReviewBtn>
            </Contents>

            <Modal />
          </Head>

          {isMobile ? (
            <Search isMobile={isMobile}>
              <input
                type="text"
                name="review"
                placeholder="검색어를 입력하세요"
              />
              <button>
                <BsSearch size={23} color="#939393" />
              </button>
            </Search>
          ) : null}

          <Filtering ref={scrollRef}>
            {Object.keys(reviewFilterData).map((key: string) => (
              <ReviewFilterItem
                key={key}
                title={key}
                content={reviewFilterData[key].content}
              />
            ))}
          </Filtering>

          <ReviewItems data={data?.reviewList} />

          <Paging>
            <Btn onClick={prevEndPageClick}>
              <img src="/front_icon.svg" alt="맨 앞 페이지로 가기" />
            </Btn>
            <Btn onClick={prevPageClick}>
              <img src="/Arrow-Left_icon.svg" alt="이전 페이지로 가기" />
            </Btn>
            최대 5개 페이지만 보이고 이동할때마다 해당 페이지를 중심으로 5개씩만
            보여주기
            {pageNum.slice(paging[0], paging[1]).map((item) => (
              <Numbers key={item}>
                <span
                  style={{
                    fontWeight: selectPage === item ? "bold" : "normal",
                    borderColor: selectPage === item ? "black" : "transparent",
                  }}
                  onClick={() => setSelectPage(item)}
                >
                  {item}
                </span>
              </Numbers>
            ))}
            <Btn onClick={nextPageClick}>
              <img src="/Arrow-Right_icon.svg" alt="다음 페이지로 가기" />
            </Btn>
            <Btn onClick={nextEndPageClick}>
              <img src="/back_icon.svg" alt="맨 뒤 페이지로 가기" />
            </Btn>
          </Paging>
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

const Search = styled.form<{ isMobile: boolean }>`
  position: relative;
  width: ${({ isMobile }) => (isMobile ? "100%" : "")};
  margin-top: ${({ isMobile }) => (isMobile ? "30px" : "")};
  input {
    display: inline-block;
    width: ${({ isMobile }) => (isMobile ? "95%" : "300px")};
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

const Filtering = styled.div`
  width: 100%;
  display: flex;
  margin: 30px 0;
  position: relative;
  @media screen and (max-width: 900px) {
    overflow-x: scroll;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Paging = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;
const Numbers = styled.div`
  span {
    display: inline-block;
    margin: 0 2px;
    border-radius: 5px;
    padding: 2px 3px;
    box-sizing: border-box;
    border: 1px solid transparent;
    cursor: pointer;
  }
  :hover span {
    font-weight: bold;
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
