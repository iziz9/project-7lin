import React from "react";
import styled from "styled-components";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { IBreadCrumbProps } from "../@types/props";

const BreadCrumb = ({ data }: IBreadCrumbProps) => {
  return (
    <Wrap>
      {data.map(({ title, link }, index) => (
        <div key={index}>
          <Link to={link}>
            <span>{title}</span>
          </Link>
          <MdKeyboardArrowRight size={20} />
        </div>
      ))}
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    :last-child svg {
      display: none;
    }
  }
  span {
    margin-right: 10px;
  }
  svg {
    margin-right: 10px;
  }
`;

export default BreadCrumb;
