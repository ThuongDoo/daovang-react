import React, { useState } from "react";

function CustomArrayComponent() {
  // Khởi tạo mảng với 4 phần tử là null
  const [array, setArray] = useState(new Array(4).fill(null));

  // Hàm thêm phần tử mới vào mảng
  const addElement = (element) => {
    setArray((prevArray) => {
      const nullIndex = prevArray.indexOf(null);
      if (nullIndex !== -1) {
        // Tạo bản sao mảng mới và thêm phần tử vào vị trí null
        const newArray = [...prevArray];
        newArray[nullIndex] = element;
        return newArray;
      } else {
        alert("Mảng đã đầy. Không thể thêm phần tử mới.");
        return prevArray;
      }
    });
  };

  // Hàm xóa phần tử khỏi mảng bằng cách thay thế bằng null
  const removeElement = (index) => {
    setArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = null;
      return newArray;
    });
  };

  // return (
  //   <div>
  //     <h3>Mảng: {JSON.stringify(array)}</h3>

  //     <button onClick={() => addElement(prompt("Nhập phần tử mới"))}>
  //       Thêm phần tử
  //     </button>

  //     {array.map((item, index) => (
  //       <button key={index} onClick={() => removeElement(index)}>
  //         Xóa phần tử {index + 1} (Hiện tại: {item === null ? "null" : item})
  //       </button>
  //     ))}
  //   </div>
  // );
}

export default CustomArrayComponent;
