import React, { useState } from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
import { useQuery } from "react-query";
import { getSearchProduct } from "../../apis/request";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { getCookie } from "../../utils/cookie";
import useWishlistQuery from "../../hooks/useWishlistQuery";
import useAddWishlistMutation from "../../hooks/useAddWishlistMutation";
import useDeleteWishlistMutation from "../../hooks/useDeleteWishlistMutation";

const Search = () => {
  const isMobile = useMediaQuery({ query: "(max-width:850px)" });

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [keyWord, setKeyWord] = useState<string>(queryParams.get("q") || "");

  const { data: searchProducts, isLoading } = useQuery(
    ["searchProduct", queryParams.get("q")],
    () => {
      const keyWord = queryParams.get("q");
      if (keyWord) return getSearchProduct(keyWord);
    },
    {
      onSuccess(data) {
        console.log(data);
      },
      onError(error) {
        alert("상품 검색 실패: " + error);
      },
    },
  );

  const token = getCookie("accessToken");

  const { wishlistData, refetch: refetchWishlist } = useWishlistQuery({
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      console.log("찜 리스트 조회 실패: " + error);
    },
    enabled: token ? true : false,
  });

  const addWishListMutation = useAddWishlistMutation({
    onSuccess(res) {
      if (res.message === "success") {
        alert("찜 추가 완료");
        return refetchWishlist();
      }
    },
    onError(error) {
      alert("찜 추가 에러: " + error);
    },
  });

  const deleteWishListMutation = useDeleteWishlistMutation({
    onSuccess(res) {
      if (res.message === "success") {
        alert("찜 삭제 완료");
        return refetchWishlist();
      }
    },
    onError(error) {
      alert("찜 삭제 에러: " + error);
    },
  });

  const toggleWishlist = (productId: number) => {
    if (wishlistData?.find((product) => product.productId === productId)) {
      deleteWishListMutation.mutate(productId);
    } else {
      addWishListMutation.mutate(productId);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyWord.trim() === "") return alert("검색어를 입력해주세요");
    navigate(`/search?q=${keyWord}`);
  };

  return (
    <>
      {isMobile ? (
        <SearchContainer>
          <div className="searchbar">
            <form className="search-input" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={keyWord}
                onChange={(e) => setKeyWord(e.target.value)}
              />
              <BsSearch className="search-icon" type="submit" />
            </form>
          </div>

          <div>최근 검색어</div>
          <div>최근 본 상품</div>
          <div>추천 키워드</div>
          {searchProducts?.data.length === 0 ? (
            <NoContainer>
              <p></p>상품이 없습니다<p></p>
            </NoContainer>
          ) : (
            <Container>
              {searchProducts?.data.map(
                (
                  {
                    briefExplanation,
                    productId,
                    productName,
                    productPrice,
                    thumbnail,
                  },
                  index,
                ) => (
                  <div
                    className="link"
                    onClick={() => navigate(`/product/${productId}`)}
                    key={index}
                  >
                    <Item>
                      <img
                        className="image"
                        src={thumbnail}
                        alt={productName}
                      />
                      {token ? (
                        <AiFillHeart
                          className={
                            wishlistData?.find(
                              (product) => product.productId === productId,
                            )
                              ? "favor active"
                              : "favor"
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(productId);
                          }}
                        />
                      ) : null}
                      <h3 className="title">{productName}</h3>
                      <span className="price">
                        {productPrice
                          ? `${productPrice.toLocaleString("ko-KR")}원`
                          : "가격문의"}
                      </span>
                      <p
                        className="body"
                        dangerouslySetInnerHTML={{ __html: briefExplanation }}
                      ></p>
                    </Item>
                  </div>
                ),
              )}
            </Container>
          )}
        </SearchContainer>
      ) : searchProducts?.data.length === 0 ? (
        <NoContainer>
          <p></p>상품이 없습니다<p></p>
        </NoContainer>
      ) : (
        <SearchContainer>
          <Container>
            {searchProducts?.data.map(
              (
                {
                  briefExplanation,
                  productId,
                  productName,
                  productPrice,
                  thumbnail,
                },
                index,
              ) => (
                <div
                  className="link"
                  onClick={() => navigate(`/product/${productId}`)}
                  key={index}
                >
                  <Item>
                    <img className="image" src={thumbnail} alt={productName} />
                    {token ? (
                      <AiFillHeart
                        className={
                          wishlistData?.find(
                            (product) => product.productId === productId,
                          )
                            ? "favor active"
                            : "favor"
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(productId);
                        }}
                      />
                    ) : null}
                    <h3 className="title">{productName}</h3>
                    <span className="price">
                      {productPrice
                        ? `${productPrice.toLocaleString("ko-KR")}원`
                        : "가격문의"}
                    </span>
                    <p
                      className="body"
                      dangerouslySetInnerHTML={{ __html: briefExplanation }}
                    ></p>
                  </Item>
                </div>
              ),
            )}
          </Container>
        </SearchContainer>
      )}
    </>
  );
};

const SearchContainer = styled.div`
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

export const NoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(auto, 310px));
  max-width: 970px;
  margin: 80px 0;
  text-align: center;
`;

export const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(auto, 310px));
  grid-auto-rows: auto;
  gap: 20px;
  row-gap: 40px;
  max-width: 970px;

  .link {
    cursor: pointer;
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  // 모바일 환경
  @media (max-width: 850px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 420px) {
    grid-template-columns: repeat(1, minmax(auto, 360px));
  }
`;

const Item = styled.li`
  /* overflow: hidden; */
  position: relative;
  display: flex;
  flex-direction: column;
  line-height: 1.6;

  svg {
    position: absolute;
    right: 16px;
    top: 16px;
    font-size: 35px;
    color: var(--color-grayscale30);
    transition: 0.6s;
    &.active {
      color: red;
    }
    &:hover {
      transform: scale(1.3);
    }
  }
  .image {
    width: 100%;
    object-fit: contain;
    aspect-ratio: 1 / 1; // 가로세로 길이가 다른 썸네일용
    &:hover {
      opacity: 0.4;
    }
  }
  .title {
    font-weight: 700;
    font-size: 20px;
    margin: 14px 0 4px;
    line-height: 1.5;
  }
  .price {
    font-size: 18px;
    color: #0080c6;
  }
  .body {
    font-size: 15px;
    color: var(--color-grayscale40);
  }

  @media (max-width: 850px) {
    svg {
      /* right: 8px; */
      /* top: 8px; */
      font-size: 35px;
    }
    .title {
      margin-top: 14px;
      font-size: 16px;
    }
    .price {
      font-size: 14px;
      margin-bottom: 8px;
    }
    .body {
      font-size: 14px;
    }
  }
`;

export default Search;
