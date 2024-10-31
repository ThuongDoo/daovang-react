import React from "react";
import { useNavigate } from "react-router-dom";

function Guide() {
  const navigate = useNavigate();
  return (
    <div className=" h-full w-full bg-black text-yellow-600 p-4 space-y-32 px-20">
      <h1 className=" text-6xl font-bold">HƯỚNG DẪN</h1>
      <div className=" text-3xl flex flex-col items-start gap-y-20">
        <h1 className=" text-start">
          kéo các vật phẩm để kiếm điểm, trong quá trình kéo bạn có thể trả lời
          các câu hỏi để tăng tốc độ kéo. Kéo càng nhiều vật phẩm để đủ điểm qua
          màn và mua các trạng bị hữu ích
        </h1>
        <h1>
          <span className=" font-bold">[SPACE]</span> : thả móc kéo các vật phẩm
        </h1>
        <h1>
          <span className=" font-bold">[1] [2] [3] [4] </span>: sử dụng các
          trang bị
        </h1>
      </div>
      <div className=" flex justify-between items-center">
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

export default Guide;
