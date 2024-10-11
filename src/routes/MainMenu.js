import React from "react";
import { useNavigate } from "react-router-dom";

function MainMenu() {
  const navigate = useNavigate();
  return (
    <div className="">
      <button onClick={() => navigate("game")}>Start</button>
      <button>Huong Dan</button>
    </div>
  );
}

export default MainMenu;
