import { useMutation, UseMutationOptions } from "react-query";
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
  return useMutation(addWishList, options);
};

export default useAddWishlistMutation;
