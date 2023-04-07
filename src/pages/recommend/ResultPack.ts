import { ResultPackDataType, lastAnswersType } from "../../@types/data";

export const lastAnswers: lastAnswersType = {
  golf: "이날을 위해 스크린에서 연습했지. 라운딩 가자!",
  trekking: "멋진 풍경을 배경삼아 한번 걸어볼까?",
  ocean: "따뜻한 햇볕 아래 해변을 산책하고 싶어!",
  culture: "남들이 안 가본 새로운 곳을 찾아",
};

export const resultPack = {
  [lastAnswers.golf]: {
    title: "나이스샷 - 골프패키지",
    image: "/result-golf.jpg",
    desc: "스크린에서만 라운딩 돌던 나는 안녕~ 이제 골프여행 가서 리얼필드를 만나보자. 골프카트 타고 Go Go!",
    category: "골프여행",
    backgroundImg: "url('/background-golf.png')",
  },
  [lastAnswers.trekking]: {
    title: "여유롭게 - 트레킹",
    image: "/result-trekking.jpg",
    desc: "푸른 숲 속 피톤치드를 느끼면서 같이 한 번 걸어볼래? 이게 바로 진짜 힐링이지!",
    category: "트레킹",
    backgroundImg: "url('/background-trekking.png')",
  },
  [lastAnswers.ocean]: {
    title: "바다를 보는 여유 - 오션뷰",
    image: "/result-ocean.jpg",
    desc: "수영장 딸린 해안가 호텔에서 조식 뷔페 먹고, 탁 트인 해변가에서 바다내음 풀풀 나는 산책 즐기기!",
    category: "휴양지",
    backgroundImg: "url('/background-ocean.png')",
  },
  [lastAnswers.culture]: {
    title: "힐링타임 - 유적지",
    image: "/result-culture.jpg",
    desc: "각 나라별 역사와 문화를 배우며 마음의 양식을 든든하게 쌓아보세요! 몸도 마음도 든든한 힐링과 지식 타임",
    category: "문화탐방",
    backgroundImg: "url('/background-culture.png')",
  },
};
