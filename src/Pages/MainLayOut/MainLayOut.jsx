import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";  
import { Outlet } from "react-router-dom";
import Home from './../Home/Home';
import Cart from "../Cart/Cart";

export default function MainLayOut() {
  return (
    <div>
      <Navbar  />
    
      <Outlet />
      <Footer />
    </div>
  );
}
