import React, { useEffect, useRef, useState } from "react";
import bg2 from "../resources/imgs/bg2.png";
import bg from "../resources/imgs/bg.png";
import player from "../resources/imgs/player.png";
import level0 from "../resources/levels/level0.json";
import Item from "../components/Item";
import itemList from "../resources/items.json";
import Hook from "../components/Hook";
import NumberDisplay from "../components/NumberDisplay";
import config from "../resources/config.json";
import questionList from "../resources/question.json";

function Game() {
  const { hookRadius, timeLimit } = config;

  const [level, setLevel] = useState(0);
  const levels = [level0];
  const [items, setItems] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [scoreRequire, setScoreRequire] = useState(0);
  const gameRef = useRef(null);
  const [tileSize, setTileSize] = useState({ width: 0, height: 0 });
  const [hookPos, setHookPos] = useState([]);
  const [isGrab, setIsGrab] = useState(0);
  const [grabbedItem, setGrabbedItem] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState(null);
  const [speedStack, setSpeedStack] = useState(0);
  const [seconds, setSeconds] = useState(timeLimit);
  const [isPause, setIsPause] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timer); // Xoá timer khi component bị unmount hoặc cập nhật
    } else {
      setIsPause(true);
    }
  }, [seconds]);

  useEffect(() => {
    const a = returnNonZeroElements(levels[level].map);
    const newItems = a.map((i, index) => {
      const newData = itemList.find((j) => j.id === i.id);
      const newPos = getPos(i.x, i.y, newData.width, newData.height, tileSize);
      return { ...newData, x: newPos[0], y: newPos[1] };
    });
    setScoreRequire(levels[level].scoreRequire);
    setItems(newItems);
    return () => {};
  }, [tileSize, level]);

  useEffect(() => {
    const newQuestions = shuffleArray(questionList);
    setQuestions(newQuestions);
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (gameRef.current) {
        const { width, height } = gameRef.current.getBoundingClientRect();
        setTileSize({ width: width / 12, height: height / 5 });
      }
    };

    // Gọi hàm để lấy kích thước ban đầu
    updateDimensions();

    // Thêm event listener để cập nhật kích thước khi cửa sổ thay đổi kích thước
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    for (const i in items) {
      // Kiểm tra nếu cả hai điều kiện đều đúng

      if (
        items[i].x - items[i].width / 2 <= hookPos[0] + hookRadius &&
        hookPos[0] - hookRadius <= items[i].x + items[i].width / 2
      ) {
        if (
          items[i].y - items[i].height / 2 + 128 <= hookPos[1] + hookRadius &&
          hookPos[1] - hookRadius <= items[i].y + items[i].height / 2 + 128
        ) {
          console.log(hookPos);
          isCollision({ deleteIndex: i });
          break;
        }
      }
    }
  }, [hookPos]);

  const handleHookPos = (data) => {
    setHookPos(data);
  };

  const handleDone = (data) => {
    if (grabbedItem.value) {
      const newScore = score + grabbedItem.value;
      setGrabbedItem({});
      setScore(newScore);
    }
    setIsGrab(false);
  };

  const isCollision = ({ deleteIndex }) => {
    setIsGrab(true);
    const newItems = items;
    setGrabbedItem(items[deleteIndex]);
    newItems.splice(deleteIndex, 1);
    setItems(newItems);
  };

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswers(answerIndex);
    if (answerIndex === questions[0]?.correct) {
      setSpeedStack((prevCount) => prevCount + 1);
      setTimeout(() => {
        setSpeedStack((prevCount) => prevCount - 1);
      }, 2000);
    }
    setTimeout(() => {
      setSelectedAnswers(null);
      const newQuestions = questions.slice(1);
      setQuestions(newQuestions);
    }, 1000);
  };

  return (
    <div className=" h-full w-full flex flex-col relative">
      <div
        className={` absolute bg-blue-500 opacity-70 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 z-50 flex flex-col justify-between p-10  ${
          isPause === true ? "block" : "hidden"
        }`}
      >
        <h1>Game Over</h1>
      </div>
      <div
        className={` absolute bg-blue-500 opacity-70 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 z-40 flex flex-col justify-between p-10  ${
          isPause !== true && isGrab === true ? "block" : "hidden"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4 text-white">
          {questions[0]?.ques}
        </h2>
        <div className={`grid grid-cols-1 gap-4`}>
          {questions[0]?.ans.map((answer, answerIndex) => (
            <button
              key={answerIndex}
              disabled={selectedAnswers != null}
              onClick={() => handleAnswerClick(answerIndex)}
              className={`px-4 py-2 border rounded-lg text-left ${
                selectedAnswers != null && answerIndex === questions[0]?.correct
                  ? "bg-green-500 text-white"
                  : selectedAnswers === answerIndex
                  ? "bg-red-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
      <div className=" h-32 relative flex items-center justify-center">
        <div className="bg-yellow-500 h-full w-full"></div>
        <img src={player} alt="" className=" absolute"></img>
        <div className=" absolute flex items-center justify-between w-full p-4">
          <div className=" flex items-center">
            <NumberDisplay number={seconds} />
            <h1 className=" text-3xl">S</h1>
          </div>
          <div className=" flex items-center">
            <NumberDisplay number={score} />
            <h1 className=" text-3xl">/</h1>
            <NumberDisplay number={scoreRequire} />
          </div>
        </div>
      </div>

      <div className=" absolute w-full h-full ">
        <Hook
          pos={handleHookPos}
          isGrab={isGrab}
          done={handleDone}
          grabbedItem={grabbedItem}
          speedStack={speedStack}
          isPause={isPause}
        />
      </div>

      <div className=" flex-1 relative" ref={gameRef}>
        <img
          src={bg}
          alt=""
          className="absolute inset-0 object-cover -z-10"
          style={{ width: "100%", height: "100%" }}
        />
        {items.map((item, index) => (
          <Item
            key={index}
            id={item.id}
            name={item.name}
            weight={item.weight}
            value={item.value}
            img={item.img}
            x={item.x}
            y={item.y}
            width={item.width}
            height={item.height}
          />
        ))}
      </div>
    </div>
  );
}

export default Game;

const returnNonZeroElements = (array) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] !== 0) {
        result.push({ id: array[i][j], x: j, y: i });
      }
    }
  }
  return result;
};

function getImageDimensions(src, callback) {
  // Tạo một đối tượng ảnh mới
  const img = new Image();

  // Đặt sự kiện khi ảnh đã tải xong
  img.onload = function () {
    // Khi ảnh đã tải, gọi callback với kích thước của ảnh
    callback({ width: img.width, height: img.height });
  };

  // Xử lý nếu không thể tải ảnh
  img.onerror = function () {
    console.error("Cannot load image:", src);
    callback(null);
  };

  // Đặt src của ảnh để bắt đầu tải
  img.src = src;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Đổi chỗ 2 phần tử
  }
  return array;
}

const arr = [1, 2, 3, 4, 5];
const shuffledArr = shuffleArray(arr);
console.log(shuffledArr);

const getPos = (x, y, width, height, tileSize) => {
  return [
    x * tileSize.width + tileSize.width / 2,
    y * tileSize.height + tileSize.height / 2,
  ];
};
