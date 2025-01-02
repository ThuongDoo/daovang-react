import React, { useEffect, useState } from "react";
import api from "../util/api";

const Ques = ({ lesson }) => {
  const [questions, setQuestions] = useState([]); // Lưu danh sách câu hỏi
  const [currentQuestion, setCurrentQuestion] = useState({
    ques: "",
    ans: ["", "", "", ""],
    correct: 0,
  }); // Trạng thái cho câu hỏi đang chỉnh sửa hoặc thêm mới
  const [editingIndex, setEditingIndex] = useState(null); // Chỉ mục câu hỏi đang chỉnh sửa
  const [error, setError] = useState("");
  const [lessonName, setLessonName] = useState(lesson.name);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(`lesson/question/${lesson._id}`)
        .then((res) => {
          setQuestions(res.data.questions);
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchData();
    setLessonName(lesson.name);
  }, [lesson]);

  const handleSaveQuestion = (e) => {
    e.preventDefault();

    const { ques, ans, correct } = currentQuestion;

    // Kiểm tra các điều kiện:
    if (!ques.trim()) {
      setError("Câu hỏi không được để trống.");
      return;
    }

    if (!ans.every((a) => a.trim())) {
      setError("Tất cả các đáp án phải được điền.");
      return;
    }

    if (correct < 0 || correct > 3) {
      setError("Đáp án đúng phải nằm trong khoảng từ 0 đến 3.");
      return;
    }

    setError("");

    if (editingIndex !== null) {
      // Nếu đang chỉnh sửa câu hỏi
      const updatedQuestions = [...questions];
      updatedQuestions[editingIndex] = currentQuestion;
      setQuestions(updatedQuestions);
    } else {
      // Thêm câu hỏi mới
      setQuestions([...questions, currentQuestion]);
    }

    // Reset form
    setCurrentQuestion({
      ques: "",
      ans: ["", "", "", ""],
      correct: 0,
    });
    setEditingIndex(null);
  };

  const handleEditQuestion = (index) => {
    setCurrentQuestion(questions[index]);
    setEditingIndex(index);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSaveToBackend = async () => {
    if (!lessonName.trim()) {
      setError("Câu hỏi không được để trống.");
      return;
    } else {
    }
    await api
      .post("lesson/question", { questions, lessonId: lesson._id, lessonName })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="flex justify-between items-center mb-6 ">
        <input
          type="text"
          value={lessonName}
          onChange={(e) => {
            setLessonName(e.target.value);
          }}
          className="text-3xl font-bold w-4/5 text-start text-gray-800"
          placeholder={`Nhập tên lesson`}
        />
        <button
          className=" bg-yellow-500 text-black font-bold text-xl px-12 py-4 rounded-xl"
          onClick={() => {
            handleSaveToBackend();
          }}
        >
          LƯU
        </button>
      </div>

      {/* Danh sách câu hỏi */}
      <div className="bg-white p-6 shadow rounded-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Danh sách câu hỏi
        </h2>
        {questions.length === 0 ? (
          <p className="text-gray-500 text-lg text-center">
            Chưa có câu hỏi nào.
          </p>
        ) : (
          <ul className="space-y-4">
            {questions.map((q, index) => (
              <li
                key={index}
                className="p-4 border rounded-lg bg-gray-100 shadow-sm"
              >
                <p className="text-lg font-medium text-gray-800">
                  <strong>Câu hỏi {index + 1}:</strong> {q.ques}
                </p>
                {q.ans.map((a, aIndex) => (
                  <h1
                    key={aIndex}
                    className={`${aIndex === q.correct && "text-green-500"}`}
                  >
                    {String.fromCharCode(97 + aIndex) + ": " + a}
                  </h1>
                ))}
                <div className="mt-4">
                  <button
                    onClick={() => handleEditQuestion(index)}
                    className="text-blue-600 font-semibold hover:underline mr-4"
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(index)}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Xóa
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Form tạo/chỉnh sửa câu hỏi */}
      <form
        onSubmit={handleSaveQuestion}
        className="bg-white p-6 shadow rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          {editingIndex !== null ? "Chỉnh sửa câu hỏi" : "Thêm câu hỏi mới"}
        </h2>
        <div className="mb-6">
          <label className="block font-bold text-gray-600 mb-2">Câu hỏi:</label>
          <textarea
            value={currentQuestion.ques}
            onChange={(e) =>
              setCurrentQuestion({ ...currentQuestion, ques: e.target.value })
            }
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
            rows="3"
            placeholder="Nhập câu hỏi"
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block font-bold text-gray-600 mb-2">
            Các đáp án:
          </label>
          {currentQuestion.ans.map((option, index) => (
            <div key={index} className="mb-2 flex items-center ">
              <input
                type="radio"
                name="correct"
                checked={currentQuestion.correct === index}
                onChange={() =>
                  setCurrentQuestion({ ...currentQuestion, correct: index })
                }
                className=" mr-4"
              />
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const updatedAns = [...currentQuestion.ans];
                  updatedAns[index] = e.target.value;
                  setCurrentQuestion({ ...currentQuestion, ans: updatedAns });
                }}
                className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder={`Đáp án ${String.fromCharCode(97 + index)}`}
              />
            </div>
          ))}
        </div>

        {error && <p className="text-red-500 mb-6">{error}</p>}

        <button
          type="submit"
          className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600"
        >
          {editingIndex !== null ? "Lưu câu hỏi" : "Thêm câu hỏi"}
        </button>
      </form>
    </div>
  );
};

export default Ques;
