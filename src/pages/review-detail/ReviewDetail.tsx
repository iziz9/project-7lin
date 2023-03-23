import React from "react";
import { useParams } from "react-router";

const ReviewDetail = () => {
  const { id } = useParams();
  console.log(id);
  return <div>ReviewDetail</div>;
};

export default ReviewDetail;
