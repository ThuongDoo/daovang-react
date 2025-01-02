import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../resources/imgs/startMenu.png";
import gold4 from "../resources/imgs/gold4.png";
import gold5 from "../resources/imgs/gold5.png";
import start from "../resources/imgs/button_start.png";

function MainMenu() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("123456");
  const [nextRoute, setNextRoute] = useState("");

  const [isPsswordConfirm, setIsPsswordConfirm] = useState(false);

  const PasswordConfirm = () => {
    const [inputValue, setInputValue] = useState(""); // Khởi tạo state

    // Hàm xử lý khi nội dung input thay đổi
    const handleChange = (event) => {
      setInputValue(event.target.value); // Cập nhật giá trị từ input
    };

    // Hàm xử lý khi form được submit
    const handleSubmit = (event) => {
      event.preventDefault(); // Ngăn không cho form reload trang

      if (inputValue === password) {
        navigate(nextRoute);
      } else {
        alert("Sai Mật Khẩu");
      }
    };
    return (
      <div className=" absolute h-full w-full  flex items-center justify-center">
        <div className=" bg-white relative rounded-xl">
          <h1
            className=" font-bold text-red-500 absolute right-2 cursor-pointer"
            onClick={() => {
              setIsPsswordConfirm(false);
            }}
          >
            X
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 mx-4 my-6">
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              className="border rounded px-3 py-2 w-full"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Xác nhận
            </button>
          </form>
        </div>
      </div>
    );
  };
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
          <div className=" text-black absolute space-y-2 text-6xl font-bold z-20 flex flex-col justify-center items-center w-full h-full">
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
            className=" text-black bg-yellow-600 rounded-xl font-bold text-3xl px-8 py-2"
          >
            HƯỚNG DẪN
          </button>
          <button
            onClick={() => {
              setNextRoute("questions");
              // onNavigate({ route: routes.ques });
              setIsPsswordConfirm(true);
            }}
            className=" text-black bg-yellow-600 rounded-xl font-bold text-3xl px-8 py-2"
          >
            CÂU HỎI
          </button>
          <button
            onClick={() => navigate("score-board")}
            className=" text-black bg-yellow-600 rounded-xl font-bold text-3xl px-8 py-2"
          >
            BẢNG ĐIỂM
          </button>
        </div>
      </div>

      <img src={background} alt=" " className=" absolute"></img>
      {/* <button>Start</button> */}
      {isPsswordConfirm && (
        <div className=" z-50 absolute w-full h-full">
          <PasswordConfirm />
        </div>
      )}
    </div>
  );
}

export default MainMenu;
