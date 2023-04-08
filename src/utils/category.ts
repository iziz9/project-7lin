// 주소로 요청 카테고리명 받아오기
export const getCategoryName = (pathname: string) => {
  switch (pathname) {
    // main category: 그룹별 여행 , 테마별 여행, 지역별 여행
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
