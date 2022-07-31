import React,{ Fragment, useState } from 'react'
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@mui/lab";
import Backdrop from "@mui/material/Backdrop";
import GridViewIcon from '@mui/icons-material/GridView';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'; 
import {logout} from "../../../actions/userAction"

const UserOptions = ({user}) => {
    const { cartItems } = useSelector((state) => state.cart);
    const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const options = [
    { icon: <FormatListBulletedIcon />, name: "Orders", func: orders },
    { icon: <PersonOutlineIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingBagIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <LogoutIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <GridViewIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <Fragment>
    <Backdrop open={open} style={{ zIndex: "10" }} />
    <SpeedDial
      ariaLabel="SpeedDial tooltip example"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      style={{ zIndex: "11" }}
      open={open}
      direction="down"
      className="speedDial"
      icon={
        <img
          className="speedDialIcon"
          src={user.avatar.url ? user.avatar.url : "/Profile.png"}
          alt="Profile"
        />
      }
    >
      {options.map((item) => (
        <SpeedDialAction
          key={item.name}
          icon={item.icon}
          tooltipTitle={item.name}
          onClick={item.func}
          tooltipOpen={window.innerWidth <= 600 ? true : false}
        />
      ))}
    </SpeedDial>
  </Fragment> 
  )
}

export default UserOptions
