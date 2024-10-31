import React, { useEffect, useRef, useState } from "react";
import bg2 from "../resources/imgs/bg2.png";
import bg from "../resources/imgs/bg.png";
import player from "../resources/imgs/player.png";
import Item from "../components/Item";
import itemList from "../resources/items.json";
import Hook from "../components/Hook";
import NumberDisplay from "../components/NumberDisplay";
import config from "../resources/config.json";
import GameOver from "./GameOver";
import questionList from "../resources/question.json";

function Level({
  level,
  onPause,
  onEndTime,
  isReset,
  shopItems,
  oldScore,
  PQuestion,
}) {
  const { hookRadius, timeLimit } = config;

  const [items, setItems] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(oldScore);
  const [scoreRequire, setScoreRequire] = useState(0);
  const [newShopItems, setNewShopItems] = useState(shopItems);
  const gameRef = useRef(null);
  const [tileSize, setTileSize] = useState({ width: 0, height: 0 });
  const [hookPos, setHookPos] = useState([]);
  const [isGrab, setIsGrab] = useState(0);
  const [grabbedItem, setGrabbedItem] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState(null);
  const [speedStack, setSpeedStack] = useState(0);
  const [seconds, setSeconds] = useState(timeLimit);
  const [itemUsed, setItemUsed] = useState(null);
  const [isUsed3, setIsUsed3] = useState(false);

  console.log(questions.length);

  useEffect(() => {
    // Hàm xử lý sự kiện nhấn phím
    const handleKeyPress = (event) => {
      if (event.key === "1") {
        if (newShopItems[0] !== null) {
          setItemUsed(newShopItems[0]);
          removeElement(0);
        }
        // Thực hiện các hành động khác dựa trên phím nhấn
      }
      if (event.key === "2") {
        if (newShopItems[1] !== null) {
          setItemUsed(newShopItems[1]);
          removeElement(1);
        }

        // Thực hiện các hành động khác dựa trên phím nhấn
      }
      if (event.key === "3") {
        if (newShopItems[2] !== null) {
          setItemUsed(newShopItems[2]);
          removeElement(2);
        }

        // Thực hiện các hành động khác dựa trên phím nhấn
      }
      if (event.key === "4") {
        if (newShopItems[3] !== null) {
          setItemUsed(newShopItems[3]);
          removeElement(3);
        }

        // Thực hiện các hành động khác dựa trên phím nhấn
      }
    };

    // Thêm sự kiện keydown vào window
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup sự kiện khi component bị hủy
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [newShopItems]);

  useEffect(() => {
    if (itemUsed !== null) {
      switch (itemUsed.id) {
        case 3: {
          setIsUsed3(true);
          setTimeout(() => {
            setIsUsed3(false);
          }, 60000);
          break;
        }
        case 5: {
          setSeconds(seconds + 5);

          break;
        }
        default:
      }
    }
  }, [itemUsed]);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timer); // Xoá timer khi component bị unmount hoặc cập nhật
    } else {
      if (score >= scoreRequire) {
        onEndTime({
          state: 1,
          score: score,
          shopItems: newShopItems,
          questions: questions,
        });
      } else {
        onEndTime({
          state: 0,
          score: score,
          shopItems: newShopItems,
          questions,
          questions,
        });
      }
      onPause(true);
    }
  }, [seconds]);

  useEffect(() => {
    const a = returnNonZeroElements(level.map);
    const newItems = a.map((i, index) => {
      const newData = itemList.find((j) => j.id === i.id);
      const newPos = getPos(i.x, i.y, newData.width, newData.height, tileSize);
      return { ...newData, x: newPos[0], y: newPos[1] };
    });
    setScoreRequire(level.scoreRequire);
    setItems(newItems);
    setSeconds(timeLimit);
    return () => {};
  }, [tileSize, level, isReset]);

  //change later
  useEffect(() => {
    const newQuestions = shuffleArray(PQuestion);
    setQuestions(newQuestions);
  }, [PQuestion]);

  useEffect(() => {
    if (questions.length === 0) {
      const newQuestions = shuffleArray(questionList);
      setQuestions(newQuestions);
    }
  }, [questions]);

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
      let newValue = grabbedItem.value;
      if (isUsed3 === true) {
        if (grabbedItem.id === 4) {
          newValue *= 10;
        }
      } else if (data === false) {
        newValue = 0;
      }
      const newScore = score + newValue;
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

  // Hàm xóa phần tử khỏi mảng bằng cách thay thế bằng null
  const removeElement = (index) => {
    setNewShopItems((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = null;
      return newArray;
    });
  };

  return (
    <div className=" h-full w-full flex flex-col relative ">
      <div
        className={` absolute bg-blue-500 opacity-70 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 z-40 flex flex-col justify-between p-10  ${
          isGrab === true ? "block" : "hidden"
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
        <div className=" absolute flex items-center justify-between w-full p-4 text-white">
          <div className=" flex items-start gap-x-2">
            {newShopItems.map((item, index) => (
              <div
                key={index}
                className=" size-20 bg-white flex items-center relative"
              >
                {item !== null && (
                  <img
                    src={require(`../resources/imgs/${item?.img}`)}
                    alt=""
                    className=" size-20"
                  ></img>
                )}
                <h1 className=" text-black absolute top-0">{index + 1}</h1>
              </div>
            ))}
          </div>
          <div className=" flex items-center flex-col">
            {/* <NumberDisplay number={score} /> */}
            <h1 className=" font-mono font-bold text-4xl">
              LEVEL {level.index}
            </h1>
            <h1 className=" text-5xl font-mono font-bold">{seconds} s</h1>

            {/* <NumberDisplay number={scoreRequire} /> */}

            <h1 className=" text-3xl font-mono font-bold">
              SCORE: {score} / {scoreRequire}
            </h1>
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
          itemUsed={itemUsed}
        />
      </div>

      <div className=" flex-1 relative bgbl500" ref={gameRef}>
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

export default Level;

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

const getPos = (x, y, width, height, tileSize) => {
  return [
    x * tileSize.width + tileSize.width / 2,
    y * tileSize.height + tileSize.height / 2,
  ];
};
