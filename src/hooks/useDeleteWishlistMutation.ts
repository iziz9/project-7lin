import { useMutation, UseMutationOptions } from "react-query";
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
  return useMutation(deleteWishList, options);
};

export default usedeleteWishlistMutation;
