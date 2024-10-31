import React, { useEffect, useState } from "react";
import shopKeeperImg from "../resources/imgs/shopkepper.webp";
import shopItemList from "../resources/shopItems.json";
import ShopItem from "../components/ShopItem";
import TextBox from "../components/TextBox";

function Shop({ score, boughtItems, onNext }) {
  const randomShopItemLength = getRandomNumber(1, 4);
  const [newScore, setNewScore] = useState(score);
  const [shopItems, setShopItems] = useState(
    getRandomElements(shopItemList, randomShopItemLength)
  );

  const [hiddenItems, setHiddenItems] = useState([false, false, false, false]);

  const [newBoughtItems, setNewBoughtItems] = useState(boughtItems);

  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    setHiddenItems([false, false, false, false]);
  }, [score]);

  // Hàm thêm phần tử mới vào mảng
  const handleBuy = () => {
    setNewBoughtItems((prevArray) => {
      const nullIndex = prevArray.indexOf(null);
      if (nullIndex !== -1) {
        // Tạo bản sao mảng mới và thêm phần tử vào vị trí null
        const newArray = [...prevArray];
        newArray[nullIndex] = shopItems[activeItem];
        setNewScore(newScore - shopItems[activeItem]?.cost);

        const newHiddenItems = hiddenItems;
        newHiddenItems[activeItem] = true;
        setHiddenItems(newHiddenItems);
        return newArray;
      } else {
        // alert("Mảng đã đầy. Không thể thêm phần tử mới.");
        return prevArray;
      }
    });
  };

  return (
    <div className=" h-full w-full flex flex-col bg-stone-800">
      <div className=" flex items-start gap-x-2">
        {newBoughtItems.map((item, index) => (
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
      <div className=" absolute right-0 px-20 text-yellow-500 font-bold text-3xl">
        SCORE: {newScore}
      </div>
      <div className=" h-2/3 bg-stone-800"></div>
      <div className="absolute bottom-20 -left-32">
        <img src={shopKeeperImg} className=" " alt=""></img>
        {activeItem !== null && (
          <div className={` absolute top-0 left-96`}>
            <TextBox text={shopItems[activeItem].description} />
          </div>
        )}
      </div>

      <div className=" flex gap-x-10 left-96 bottom-40 z-40 items-end absolute">
        {shopItems.map((item, index) => (
          <div
            className={` hover:bg-gray-500 hover:cursor-pointer  ${
              hiddenItems[index] === false && activeItem === index && "bg-white"
            } `}
            onClick={() => {
              if (hiddenItems[index] === true) {
                setActiveItem(null);
              } else {
                setActiveItem(index);
              }
            }}
            key={index}
          >
            <ShopItem
              key={index}
              img={item.img}
              name={item.name}
              id={item.id}
              description={item.description}
              cost={item.cost}
            />
          </div>
        ))}
      </div>

      <div className=" h-1/3 flex flex-col z-20">
        <div className=" h-2/6 bg-yellow-500"></div>
        <div className=" h-4/6 bg-yellow-800 mx-10 space-x-10 flex justify-center gap-x-3 items-center">
          <button
            disabled={
              activeItem === null || newScore < shopItems[activeItem]?.cost
            }
            className={`   rounded-xl w-72 h-12 text-3xl font-bold ${
              activeItem === null || newScore < shopItems[activeItem]?.cost
                ? "bg-gray-500"
                : "bg-yellow-400"
            }`}
            onClick={handleBuy}
          >
            Mua
          </button>
          <button
            className={` bg-yellow-400  w-72 h-12 rounded-xl text-3xl font-bold `}
            onClick={() => {
              onNext({ newBoughtItems, newScore });
            }}
          >
            Chơi tiếp
          </button>
        </div>
      </div>
    </div>
  );
}

function getRandomNumber(x, y) {
  return Math.floor(Math.random() * (y - x + 1)) + x;
}

function getRandomElements(arr, num) {
  let result = [];
  let copyArr = [...arr]; // Tạo một bản sao của mảng để tránh thay đổi mảng gốc

  for (let i = 0; i < num; i++) {
    if (copyArr.length === 0) break; // Nếu mảng rỗng, dừng vòng lặp
    let randomIndex = Math.floor(Math.random() * copyArr.length); // Lấy ngẫu nhiên chỉ số
    result.push(copyArr[randomIndex]); // Thêm phần tử vào kết quả
    copyArr.splice(randomIndex, 1); // Xóa phần tử đã chọn khỏi mảng sao chép
  }

  return result;
}

export default Shop;
