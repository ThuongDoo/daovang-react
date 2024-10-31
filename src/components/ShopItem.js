import React from "react";

function ShopItem({ img, name, description, id, cost }) {
  return (
    <div className=" flex flex-col items-center px-2">
      <img
        src={require(`../resources/imgs/${img}`)}
        className=" h-32"
        alt="haha"
      />
      <h1 className=" font-bold text-xl">{name}</h1>
      <h1 className=" font-bold text-3xl text-green-700">{cost} $</h1>
    </div>
  );
}

export default ShopItem;
