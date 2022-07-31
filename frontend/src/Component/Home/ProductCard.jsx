import React from 'react'
import "./Home.css"
import { Rating } from "@mui/material";

import{Link} from "react-router-dom"

const ProductCard = ({product}) => {
   const options = {
      size: "small",
      value: product.rating,
      readOnly: true,
      precision: 0.5,
    };
  return (
     <Link className="productCard" to={`product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name}/>
        <p>{product.name}</p>
        <div>
            <Rating {...options}/>
            <spam> ({product.numOfReviews})</spam>
        </div>
        <spam>{`₹${product.price}`}</spam>
     </Link>
  )
}

export default ProductCard