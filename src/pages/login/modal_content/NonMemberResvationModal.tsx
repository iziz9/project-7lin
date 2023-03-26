import React from "react";
import { BasicBtn } from "../../../commons/Button";
import { BasicInput } from "../../../commons/Input";

const NonMemberResvationModal = () => {
  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <BasicInput type="text" placeholder="주문번호" />
      </div>{" "}
      <div style={{ marginBottom: "20px" }}>
        <BasicInput type="text" placeholder="연락처" />
      </div>
      <BasicBtn type="submit" value="Submit">
        로그인
      </BasicBtn>
    </div>
  );
};

export default NonMemberResvationModal;
