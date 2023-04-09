import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Product from "./Product";
import Filter from "./Filter";
import { postProductResult } from "../../apis/request";
import { ProductRequestType } from "../../@types/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getMainCategoryName,
  getMiddleCategoryName,
} from "../../utils/category";
import { useRecoilState } from "recoil";
import { categoryState, itemState, pageState } from "../../store/categoryAtom";

interface ContainerProps {
  length: number;
}

const subMenu = {
  groups: ["5070", "gentlemen", "ladies", "family", "anyone"],
  themes: ["culture", "golf", "vacation", "trekking", "pilgrimage"],
  destination: ["asia", "india", "africa", "europe", "america"],
};

const Groups = () => {
  // url에서 현재 페이지값 받아오기(링크로 page를 입력했을 경우를 위함)
  // const urlParams = new URL(location.href).searchParams.get("page");
  // const [currentPage, setCurrentPage] = useState(
  //   urlParams ? Number(urlParams) : 1,
  // );

  // request용 메인 카테고리 데이터(페이지 시작 시 한 번만 호출)
  const categoryLevel = useLocation().pathname.split("/");

  // 카테고리(전역)
  const [category, setCategory] = useRecoilState(categoryState);
  // 페이지(전역)
  const [page, setPage] = useRecoilState(pageState);
  // 상품
  const [items, setItems] = useRecoilState(itemState);

  const navigate = useNavigate();

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    console.log("클릭됐땅", event.currentTarget.id);

    // api 호출
    getProductsData(1, event.currentTarget.id);

    // Link to가 안먹혀서 작성
    navigate(`/${category.categories.mainCategory}/${event.currentTarget.id}`);
  };

  // 상품 조회 api 호출 및 state 변경
  const getProductsData = async (
    changePage: number,
    middleCategory: string | null,
  ) => {
    // Api request 데이터. recoil 합쳐서 만들기
    const requestData: ProductRequestType = {
      category: [
        {
          mainCategory: getMainCategoryName(category.categories.mainCategory),
          middleCategory: getMiddleCategoryName(middleCategory),
        },
      ],
    };

    const result = await postProductResult(requestData, changePage);
    // 네트워크 에러시
    if (result === "Network Error") {
      console.log("네트워크 에러");
      return;
    } else {
      // 현재 카테고리 값 저장
      const { pageNumber, totalPages } = result.data;
      // console.log("test..", pageNumber, totalPages);
      setPage({
        pageNumber,
        totalPages,
      });

      setCategory({
        categories: {
          mainCategory: categoryLevel[1],
          middleCategory: middleCategory,
        },
      });

      // 상품 저장
      setItems(result.data.products);
    }
  };

  useEffect(() => {
    setCategory({
      categories: {
        mainCategory: categoryLevel[1],
        middleCategory: categoryLevel[2],
      },
    });
    // Api 호출
    getProductsData(page.pageNumber, categoryLevel[2]);
    // console.log("아이템은", items);
    // console.log("카테고리는", category);
  }, []);

  // 페이지네이션 함수
  const pagenation = () => {
    let arr = [];

    const clickPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
      getProductsData(
        Number(event.currentTarget.id),
        category.categories.middleCategory,
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    for (let i = 1; i <= page.totalPages; i++) {
      arr.push(
        <Link
          to={`/${category.categories.mainCategory}/${
            category.categories.middleCategory
              ? `${category.categories.middleCategory}/`
              : ""
          }?page=${i}`}
          key={i}
          id={i.toString()}
          onClick={clickPage}
          className={i === page.pageNumber ? "selected" : ""}
        >
          {i}
        </Link>,
      );
    }
    return arr;
  };
  return (
    <Container>
      <div>
        {category.categories.mainCategory === "groups" && (
          <SubMenu length={subMenu["groups"].length}>
            {subMenu["groups"].map((value) => (
              <Link
                className="submenu"
                to={`/${category.categories.mainCategory}/${value}`}
                id={value}
                key={value}
                onClick={onClick}
              >
                {getMiddleCategoryName(value)}
              </Link>
            ))}
          </SubMenu>
        )}
        {category.categories.mainCategory === "themes" && (
          <SubMenu length={subMenu["themes"].length}>
            {subMenu["themes"].map((value) => (
              <Link
                className="submenu"
                to={`/${category.categories.mainCategory}/${value}`}
                id={value}
                key={value}
                onClick={onClick}
              >
                {getMiddleCategoryName(value)}
              </Link>
            ))}
          </SubMenu>
        )}
        {category.categories.mainCategory === "destination" && (
          <SubMenu length={subMenu["destination"].length}>
            {subMenu["destination"].map((value) => (
              <Link
                className="submenu"
                to={`/${category.categories.mainCategory}/${value}`}
                id={value}
                key={value}
                onClick={onClick}
              >
                {getMiddleCategoryName(value)}
              </Link>
            ))}
          </SubMenu>
        )}
        <div className="line"></div>
      </div>
      <div className="body">
        <Filter />
        {items.length ? (
          <Product />
        ) : (
          //   {items.map((value, index) => (
          //     <Product key={index} product={value} />
          //   ))}
          // </Product>
          <div style={{ textAlign: "center", width: "100%", margin: "60px 0" }}>
            상품이 없습니다.
          </div>
        )}
      </div>
      <Pages>
        <li>{"<"}</li>
        {pagenation()}
        <li>{">"}</li>
      </Pages>
    </Container>
  );
};

// 임시 컴포넌트
const Container = styled.div`
  padding-top: 30px;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  h1 {
    width: 298px;
    font-weight: 700;
    font-size: 20px;
  }

  .body {
    display: flex;
    gap: 20px;
    justify-content: space-between;
  }

  @media (max-width: 850px) {
    align-items: center;
    margin: 0;
    gap: 18px;
    .body {
      flex-direction: column;
    }
  }
  .selected {
    font-weight: 700;
  }
`;

const Pages = styled.ul`
  display: flex;
  justify-content: center;
  gap: 16px;

  @media (max-width: 850px) {
    justify-content: space-between;
    font-size: 14px;
  }
`;

const SubMenu = styled.div<ContainerProps>`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(${(props) => props.length}, 1fr);
  grid-auto-rows: 50px;
  position: sticky;
  background-color: rgba(255, 255, 255, 0.7);

  @supports (position: sticky) or (position: -webkit-sticky) {
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }

  .submenu {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin: 0 -1px 0 0;
    font-size: 20px;
    &:hover {
      color: #0080c6;
      background-color: #e9e9e9;
    }
  }

  .line {
    width: 100%;
    margin-top: -30px;
    border-top: 1px solid var(--color-grayscale10);
  }

  // 모바일 환경
  @media (max-width: 850px) {
    position: absolute;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 40px;
    width: 100%;

    .submenu {
      font-size: 16px;
      border: 1px solid var(--color-grayscale10);
      &:nth-child(4),
      &:nth-child(5),
      &:nth-child(6) {
        margin-top: -1px;
      }
    }
    .line {
      margin-top: 36px;
      border-top: none;
    }
  }
`;

export default Groups;
