import { useQuery, UseQueryOptions } from "react-query";
import { getWishList } from "../apis/auth";
import { WishListProductResponse } from "../@types/data";

const useWishlistQuery = (
  options?: UseQueryOptions<WishListProductResponse>,
) => {
  const { data, ...rest } = useQuery<WishListProductResponse>(
    "wishlist",
    getWishList,
    {
      ...options,
      cacheTime: 1000 * 60 * 30, // 캐시 유효 시간 30분
    },
  );
  return { wishlistData: data?.data, ...rest };
};

export default useWishlistQuery;
