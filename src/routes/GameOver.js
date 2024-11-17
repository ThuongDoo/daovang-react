import React, { useEffect, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import api from "../util/api";

function GameOver({ onRePlay, levelMax, currentLevel, score, name = "" }) {
  const navigate = useNavigate();
  const [isScoreSaved, setIsScoreSaved] = useState(false); // Track if score is already saved

  const saveScore = async () => {
    try {
      await api.post("user", { name, score });
      setIsScoreSaved(true); // Set to true after saving
    } catch (error) {
      console.error("Error saving score: ", error);
    }
  };

  return (
    <div className="text-yellow-600 absolute bg-black w-full h-full z-50 flex flex-col gap-y-10 justify-center items-center">
      <h1 className="text-5xl font-bold">
        {currentLevel === levelMax - 1 ? "YOU WIN" : "GAME OVER"}
      </h1>
      <h1 className="text-6xl">PLAYER {name}</h1>
      <h1 className="text-6xl font-bold">{score}</h1>
      <div className="flex gap-x-20">
        <button
          onClick={() => navigate("/")}
          className="size-32 text-3xl bg-yellow-600 text-black font-bold rounded-xl cursor-pointer"
        >
          MENU
        </button>
        <div onClick={() => onRePlay(1)}>
          <ArrowPathIcon className="size-32 bg-yellow-600 text-black rounded-xl cursor-pointer" />
        </div>
        <button
          onClick={saveScore}
          disabled={isScoreSaved} // Disable button if score is saved
          className={`size-32 text-3xl font-bold rounded-xl flex items-center justify-center ${
            isScoreSaved
              ? "bg-gray-400 text-gray-700"
              : "bg-yellow-600 text-black cursor-pointer"
          }`}
        >
          <h1 className=" text-center">
            {isScoreSaved ? "ĐÃ LƯU" : "LƯU ĐIỂM"}
          </h1>
        </button>
      </div>
    </div>
  );
}

export default GameOver;
