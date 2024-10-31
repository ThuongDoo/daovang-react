import React from "react";

function TextBox({ text }) {
  return (
    <div className="relative bg-blue-500 text-white p-4 rounded-lg w-64">
      <p>{text}</p>
      <div className="absolute bg-blue-500 h-4 w-4 transform rotate-45 bottom-2 -left-1"></div>
    </div>
  );
}

export default TextBox;
