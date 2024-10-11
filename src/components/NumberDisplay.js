import React from "react";
import num0 from "../resources/imgs/so0.png";
import num1 from "../resources/imgs/so1.png";
import num2 from "../resources/imgs/so2.png";
import num3 from "../resources/imgs/so3.png";
import num4 from "../resources/imgs/so4.png";
import num5 from "../resources/imgs/so5.png";
import num6 from "../resources/imgs/so6.png";
import num7 from "../resources/imgs/so7.png";
import num8 from "../resources/imgs/so8.png";
import num9 from "../resources/imgs/so9.png";

const numberImgs = [num0, num1, num2, num3, num4, num5, num6, num7, num8, num9];

const NumberDisplay = ({ number }) => {
  // Chuyển số thành chuỗi để tách từng chữ số
  const digits = number.toString().split("");

  return (
    <div style={{ display: "flex" }}>
      {digits.map((digit, index) => (
        <img
          key={index}
          src={numberImgs[parseInt(digit)]} // Lấy ảnh tương ứng với chữ số
          alt={`digit-${digit}`}
          style={{ width: "50px", height: "auto", marginRight: "5px" }} // Style để điều chỉnh kích thước và khoảng cách giữa các ảnh
        />
      ))}
    </div>
  );
};

export default NumberDisplay;
