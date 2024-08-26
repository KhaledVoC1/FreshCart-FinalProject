import React, { useContext } from "react";
import style from "./Home.module.css";
import MainSlider from "../../Components/MainSlider/MainSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import Products from "../../Components/Products/Products";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

export default function Home(props) {
  return (
    <div className="container">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <CategorySlider />
      <Products />
    </div>
  );
}
