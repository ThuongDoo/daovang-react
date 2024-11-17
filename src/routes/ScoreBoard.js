import React, { useEffect, useState } from "react";
import api from "../util/api";
import { useNavigate } from "react-router-dom";

function ScoreBoard() {
  const navigate = useNavigate();

  const [score, setScore] = useState([]);

  useEffect(() => {
    const getScore = async () => {
      try {
        await api.get("user").then((res) => {
          console.log("hih");
          setScore(res.data.users);
        });
      } catch (error) {
        console.error("Error saving score: ", error);
      }
    };
    getScore();
  }, []);

  return (
    <div className=" bg-black w-full h-full flex flex-col text-yellow-600 p-4 px-20 space-y-32">
      <h1 className=" text-6xl font-bold">BẢNG ĐIỂM</h1>
      <div className=" w-full overflow-y-auto flex-grow text-3xl">
        {score?.map((item, index) => (
          <div className=" flex justify-between  items-center" key={index}>
            <h1>{item.name}</h1>
            <h1>{item.score}</h1>
          </div>
        ))}
      </div>
      <div className=" flex justify-between items-center pb-16">
        <button
          className=" bg-yellow-600 text-black font-bold text-3xl px-44 py-4 rounded-xl"
          onClick={() => navigate("/")}
        >
          MENU
        </button>
        <button
          className=" bg-yellow-600 text-black font-bold text-3xl px-44 py-4 rounded-xl"
          onClick={() => navigate("/game")}
        >
          PLAY
        </button>
      </div>
    </div>
  );
}

export default ScoreBoard;
