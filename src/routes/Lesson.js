import React, { useEffect, useState } from "react";
import api from "../util/api";
import Ques from "./Ques";
import { useNavigate } from "react-router-dom";

function Lesson() {
  const [lessons, setLessons] = useState([]);
  const [editLesson, setEditLesson] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await api.get("/lesson").then((res) => {
        setLessons(res.data.lessons);
      });
    };
    fetchData();
  }, [editLesson]);

  const handleCreateLesson = async () => {
    await api.post("lesson").then((res) => {
      setEditLesson(res.data.lesson);
    });
  };

  const handleDeleteLesson = async (lessonId) => {
    console.log(lessonId);

    await api.delete(`lesson/${lessonId}`).then((res) => {
      setEditLesson(null);
    });
  };

  return (
    <div className=" bg-white flex space-x-1 h-full w-full text-yellow-500">
      <div className=" w-1/4 flex flex-col bg-black overflow-hidden p-4 space-y-4 h-screen">
        <button
          onClick={() => {
            handleCreateLesson();
          }}
          className=" bg-black border border-yellow-500 w-full hover:bg-white hover:text-black rounded-xl py-2"
        >
          Bài học mới
        </button>
        <div className=" space-y-2 flex-1 cursor-pointer overflow-scroll pb-20">
          {lessons.map((lesson, index) => (
            <div
              key={index}
              onClick={() => setEditLesson(lesson)}
              className=" bg-black border flex justify-between px-2 items-center border-yellow-500 w-full hover:bg-white hover:text-black rounded-xl py-2"
            >
              {lesson.name}
              <button
                onClick={() => {
                  handleDeleteLesson(lesson._id);
                }}
                className=" bg-red-500 rounded-sm size-6 text-white z-50"
              >
                X
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            navigate("/");
          }}
          className=" bg-yellow-500 hover:bg-black hover:border hover:border-yellow-500 hover:text-yellow-500 text-black py-4 text-xl font-bold rounded-xl"
        >
          MENU
        </button>
      </div>
      <div className=" w-3/4 bg-black h-full overflow-scroll">
        {editLesson !== null && <Ques lesson={editLesson} />}
      </div>
    </div>
  );
}

export default Lesson;
