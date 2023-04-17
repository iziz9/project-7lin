import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { deleteWishList } from "../apis/auth";

const usedeleteWishlistMutation = (
  options?:
    | Omit<
        UseMutationOptions<
          { status: number; message: string; dataSize: number },
          unknown,
          number,
          unknown
        >,
        "mutationFn" | "mutationKey"
      >
    | undefined,
) => {
  const queryClient = useQueryClient();
  return useMutation(deleteWishList, {
    onSuccess(res) {
      if (res.message === "success") {
        alert("찜 삭제 완료");
        return queryClient.invalidateQueries({
          queryKey: ["wishlist"],
        });
      }
    },
    onError(error) {
      alert("찜 삭제 에러: " + error);
    },
    ...options,
  });
};

export default usedeleteWishlistMutation;
