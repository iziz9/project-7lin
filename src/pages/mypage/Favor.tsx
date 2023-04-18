import React from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "react-query";
import { deleteAllWishList, getWishList } from "../../apis/auth";
import WishListProductCard from "./components/WishListProductCard";
import useWishlistQuery from "../../hooks/useWishlistQuery";
import { WishListProduct } from "../../@types/data";
import { BasicBtn } from "../../commons/Button";
import Spinner from "/spinner.svg";

const Favor = () => {
  const {
    wishlistData,
    isLoading,
    isFetching,
    refetch: refetchWishlist,
  } = useWishlistQuery();

  const deleteAllWishListMutation = useMutation(deleteAllWishList, {
    onSuccess(res: any) {
      if (res.message === "success") {
        return refetchWishlist();
      }
    },
    onError(error) {
      alert("찜 전체 삭제 실패: " + error);
    },
  });

  const wishList = wishlistData?.map((product: WishListProduct) => (
    <WishListProductCard product={product} key={product.productId} />
  ));

  const noProduct = (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      찜 목록이 없습니다.
    </div>
  );

  if (isFetching || isLoading)
    return (
      <Container>
        <div className="delete-all">
          <div className="title">찜</div>
        </div>
        <div className="loading-list">{wishList}</div>
        <div className="spinner">
          <img src={Spinner} alt="로딩" width="10%" />
        </div>
      </Container>
    );

  return (
    <Container>
      <div className="delete-all">
        <div className="title">찜</div>
        {wishList?.length === 0 ? null : (
          <div
            className="btn-wrapper"
            onClick={() => {
              if (confirm("정말로 찜 목록을 전체 삭제하시겠습니까?"))
                deleteAllWishListMutation.mutate();
            }}
          >
            <BasicBtn style={{ height: "35px" }} backgroundColor="#fdb813">
              찜 목록 전체 삭제
            </BasicBtn>
          </div>
        )}
      </div>
      <div className="list">
        {wishList?.length === 0 ? noProduct : wishList}
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  .delete-all {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-style: normal;
      font-weight: 600;
      font-size: 23px;
      margin-bottom: 5px;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    /* gap: 15px; */
  }

  .loading-list {
    display: flex;
    flex-direction: column;
    opacity: 0.5;
    position: relative;
  }

  .spinner {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* margin: auto; */
    display: flex;
    align-items: center;
    justify-content: center;
    /* left: 100px; */
  }

  @media (max-width: 850px) {
    font-size: 16px;
    .delete-all {
      .title {
        font-size: 20px;
      }
    }
  }
`;

export default Favor;
