import React ,{Fragment,useEffect} from 'react'
import { FaMousePointer } from 'react-icons/fa';
import "./Home.css"
import Product from './ProductCard.jsx';
import MetaData from "../Layout/MetaData"
import { getProduct } from '../../actions/productActions';
import {useDispatch,useSelector} from "react-redux";
import Loader from "../Layout/Loader/Loader"



// const product = { 
//       name :"Laptop",
//       images: [{url: "https://images.prismic.io/frameworkmarketplace/cca31de3-3b75-4932-af96-7646b7eba6c7__DSC3630-Edit-cropped.jpg?auto=compress,format"}],
//       price:"$256",
//       _id: "virendra"
// }

const title = "ECOMMERCE"

const Home = () => {
  const dispatch = useDispatch();
  const {loading,error,products,productsCount} = useSelector(state=>state.products)
  console.log(products)
  useEffect(()=>{ 
     dispatch(getProduct()) 
  },[dispatch])

  return (
    <Fragment>
      {loading ? <Loader/> : 
      <Fragment>
      <MetaData title={title}/>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>Find the Best Product Below</h1>

        <a href="#container">
              <button>
                Scroll <FaMousePointer/>
              </button>
            </a>
      </div>

      <h2 className ="homeHeading ">Feature Products</h2>

      <div className ="container" id = "container">
      
     {products.map((product) =>(<Product product={product}/>))}
        {/* <Product product = {product}/> */}

      </div>
    </Fragment>}
    </Fragment>
  )
}

export default Home;