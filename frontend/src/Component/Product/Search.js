import React, { useState, Fragment } from "react";
import MetaData from "../Layout/MetaData";
import { useNavigate } from 'react-router-dom';
import "./Search.css";


const Search = () => {

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    navigate(keyword.trim() ? `/products/${keyword}` : "/products");
  };


  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <h1>{keyword}</h1>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;