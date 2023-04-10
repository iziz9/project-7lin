// 필터명 받아오기
// 여행 기간
export const getPeriodRange = (pathname: string | null) => {
  switch (pathname) {
    case "5일 미만":
      return { minPeriod: 0, maxPeriod: 4 };
    case "5일~14일":
      return { minPeriod: 5, maxPeriod: 14 };
    case "15일 이상":
      return { minPeriod: 15, maxPeriod: 100 };
    // 기본값
    default:
      return { minPeriod: null, maxPeriod: null };
  }
};

// 가격
export const getPriceRange = (pathname: string | null) => {
  switch (pathname) {
    case "~200만원":
      return { minPrice: 1, maxPrice: 2000000 };
    case "200~500만원":
      return { minPrice: 2010000, maxPrice: 5000000 };
    case "500~1000만원":
      return { minPrice: 5010000, maxPrice: 10000000 };
    case "1000만원~":
      return { minPrice: 10010000, maxPrice: 99990000 };
    // 기본값
    default:
      return { minPrice: null, maxPrice: null };
  }
};
