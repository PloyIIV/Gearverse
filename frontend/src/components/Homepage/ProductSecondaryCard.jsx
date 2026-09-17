import { Heart, ShoppingCart } from "lucide-react";
import React from "react";

const ProductSecondaryCard = ({ img, name, price, description }) => {
  return (
    <div className="border border-gpurple-2 bg-gbg-1/95 text-center rounded-2xl shadow-lg shadow-purple-900/50">
      <img className="rounded-t-2xl h-80 object-cover" src={img} alt={name} />
      <div className="w-[80%] mx-auto my-4 text-white">
        <h3 className="font-bold text-xl">{name.toUpperCase()}</h3>
        <p className="text-sm font-light mt-4">{description}</p>
      </div>
      <div className="flex justify-between m-4 mt-10">
        <div className="flex w-40 justify-between items-center border-2 rounded-xl border-gpurple-2">
          <p className="text-gpurple-2 w-full font-bold textxl p-2">${price}</p>
          <button /*onClick={''} */ className="bg-gpurple-2 p-2 rounded-e-lg">
            <ShoppingCart className="hover:stroke-gpurple-4 hover:fill-gpurple-4" />
          </button>
        </div>
        <button>
          <Heart
            color="#A78BFA"
            className="hover:fill-gpurple-2 active:fill-red-600 active:stroke-red-600 "
          />
        </button>
      </div>
    </div>
  );
};

export default ProductSecondaryCard;
