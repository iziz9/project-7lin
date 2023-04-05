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
    overlay: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(79, 77, 77, 0.7)",
    },
    content: {
      padding: "50px",
      border: "none",
      borderRadius: "8px",
      width: "45%",
      maxHeight: "80%",
      minWidth: "248px",
      margin: "auto",
      // position: "relative",
      top: "none",
      left: "none",
      right: "none",
      bottom: "none",
    },
  };
  return (
    <ReactModal
      isOpen={modalDataState.isOpen}
      onRequestClose={closeModal}
      style={modalStyle}
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
  top: 20px;
  right: 20px;
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
  @media (max-width: 560px) {
    font-size: 20px;
  }
`;
const ModalContent = styled.div`
  display: "flex";
  justify-content: "center";
  min-width: 248px;
`;

export default Modal;
