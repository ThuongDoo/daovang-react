import React from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function GameOver({ onRePlay, levelMax, currentLevel, score }) {
  const navigate = useNavigate();

  return (
    <div
      className={` text-yellow-600 absolute bg-black w-full h-full z-50 flex flex-col gap-y-10 justify-center items-center `}
    >
      <h1 className=" text-5xl font-bold">
        {currentLevel === levelMax - 1 ? "YOU WIN" : "GAME OVER"}
      </h1>
      <h1 className=" text-6xl font-bold">{score}</h1>
      <div className=" flex gap-x-20">
        <button
          onClick={() => navigate("/")}
          className=" size-32 text-3xl bg-yellow-600 text-black font-bold rounded-xl cursor-pointer"
        >
          MENU
        </button>
        <div className="" onClick={() => onRePlay(1)}>
          <ArrowPathIcon className=" size-32 bg-yellow-600 text-black rounded-xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default GameOver;
