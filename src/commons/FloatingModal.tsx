import { useState } from "react";
import styled from "styled-components";
import FloatingInput from "./FloatingInput";
import { PersonalData } from "./Terms";

const FloatingModal = () => {
  const [questionNumber, setQuestionNumber] = useState(1);

  return (
    <Modal>
      <div className="inner">
        <PersonalData />
        <FloatingInput />
      </div>
    </Modal>
  );
};

const Modal = styled.div`
  width: 450px;
  height: 700px;
  position: absolute;
  right: 60px;
  bottom: 40px;
  background-color: #f5f5f5;
  opacity: 0.95;
  display: flex;
  justify-content: center;
  border-radius: 8px;

  .inner {
    background-color: royalblue;
    width: 420px;
    height: 80%;
    margin: 20px auto;
  }
`;

export default FloatingModal;
