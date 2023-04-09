import React from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "react-query";
import { deleteAllWishList, getWishList } from "../../apis/auth";
import WishListProductCard from "./components/WishListProductCard";
import useWishlistQuery from "../../hooks/useWishlistQuery";
import { WishListProduct } from "../../@types/data";
import { BasicBtn } from "../../commons/Button";

const Favor = () => {
  const {
    wishlistData,
    isLoading,
    refetch: refetchWishlist,
  } = useWishlistQuery({
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      console.log("찜 리스트 조회 실패: " + error);
    },
    retry: 3,
  });

  const deleteAllWishListMutation = useMutation(deleteAllWishList, {
    onSuccess(res: any) {
      console.log(res);
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
