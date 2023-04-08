import { useState } from "react";
import styled from "styled-components";
import FloatingModal from "./FloatingModal";
import { useMediaQuery } from "react-responsive";

type Props = {};

const FloatingIcon = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile: boolean = useMediaQuery({
    query: "(max-width:850px)",
  });

  return (
    <>
      {isMobile ? (
        <MobileFolatingDiv>
          <div className="face" onClick={() => setIsModalOpen(!isModalOpen)}>
            <img src="/floating.png" />
          </div>
          {isModalOpen ? <FloatingModal /> : null}
        </MobileFolatingDiv>
      ) : (
        <FloatingDiv>
          <div className="face" onClick={() => setIsModalOpen(!isModalOpen)}>
            <img src="/floating.png" />
          </div>
          {isModalOpen ? <FloatingModal /> : null}
        </FloatingDiv>
      )}
    </>
  );
};

const MobileFolatingDiv = styled.div`
  position: fixed;
  right: 10px;
  bottom: 80px;
  z-index: 9;
  display: flex;
  justify-content: center;

  img {
    width: 80px;

    :hover {
      cursor: pointer;
    }
  }
`;

const FloatingDiv = styled.div`
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 9;
  display: flex;
  justify-content: center;

  img {
    width: 120px;

    :hover {
      cursor: pointer;
    }
  }
`;

export default FloatingIcon;
