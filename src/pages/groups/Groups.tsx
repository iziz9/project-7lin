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
import {
  FilterCategoryState,
  categoryState,
  filterState,
  itemState,
  pageState,
  sortState,
} from "../../store/categoryAtom";
import { useMediaQuery } from "react-responsive";
import Sort from "./Sort";
import { getSortName } from "../../utils/sort";
import { getPeriodRange, getPriceRange } from "../../utils/filter";

interface ContainerProps {
  length: number;
}

const subMenu = {
  groups: ["5070", "gentlemen", "ladies", "family", "anyone"],
  themes: ["culture", "golf", "vacation", "trekking", "pilgrimage"],
  destination: ["asia", "india", "africa", "europe", "america"],
};

const Groups = () => {
  // 반응형
  const isMobile = useMediaQuery({ query: "(max-width:850px)" });

  // request용 메인 카테고리 데이터(페이지 시작 시 한 번만 호출)
  const categoryLevel = useLocation().pathname.split("/");

  // 카테고리(전역)
  const [category, setCategory] = useRecoilState(categoryState);
  // 페이지(전역)
  const [page, setPage] = useRecoilState(pageState);
  // 정렬(전역)
  const [sort, setSort] = useRecoilState(sortState);
  // 상품(전역)
  const [items, setItems] = useRecoilState(itemState);
  // 필터(전역)
  const [filter, setFilter] = useRecoilState(filterState);
  // 추가 카테고리 필터(전역)
  const [filterCategory, setFilterCategory] =
    useRecoilState(FilterCategoryState);

  const navigate = useNavigate();

  // 상품 조회 api 호출 및 state 변경
  const getProductsData = async (
    paramsPageNumber: number,
    paramsMiddleCategory: string | null,
    paramsSort: string | null,
    paramsFilter?: object | null,
    paramsFilterCategory?: [],
  ) => {
    // Api request 데이터. recoil 합쳐서 만들기
    const requestData: ProductRequestType = {
      categories: [
        {
          mainCategory: getMainCategoryName(category.categories.mainCategory),
          middleCategory: getMiddleCategoryName(paramsMiddleCategory),
        },
      ],
      sort: paramsSort,
      ...paramsFilter,
    };

    if (paramsFilterCategory !== undefined) {
      paramsFilterCategory.forEach((element) => {
        requestData.categories.push(element);
      });
    }

    console.log("최종 데이터", requestData);

    const result = await postProductResult(requestData, paramsPageNumber);
    // 네트워크 에러시
    if (result === "Network Error") {
      console.log("네트워크 에러");
      return;
    } else {
      const { pageNumber, totalPages } = result.data;

      // 페이지 값 저장
      setPage({
        // pageNumber= paramsPageNumber ?
        pageNumber,
        totalPages,
      });

      // 카테고리 값 저장
      setCategory({
        categories: {
          mainCategory: categoryLevel[1],
          middleCategory: paramsMiddleCategory,
        },
      });

      // 호출 결과 상품 값 저장
      setItems(result.data.products);

      // 정렬 값 저장
      setSort({ sort: paramsSort });

      // 필터 값 저장
      paramsFilter ? setFilter(paramsFilter) : "";

      if (paramsFilterCategory !== undefined) {
        setFilterCategory(paramsFilterCategory);
      }
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
    getProductsData(page.pageNumber, categoryLevel[2], null);
    // console.log("아이템은", items);
    // console.log("카테고리는", category);
  }, []);

  // 페이지네이션 함수
  const pagenation = () => {
    let arr = [];

    const pageClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      getProductsData(
        Number(event.currentTarget.id),
        category.categories.middleCategory,
        sort.sort,
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
          onClick={pageClick}
          className={i === page.pageNumber ? "selectedPage" : ""}
        >
          {i}
        </Link>,
      );
    }
    return arr;
  };

  const subMenuClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    getProductsData(1, event.currentTarget.id, null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Link to가 안먹혀서 작성
    navigate(`/${category.categories.mainCategory}/${event.currentTarget.id}`);
  };

  const sortClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    getProductsData(
      page.pageNumber,
      category.categories.middleCategory,
      getSortName(event.currentTarget.id),
    );
  };

  const filterClick = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { id, name } = event.currentTarget;

    console.log(id, name);
    // 현재 이벤트 필터값
    let targetFilter = {};
    // api request용 filter값
    let requestFilter = {};
    // api request용 filter값 - array
    let arrayRequestFilter: any = [];

    switch (name) {
      case "period":
        targetFilter = getPeriodRange(id);
        Object.assign(requestFilter, filter, targetFilter);
        getProductsData(
          1,
          category.categories.middleCategory,
          sort.sort,
          requestFilter,
        );
        break;
      case "price":
        targetFilter = getPriceRange(id);
        Object.assign(requestFilter, filter, targetFilter);
        getProductsData(
          1,
          category.categories.middleCategory,
          sort.sort,
          requestFilter,
        );
        break;
      case "theme":
        targetFilter = {
          mainCategory: "THEME",
          middleCategory: id,
        };

        arrayRequestFilter.push(...filterCategory);
        const themeValue = arrayRequestFilter.filter((e: any) => {
          return e.middleCategory === id;
        });

        if (themeValue.length === 0) {
          arrayRequestFilter.push(targetFilter);
        } else {
          arrayRequestFilter = arrayRequestFilter.filter((e: any) => {
            return e.middleCategory !== id;
          });
        }

        getProductsData(
          1,
          category.categories.middleCategory,
          sort.sort,
          null,
          arrayRequestFilter,
        );
        break;
      case "destination":
        targetFilter = {
          mainCategory: "REGION",
          middleCategory: id,
        };
        arrayRequestFilter.push(...filterCategory);
        const destinationValue = arrayRequestFilter.filter((e: any) => {
          return e.middleCategory === id;
        });

        if (destinationValue.length === 0) {
          arrayRequestFilter.push(targetFilter);
        } else {
          arrayRequestFilter = arrayRequestFilter.filter((e: any) => {
            return e.middleCategory !== id;
          });
        }

        getProductsData(
          1,
          category.categories.middleCategory,
          sort.sort,
          null,
          arrayRequestFilter,
        );
        break;
    }
  };

  return (
    <Container>
      <>
        {category.categories.mainCategory === "groups" && (
          <SubMenu length={subMenu["groups"].length}>
            {subMenu["groups"].map((value) => (
              <Link
                className={
                  category.categories.middleCategory === value
                    ? "selectedMenu submenu"
                    : "submenu"
                }
                to={`/${category.categories.mainCategory}/${value}`}
                id={value}
                key={value}
                onClick={subMenuClick}
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
                className={
                  category.categories.middleCategory === value
                    ? "selectedMenu submenu"
                    : "submenu"
                }
                to={`/${category.categories.mainCategory}/${value}`}
                id={value}
                key={value}
                onClick={subMenuClick}
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
                className={
                  category.categories.middleCategory === value
                    ? "selectedMenu submenu"
                    : "submenu"
                }
                to={`/${category.categories.mainCategory}/${value}`}
                id={value}
                key={value}
                onClick={subMenuClick}
              >
                {getMiddleCategoryName(value)}
              </Link>
            ))}
          </SubMenu>
        )}
      </>
      <div className="body">
        {isMobile ? (
          <StickySection>
            <Filter filterClick={filterClick} /> <div className="line"></div>
            <Sort sortClick={sortClick} /> <div className="line"></div>
          </StickySection>
        ) : (
          <Filter filterClick={filterClick} />
        )}
        <div className="rightSection">
          <div className="rightTop">
            <span>{/* 총 10개 상품 */}</span>
            {isMobile ? "" : <Sort sortClick={sortClick} />}
          </div>
          <Product />
        </div>
      </div>
      <Pages>
        <li>{"<"}</li>
        {pagenation().length ? pagenation() : <div>1</div>}
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
  }

  .rightSection {
    display: flex;
    align-items: center;
    width: 100%;
    flex-direction: column;
    row-gap: 30px;

    .rightTop {
      width: 100%;
      display: flex;
      justify-content: space-between;

      span {
        font-size: 18px;
      }
    }
  }

  @media (max-width: 850px) {
    align-items: center;
    margin: 0;
    gap: 18px;
    .body {
      flex-direction: column;
      gap: 0;
    }
    .rightSection {
      gap: 0;
    }
  }
  .selectedPage {
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
  width: 100%;

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
    border-bottom: 1px solid var(--color-grayscale10);

    &:hover {
      color: #0080c6;
      background-color: #e9e9e9;
    }
  }
  .selectedMenu {
    color: #0080c6;
    background-color: #e9e9e9;
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
  }
`;

const StickySection = styled.section`
  position: sticky;
  background-color: #fff;
  margin: 50px -20px 0;

  .line {
    height: 1px;
    width: 100%;
    background-color: var(--color-grayscale10);
  }

  @supports (position: sticky) or (position: -webkit-sticky) {
    top: 0;
    z-index: 10;
  }
`;

export default Groups;
