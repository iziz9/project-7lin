import React, { useEffect } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import { useModal } from "../hooks/useModal";
import { IoMdClose } from "react-icons/io";

const Modal = () => {
  const { modalDataState, closeModal } = useModal();

  useEffect(() => {
    const bodyEl = document.querySelector("body");
    if (bodyEl && modalDataState.isOpen) bodyEl.style.overflowY = "hidden";
    else if (bodyEl && !modalDataState.isOpen)
      bodyEl.style.overflowY = "scroll";
  }, [modalDataState.isOpen]);

  const modalStyle = {
    /* position, zIndex 옵션을 넣는 과정에서 overload 오류로 인라인으로 넣음 */
  };
  return (
    <ReactModal
      isOpen={modalDataState.isOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(79, 77, 77, 0.7)",
          position: "fixed",
          zIndex: "1000000",
        },
        content: {
          padding: "40px",
          border: "none",
          borderRadius: "8px",
          width: "70%",
          maxWidth: "600px",
          minWidth: "300px",
          maxHeight: "80%",
          margin: "auto",
          top: "none",
          left: "none",
          right: "none",
          bottom: "none",
        },
      }}
    >
      <ModalClose onClick={closeModal}>
        <IoMdClose />
      </ModalClose>
      <ModalTitle>{modalDataState.title}</ModalTitle>
      <ModalContent>{modalDataState.content}</ModalContent>
    </ReactModal>
  );
};

const ModalClose = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  svg {
    display: inline-block;
    width: 24px;
    height: 24px;
  }
`;
const ModalTitle = styled.div`
  font-weight: bold;
  font-size: 30px;
  line-height: 120%;
  text-align: center;
  color: #111111;
  margin-bottom: 40px;
  @media (max-width: 850px) {
    font-size: 20px;
  }
`;
const ModalContent = styled.div`
  display: "flex";
  justify-content: "center";
  /* min-width: 248px; */
`;

export default Modal;
