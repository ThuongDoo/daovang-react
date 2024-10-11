import React, { useEffect, useRef, useState } from "react";
import png from "../resources/imgs/gold3.png";

function Item({ id, name, weight, value, img, x, y, width, height }) {
  const imgRef = useRef(null);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (imgRef.current) {
      setImgSize({
        width: imgRef.current.clientWidth,
        height: imgRef.current.clientHeight,
      });
    }
  }, [imgRef]);
  return (
    <div
      className=" absolute"
      style={{ left: x - width / 2, top: y - height / 2 }}
    >
      <img ref={imgRef} src={require(`../resources/imgs/${img}`)} alt="" />
    </div>
    // <div className=" absolute bg-black size-2" style={{ left: x, top: y }}>
    //   <img ref={imgRef} src={require(`../resources/imgs/${img}`)} alt="" />
    // </div>
  );
}

export default Item;
