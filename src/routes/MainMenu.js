import React from "react";
import { useNavigate } from "react-router-dom";
import background from "../resources/imgs/startMenu.png";
import gold4 from "../resources/imgs/gold4.png";
import gold5 from "../resources/imgs/gold5.png";
import start from "../resources/imgs/button_start.png";

function MainMenu() {
  const navigate = useNavigate();
  return (
    <div className=" w-full h-full bg-black flex justify-center items-center">
      <div className=" absolute z-20 top-32 left-[350px] space-y-12">
        <div onClick={() => navigate("game")} className=" cursor-pointer">
          <h1 className=" text-black absolute text-6xl font-bold z-20 top-1/4 left-1/4 text-center ">
            START
          </h1>

          <img
            src={gold4}
            alt=""
            className="size-96  transform scale-x-[-1] "
          ></img>
        </div>
        <button
          onClick={() => navigate("guide")}
          className=" text-black bg-yellow-600 rounded-xl font-bold text-3xl px-8 py-4"
        >
          HƯỚNG DẪN
        </button>
      </div>

      <img src={background} alt=" " className=" absolute"></img>
      {/* <button>Start</button> */}
    </div>
  );
}

export default MainMenu;
