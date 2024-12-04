import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../resources/imgs/startMenu.png";
import gold4 from "../resources/imgs/gold4.png";
import gold5 from "../resources/imgs/gold5.png";
import start from "../resources/imgs/button_start.png";

function MainMenu() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleNavigate = () => {
    navigate("game", { state: { name: name } });
  };
  return (
    <div className=" w-full h-full bg-black flex justify-center items-center">
      <div className=" absolute z-20 top-32 left-[350px] space-y-12">
        <div className="  relative">
          <div className=" text-black absolute text-6xl font-bold z-20 flex flex-col justify-center items-center w-full h-full">
            <input
              placeholder="Nhập tên"
              value={name}
              onChange={handleChange}
              type="text"
              className="text-3xl w-44 bg-black text-white px-2"
            ></input>
            <button
              onClick={handleNavigate}
              disabled={!name.trim()}
              className=" disabled:text-gray-500"
            >
              BẮT ĐẦU
            </button>
          </div>

          <img
            src={gold4}
            alt=""
            className="size-96  transform scale-x-[-1] "
          ></img>
        </div>
        <div className=" flex flex-col gap-y-2">
          <button
            onClick={() => navigate("guide")}
            className=" text-black bg-yellow-600 rounded-xl font-bold text-3xl px-8 py-4"
          >
            HƯỚNG DẪN
          </button>
          <button
            onClick={() => navigate("score-board")}
            className=" text-black bg-yellow-600 rounded-xl font-bold text-3xl px-8 py-4"
          >
            BẢNG ĐIỂM
          </button>
        </div>
      </div>

      <img src={background} alt=" " className=" absolute"></img>
      {/* <button>Start</button> */}
    </div>
  );
}

export default MainMenu;
