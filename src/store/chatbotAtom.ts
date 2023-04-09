import { atom } from "recoil";
import { questions } from "../commons/Chatbot/questionsAndAnswers";

// 챗봇 실행 단계
interface ChatbotStepType {
  step: number;
  time?: string;
}
export const chatbotStepState = atom<ChatbotStepType>({
  key: "chatbotStepState",
  default: {
    step: 0,
    time: "",
  },
});

// step2 input 넘버링
interface ChatOrderNumberType {
  totalNumbering: number;
  buttonNumbering: number;
  textNumbering: number;
}
export const orderNumberState = atom<ChatOrderNumberType>({
  key: "orderNumberState",
  default: {
    totalNumbering: 0,
    buttonNumbering: 0,
    textNumbering: 0,
  },
});

//step2의 전체 채팅 리스트, 질문번호, 응답내용
const day = new Date();
const time = day.getHours();
const minutes = day.getMinutes();

interface ChatBubbleType {
  question: boolean; //true면 챗봇, false면 나 (false인 text 모아서 api보내기)
  time: string;
  text: string[];
}
export const chatListState = atom<ChatBubbleType[]>({
  key: "chatListState",
  default: [
    { question: true, time: `${time}:${minutes}`, text: [questions[0]] },
  ],
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
