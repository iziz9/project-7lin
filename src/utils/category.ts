// 메인 카테고리명 받아오기
export const getMainCategoryName = (pathname: string) => {
  switch (pathname) {
    // 그룹별 여행 , 테마별 여행, 지역별 여행
    case "groups":
      return "GROUP";
    case "themes":
      return "THEME";
    case "destination":
      return "REGION";
    // 예외
    default:
      return null;
  }
};

// 미들 카테고리명 받아오기
export const getMiddleCategoryName = (pathname: string) => {
  switch (pathname) {
    // 그룹별 여행 하위 카테고리
    case "5070":
      return "5070끼리";
    case "gentlemen":
      return "남자끼리";
    case "ladies":
      return "여자끼리";
    case "family":
      return "가족끼리";
    case "anyone":
      return "누구든지";
    // 테마별 여행 하위 카테고리
    case "culture":
      return "문화탐방";
    case "golf":
      return "골프여행";
    case "vacation":
      return "휴양지";
    case "trekking":
      return "트레킹";
    case "pilgrimage":
      return "성지순례";
    // 지역별 여행 하위 카테고리
    case "asia":
      return "동남아/태평양";
    case "india":
      return "인도/중앙아시아";
    case "africa":
      return "아프리카/중동";
    case "europe":
      return "유럽/코카서스";
    case "america":
      return "중남미/북미";
    // 예외
    default:
      return null;
  }
};
