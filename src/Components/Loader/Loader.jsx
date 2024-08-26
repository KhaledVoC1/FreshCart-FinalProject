import React from "react";
import style from "./Loader.module.css";

export default function Loader() {
  return (
    <div className="w-full h-[100vh]  flex items-center justify-center">
      <span className={style.loader}></span>
    </div>
  );
}
