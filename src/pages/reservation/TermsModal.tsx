import React from "react";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";
import { modalState } from "../../store/modalAtom";
import { BasicBtn } from "../../commons/Button";
import { PersonalData } from "../../commons/Terms";

type Props = {};

const TermsModal = (props: Props) => {
  const { openModal, closeModal } = useModal();

  return (
    <div>
      <PersonalData />
    </div>
  );
};

export default TermsModal;
