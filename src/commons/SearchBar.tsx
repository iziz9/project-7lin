import React, { useState } from "react";
import { useNavigate } from "react-router";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

type Props = {};

const SearchBar = (props: Props) => {
  const queryParams = new URLSearchParams(location.search);
  const [keyWord, setKeyWord] = useState<string>(queryParams.get("q") || "");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyWord.trim() === "") return alert("검색어를 입력해주세요");
    navigate(`/search?q=${keyWord}`);
  };

  return (
    <SearchForm className="searchBar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        value={keyWord}
        onChange={(e) => setKeyWord(e.target.value)}
      />
      <BsSearch className="searchButton" type="submit" />
    </SearchForm>
  );
};

const SearchForm = styled.form`
  position: relative;

  input {
    width: 300px;
    height: 30px;
    padding: 5px 5px 5px 10px;
    background-color: var(--color-inputGray);
    border: none;
    border-radius: 8px;

    :focus {
      outline: none;
    }
    /* ::placeholder {
          padding-left: 10px;
        } */
  }

  .searchButton {
    position: absolute;
    right: 0;
    top: 10px;
    padding-right: 10px;
    color: gray;
    cursor: pointer;
  }
`;

export default SearchBar;
