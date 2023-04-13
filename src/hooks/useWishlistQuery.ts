import { useQuery, UseQueryOptions } from "react-query";
import { getWishList } from "../apis/auth";
import { WishListProductResponse } from "../@types/data";
import { getCookie } from "../utils/cookie";

const useWishlistQuery = (
  options?: UseQueryOptions<WishListProductResponse>,
) => {
  const token = getCookie("accessToken");
  const { data, ...rest } = useQuery<WishListProductResponse>(
    "wishlist",
    getWishList,
    {
      onSuccess(data) {},
      onError(error) {
        alert("찜 리스트 조회 실패: " + error);
      },
      enabled: token ? true : false,
      staleTime: 1000 * 60 * 30,
      cacheTime: 1000 * 60 * 30,
      ...options,
    },
  );
  return { wishlistData: data?.data, ...rest };
};

export default useWishlistQuery;
