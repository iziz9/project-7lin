import { atom } from "recoil";

// 챗봇 실행 단계
interface ChatbotStepType {
  step: number;
}
export const chatbotStepState = atom<ChatbotStepType>({
  key: "chatbotStepState",
  default: {
    step: 0,
  },
});

//step2의 전체 채팅 리스트, 질문번호, 응답내용
// 불러올때, api 전송할 때는 +1해서 홀수 질문, 짝수 답변으로
// 내용 저장은 usestate에서 가져오기
interface ChatListType {
  chatList: ChatBubbleType[];
}
interface ChatBubbleType {
  question: boolean;
  time: string;
  text: string;
}
export const chatListState = atom<ChatListType>({
  key: "chatListState",
  default: {
    chatList: [],
  },
});

//api요청예시
// {
//   "name": "홍길동",
//   "phone": "010111",
//   "ageGroup": [
//       "aaaaaa,bbbbbb,ccccc"
//   ],
//   "travelGroup": [
//       "aaaaa,bbbbb"
//   ],
//   "companionGroup": [
//       "aaa, bbb"
//   ],
//   "religion": "aaaaa",
//   "politics": "aaaaaa",
//   "travelTheme": "aaaaaa",
//   "travelPeriod": "aaaaaa",
//   "travelNumber": "aaaaaa"
// },
