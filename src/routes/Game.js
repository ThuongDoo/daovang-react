import React, { useEffect, useState } from "react";
import Level from "./Level";
import {
  level0,
  level1,
  level2,
  level3,
  level4,
  level5,
} from "../resources/levels/level";
import GameOver from "./GameOver";
import Shop from "./Shop";
import { useLocation } from "react-router-dom";
import api from "../util/api";

function Game() {
  const levels = [level0, level1, level2, level3, level4, level5];

  const location = useLocation();
  const name = location.state?.name;

  const [level, setLevel] = useState(0);
  const [shopItems, setShopItems] = useState(new Array(4).fill(null));

  const [isPause, setIsPause] = useState(1);
  const [isReset, setIsReset] = useState(false);
  const [isNext, setIsNext] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const handlePause = (pauseState) => {};

  useEffect(() => {
    const fetchDate = async () => {
      await api.get("lesson/all").then((res) => {
        setQuestions(res.data.lessons);
      });
    };
    fetchDate();
  }, []);

  const handleGameOver = (changeState) => {
    setLevel(0);
    setIsPause(1);
    setIsReset(!isReset);
    setShopItems(new Array(4).fill(null));
    setScore(0);
  };

  const handleLevelEnd = (value) => {
    const { state, score, questions } = value;
    setScore(score);

    if (state === 1) {
      setIsPause(-1);
      // setQuestions(questions);
      if (level < levels?.length - 1) {
        setIsPause(-1);
      } else {
        setIsNext(state);
        setIsPause(0);
      }
      setShopItems(value.shopItems);
    } else {
      setIsPause(0);
      setIsNext(state);
    }
  };

  const handleNextLevel = (value) => {
    setScore(value.newScore);
    setShopItems(value.newBoughtItems);
    setLevel(level + 1);
    setIsPause(1);
  };
  console.log(questions);

  return (
    <div className="  h-screen">
      {questions?.length === 0 ? (
        <div className=" bg-black flex items-center justify-center w-full h-full">
          <h1 className=" text-white text-3xl">Loading...</h1>
        </div>
      ) : (
        <div className=" h-screen ">
          {isPause === 1 ? (
            <Level
              level={levels[level]}
              onPause={handlePause}
              isReset={isReset}
              onEndTime={handleLevelEnd}
              shopItems={shopItems}
              oldScore={score}
              PQuestion={questions[level]?.questions}
              name={name}
            />
          ) : isPause === -1 ? (
            <Shop
              score={score}
              boughtItems={shopItems}
              onNext={handleNextLevel}
            />
          ) : (
            <GameOver
              name={name}
              next={isNext}
              onRePlay={handleGameOver}
              levelMax={levels?.length}
              currentLevel={level}
              score={score}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Game;
