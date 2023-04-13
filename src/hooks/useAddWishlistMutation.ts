import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { addWishList } from "../apis/auth";

const useAddWishlistMutation = (
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
  return useMutation(addWishList, {
    onSuccess(res) {
      if (res.message === "success") {
        alert("찜 추가 완료");
        return queryClient.invalidateQueries({
          queryKey: ["wishlist"],
        });
      }
    },
    onError(error) {
      alert("찜 추가 에러: " + error);
    },
    ...options,
  });
};

export default useAddWishlistMutation;
