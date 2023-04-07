import { atom } from "recoil";

interface ChatbotStepType {
  step: number;
}

interface chatNumberType {
  orderNumber: number;
  answerNumber: number | null;
}

//step0: firstOpen, 시작하기 버튼 생성됨
//step1: 시작하기 버튼 누른 후, 개인정보동의 텍스트박스 및 버튼 생성됨
//step2: 개인정보 동의 버튼 누른 후, 설문 시작
//step3: 설문완료 후, 설문이 완료되었습니다 안내 텍스트 띄우고 다시 설문하기 버튼 생성
export const chatbotStepState = atom<ChatbotStepType>({
  key: "chatbotStepState",
  default: {
    step: 0,
  },
});

//step3의 ordernumber, answernumber +(질문 / 응답)
export const chatNumberState = atom<chatNumberType>({
  key: "chatNumberState",
  default: {
    orderNumber: 0,
    answerNumber: null,
  },
});
