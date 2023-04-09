import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getWishList } from "../../apis/auth";
import WishListProductCard from "./components/WishListProductCard";

const Favor = () => {
  // const { data, isLoading } = useQuery("memberReservation", getWishList, {
  //   onSuccess(data) {
  //     console.log(data);
  //   },
  //   onError(error) {
  //     console.log("찜 리스트 조회 실패: " + error);
  //   },
  //   retry: 0,
  // });

  // const wishList = data?.map((product) => (
  //   <WishListProductCard product={product} />
  // ));

  return (
    <Container>
      <div className="title">찜</div>
      <div className="list"></div>
    </Container>
  );
};

const Container = styled.div`
  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 23px;
    margin-bottom: 5px;
  }

  .list {
    display: flex;
    flex-direction: column;
    /* gap: 15px; */
  }

  @media (max-width: 850px) {
    font-size: 16px;

    .title {
      font-size: 20px;
    }
  }
`;

export default Favor;
