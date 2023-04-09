// 정렬명 받아오기
export const getSortName = (pathname: string | null) => {
  switch (pathname) {
    case "최신 등록 순":
      return null;
    case "높은 가격 순":
      return "priceDesc";
    case "낮은 가격 순":
      return "priceAsc";
    case "긴 여행 순":
      return "periodDesc";
    case "짧은 여행 순":
      return "periodAsc";
    // 예외
    default:
      return null;
  }
};
