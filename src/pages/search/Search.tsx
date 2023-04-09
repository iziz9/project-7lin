import React from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";

const Search = () => {
  const isMobile = useMediaQuery({ query: "(max-width:850px)" });

  return (
    <>
      {isMobile ? (
        <Container>
          <div className="searchbar">
            <div className="search-input">
              <input type="text" placeholder="검색어를 입력하세요" />
              <BsSearch className="search-icon" />
            </div>
          </div>

          <div>최근 검색어</div>
          <div>최근 본 상품</div>
          <div>추천 키워드</div>
        </Container>
      ) : (
        <div></div>
      )}
    </>
  );
};

const Container = styled.div`
  @media (max-width: 850px) {
    .searchbar {
      display: flex;
      margin: 30px auto;

      .search-input {
        width: 80%;
        position: relative;
        margin: auto;

        input {
          width: 100%;
          height: 36px;
          border: none;
          border-radius: 8px;
          background-color: var(--color-inputGray);
          margin: auto;
          padding-left: 15px;

          :focus {
            outline: none;
          }
        }
        .search-icon {
          position: absolute;
          top: 10px;
          right: 0px;
          cursor: pointer;
        }
      }
    }
  }
`;

const TopSection = styled.section`
  max-width: 1240px;
  min-width: 700px;
  margin: auto;

  .inner {
    display: flex;
    justify-content: space-between;
  }

  .logo-search {
    display: flex;
    gap: 20px;

    .logo {
      img {
        width: 200px;
        :hover {
          cursor: pointer;
        }
      }
    }

    .searchBar {
      position: relative;

      input {
        width: 300px;
        height: 30px;
        padding: 5px;
        background-color: var(--color-inputGray);
        border: none;
        :focus {
          outline: none;
        }
        ::placeholder {
          padding-left: 10px;
        }
      }

      .searchButton {
        position: absolute;
        right: 0;
        top: 10px;
        padding-right: 10px;
        color: gray;
        cursor: pointer;
      }
    }
  }

  ul {
    display: flex;
    gap: 10px;
    font-size: 14px;
    white-space: nowrap;
  }

  li {
    cursor: pointer;
    :hover {
      color: var(--color-blue);
    }
  }
`;

export default Search;
