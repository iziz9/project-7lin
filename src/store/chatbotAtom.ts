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
interface ChatListType {
  questionNumber: number;
  chatList: ChatBubbleType[];
  chatAnswer: string[];
}
interface ChatBubbleType {
  question: boolean;
  time: string;
  text: string;
}
export const chatListState = atom<ChatListType>({
  key: "chatListState",
  default: {
    questionNumber: 0,
    chatList: [],
    chatAnswer: [],
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
