import "./App.css";
import { useEffect, useState } from "react";
import Header from "./Component/Layout/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./Component/Layout/Footer/Footer";
import Home from "./Component/Home/Home";
import ProductDetails from "./Component/Product/ProductDetails";
import Products from "./Component/Product/Products";
import Search from "./Component/Product/Search";
import LoginRegi from "./Component/User/LoginRegi";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./Component/Layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./Component/User/Profile";
import ProtectedRoute from "./Component/Route/ProtectedRoute";
import UpdateProfile from "./Component/User/UpdateProfile";
import UpdatePassword from "./Component/User/UpdatePassword"; 
import ForgotPassword from "./Component/User/ForgotPassword";
import ResetPassword from "./Component/User/ResetPassword";
import Cart from "./Component/Cart/Cart";
import Shipping from "./Component/Cart/Shipping";
import ConfirmOrder from "./Component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./Component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./Component/Cart/OrderSuccess";
import MyOrders from "./Component/Order/MyOrders";
import OrderDetails from "./Component/Order/OrderDetails";
import Dashboard from "./Component/Admin/Dashboard.js";
import ProductList from "./Component/Admin/ProductList.js";
import NewProduct from "./Component/Admin/NewProduct";
import UpdateProduct from "./Component/Admin/UpdateProduct";
import OrderList from "./Component/Admin/OrderList";
import ProcessOrder from "./Component/Admin/ProcessOrder";
import UsersList from "./Component/Admin/UsersList";
import UpdateUser from "./Component/Admin/UpdateUser";
import ProductReviews from "./Component/Admin/ProductReviews";
import Contact from "./Component/Layout/Contact/Contact";
import About from "./Component/Layout/About/About";
import NotFound from "./Component/Layout/Not Found/NotFound";


function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeApiKey");
    console.log(data);
    setStripeApiKey(data.stripeApiKey);
  } 

 useEffect(() => {
    WebFont.load({
      google:{
        families:['Roboto','Droid Sans',"Chilanka"]
      }
    })

    store.dispatch(loadUser());
    getStripeApiKey();
  },[])

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return <Router>
    <Header/>
    {isAuthenticated && <UserOptions user={user} />}

    {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
          <Route exact path="/process/payment" element={<Payment/>} />
          </Routes>
        </Elements>
      )}   

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
    {/* <Route exact path="/process/payment" element={<Payment/>} ></Route> */}
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
    <Route exact path="/success" element={<OrderSuccess/>} />
    
    </Routes>

    <Footer/>
  </Router>
  
}

export default App;
