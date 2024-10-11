import React, { useEffect, useRef, useState } from "react";
import hookImageSrc from "../resources/imgs/moc1.png";
import config from "../resources/config.json";

function Hook({ isGrab, pos, done, grabbedItem, speedStack, isPause }) {
  const { maxHookLength, minHookLength, hookSpeed, speedBonusPerStack } =
    config;
  const divRef = useRef(null);
  const canvasRef = useRef(null);

  const top = 100;
  const left = 20;

  const [hookAngle, setHookAngle] = useState(0); // Góc của móc
  const [hookLength, setHookLength] = useState(minHookLength); // Chiều dài ban đầu của móc
  const [swingSpeed, setSwingSpeed] = useState(config.swingSpeed); // Tốc độ lắc qua lại của móc
  const [isExtending, setIsExtending] = useState(false); // Trạng thái kéo dài của móc
  const originalImgSrc = "moc1.png";

  const updateCanvasSize = () => {
    const div = divRef.current;
    const canvas = canvasRef.current;
    if (div && canvas) {
      // Lấy kích thước của div chứa canvas
      const width = div.offsetWidth;
      const height = div.offsetHeight;

      // Cập nhật kích thước của canvas để khớp với div
      canvas.width = width;
      canvas.height = height;
    }
  };

  useEffect(() => {
    if (isGrab === true) {
      setIsExtending(false);
    }
  }, [isGrab]);

  // Xử lý sự kiện phím nhấn
  useEffect(() => {
    updateCanvasSize();

    // Cập nhật kích thước canvas khi thay đổi kích thước cửa sổ

    const handleKeyDown = (event) => {
      if (event.key === "ArrowDown") {
        setIsExtending(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  // Cập nhật trạng thái móc
  useEffect(() => {
    if (isPause !== true) {
      const interval = setInterval(() => {
        setHookLength((prevLength) => {
          if (isExtending && prevLength < maxHookLength) {
            return prevLength + hookSpeed;
          } else if (!isExtending && prevLength > minHookLength) {
            if (isGrab) {
              return (
                prevLength -
                (hookSpeed -
                  grabbedItem.weight +
                  (hookSpeed - grabbedItem.weight) *
                    speedStack *
                    speedBonusPerStack)
              );
            } else {
              return prevLength - hookSpeed;
            }
          } else if (!isExtending) {
            setHookAngle((prevAngle) => {
              let newAngle = prevAngle + swingSpeed;

              if (newAngle > Math.PI || newAngle < 0) {
                setSwingSpeed(-swingSpeed); // Đổi hướng lắc
              }
              return newAngle;
            });
          }
          return prevLength;
        });
      }, 16); // Tốc độ cập nhật khoảng 60fps
      return () => clearInterval(interval);
    }
  }, [swingSpeed, isExtending, isGrab, grabbedItem, speedStack, isPause]);

  // Vẽ móc
  useEffect(() => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const hookImage = new Image();
    if (hookLength <= minHookLength) {
      hookImage.src = require(`../resources/imgs/${originalImgSrc}`);
      done(true);
    } else if (isGrab) {
      hookImage.src = require(`../resources/imgs/${grabbedItem.grabbedImg}`);
    } else {
      hookImage.src = require(`../resources/imgs/${originalImgSrc}`);
    }
    const drawHook = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Tính toán vị trí điểm đầu và cuối của móc
      const hookX = canvas.width / 2 + hookLength * Math.cos(hookAngle) - left;
      const hookY = hookLength * Math.sin(hookAngle) + top;

      // Vẽ dây móc
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - left, top);
      ctx.lineTo(hookX, hookY);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Vẽ cái móc
      if (hookImage.complete) {
        ctx.save();
        // Dịch chuyển canvas đến vị trí của móc
        ctx.translate(hookX, hookY);
        // Xoay canvas theo góc của dây để móc nghiêng theo dây
        ctx.rotate(hookAngle - Math.PI / 2);

        // Vẽ hình móc
        ctx.drawImage(hookImage, -hookImage.width / 2, 0);
        ctx.restore();
      }
      // ctx.arc(hookX, hookY, 10, 0, Math.PI * 2);
      // ctx.fillStyle = "gold";
      // ctx.fill();

      pos([hookX, hookY]);
      if (
        hookX <= 0 ||
        hookX >= divRef.current.offsetWidth ||
        hookY <= 0 ||
        hookY >= divRef.current.offsetHeight
      ) {
        setIsExtending(false);
      }
    };
    hookImage.onload = () => {
      drawHook();
    };
    drawHook();
  }, [hookAngle, hookLength, grabbedItem, isGrab]);

  return (
    <div className=" w-full h-full flex" ref={divRef}>
      <canvas
        ref={canvasRef}
        id="gameCanvas"
        className=" w-full h-full"
        width="1200"
        height={600}
      ></canvas>
    </div>
  );
}

export default Hook;