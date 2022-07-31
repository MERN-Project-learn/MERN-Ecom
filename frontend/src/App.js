import React from 'react';
import { useEffect, useState } from "react";
import Header from "./Component/Layout/Header/Header.jsx";
import Footer from "./Component/Layout/Footer/Footer.jsx";
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import './App.css';
import axios from "axios";
import Webfont from 'webfontloader'
import Home from './Component/Home/Home.jsx';
import ProductDetails from  "./Component/Product/ProductDetails.jsx";
import Products from "./Component/Product/Products.jsx";
import Search from "./Component/Product/Search"
import LoginRegi from './Component/User/LoginRegi.jsx';
import store from "./store";
import {loadUser} from "./actions/userAction"
import UserOptions from "./Component/Layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./Component/User/Profile"
import ProtectedRoute from './Component/Route/ProtectedRoute.js';
import UpdateProfile from './Component/User/UpdateProfile.js';
import UpdatePassword from "./Component/User/UpdatePassword";
import ForgotPassword from "./Component/User/ForgotPassword";
import ResetPassword from './Component/User/ResetPassword';
import Cart from "./Component/Cart/Cart";
import Shipping from './Component/Cart/Shipping.js';
import ConfirmOrder from './Component/Cart/ConfirmOrder.js';
import Payment from "./Component/Cart/Payment";
import MyOrders from "./Component/Order/MyOrders";
import OrderDetails from "./Component/Order/OrderDetails";
import About from "./Component/Layout/About/About";
import Contact from './Component/Layout/Contact/Contact.js';
import NotFound from './Component/Layout/Not Found/NotFound.js';
import Dashboard from './Component/Admin/Dashboard'
import ProductList from "./Component/Admin/ProductList.js";
import NewProduct from "./Component/Admin/NewProduct.js";
import UpdateProduct from './Component/Admin/UpdateProduct.js';
import UsersList from './Component/Admin/UsersList.js';
import UpdateUser from './Component/Admin/UpdateUser.js';
import OrderList from './Component/Admin/OrderList.js';
import ProductReviews from './Component/Admin/ProductReviews.js';
import ProcessOrder from './Component/Admin/ProcessOrder.js';


function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");
  //   console.log(data);
  //   setStripeApiKey(data.stripeApiKey);
  // } 

 useEffect(() => {
    Webfont.load({
      google:{
        families:['Roboto','Droid Sans',"Chilanka"]
      }
    })

    store.dispatch(loadUser());
    // getStripeApiKey();
  },[])

  return <Router>
    <Header/>
    {isAuthenticated && <UserOptions user={user} />}
    <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/about" element={<About/>}></Route>
    <Route path="/contact" element={<Contact/>}></Route>


    <Route path="/product/:id" element={<ProductDetails/>}></Route>
    <Route path="/products/product/:id" element={<ProductDetails/>}></Route>
    <Route exact path="/products" element={<Products/>} ></Route>
    <Route path="/products/:keyword" element={<Products/>} ></Route>
    <Route path="/login" element={<LoginRegi/>} ></Route>
    <Route exact path="/account" element={<Profile/>} ></Route>
    <Route exact path="/me/update" element={<UpdateProfile/>} ></Route>
    <Route exact path="/password/update" element={<UpdatePassword/>} ></Route>
    <Route exact path="/admin/dashboard" element={<Dashboard/>} ></Route>
    

    <Route exact path="/search" element={<Search/>} ></Route>
    <Route exact path="/password/forgot" element={<ForgotPassword/>} ></Route>
    <Route exact path="/password/reset/:token" element={<ResetPassword/>} ></Route>
    <Route exact path="/store" element={<Cart/>} ></Route>
    <Route exact path="/Cart" element={<Cart/>} ></Route>
    <Route exact path="/shipping" element={<Shipping/>} ></Route>
    <Route exact path="/order/confirm" element={<ConfirmOrder/>} ></Route>
    <Route exact path="/process/payment" element={<Payment/>} ></Route>
    <Route exact path="/orders" element={<MyOrders/>} ></Route>
    <Route exact path="/order/:id" element={<OrderDetails/>} ></Route>
    <Route
         element={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
    <Route exact path="/admin/products" element={<ProductList/>} ></Route>
    <Route exact path="/admin/create/products" element={<NewProduct/>} ></Route>
    <Route exact path="/admin/product/:id" element={<UpdateProduct/>} ></Route>
    <Route exact path="/admin/users" element={<UsersList/>} ></Route>
    <Route exact path="/admin/user" element={<UpdateUser/>} ></Route>
    <Route exact path="/admin/orders" element={<OrderList/>} ></Route>
    <Route exact path="/admin/reviews" element={<ProductReviews/>} ></Route>
    <Route exact path="/admin/order/:id" element={<ProcessOrder/>} ></Route>
    









    






    
      
    </Routes>

    <Footer/>
  </Router>
  
}

export default App;
