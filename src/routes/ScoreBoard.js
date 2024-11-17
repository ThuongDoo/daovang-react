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
          console.log(res.data.users);
          const newScores = res.data.users.sort((a, b) => b.score - a.score);
          setScore(newScores);
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
          <div className="grid grid-cols-4 w-full items-center" key={index}>
            <h1 className=" text-start">{index + 1}</h1>
            <h1 className=" text-start">{item.name}</h1>
            <h1 className=" text-start">{item.score}</h1>
            <h1 className=" text-end">{formatDate(item.createdAt)}</h1>
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

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}
