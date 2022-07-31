import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productActions";
import Loader from "../Layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { Typography } from "@mui/material";
import MetaData from "../Layout/MetaData";
import { Slider } from "@mui/material";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";

const categories = [
  "Grocery",
  "Mobiles",
  "Mens Fashion",
  "Womens Fashion",
  "Electronics",
   "Home",
  "Appliances",
  "Beauty",
];

const Products = () => {
  const dispatch = useDispatch();

  const { keyword} = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0,100000]);
  const [category, setCategory] = useState("");
  const [rating, setRatings] = useState(0);

  const { 
    products,
    loading,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

    // const keyword = match.params.keyword;
  console.log(resultPerPage)
  console.log(filteredProductsCount)
  //   const keyword = keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  let count = filteredProductsCount;

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category, rating));
  }, [dispatch, keyword, currentPage, price, category, rating]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="Auto"
              aria-labelledby="range-slider"
              min={0}
              max={100000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={rating}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {/* {resultperpage < count && ( */}
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
        
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            
            </div>
           
               {/* )}    */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
