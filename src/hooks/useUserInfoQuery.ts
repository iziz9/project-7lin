import { useQuery, UseQueryOptions } from "react-query";
import { getMemberInfo } from "../apis/auth";
import { MemberInfoResponse } from "../@types/data";

const useUserInfoQuery = (options?: UseQueryOptions<MemberInfoResponse>) => {
  const { data, ...rest } = useQuery<MemberInfoResponse>(
    "userInfo",
    getMemberInfo,
    {
      ...options,
      cacheTime: 1000 * 60 * 30, // 캐시 유효 시간 30분
    },
  );
  return { userInfoData: data?.data, ...rest };
};

export default useUserInfoQuery;
