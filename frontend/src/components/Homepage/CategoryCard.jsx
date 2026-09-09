import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ img, name }) => {
  return (
    <div className="border border-gpurple-2 rounded-4xl">
      <Link className="relative">
        <img src={img} alt="" className="rounded-4xl" />
        <div className="font-bold absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
          <p className="text-white tracking-widest">{name.toUpperCase()}</p>
          {/* <p className="text-sm font-medium text-gpurple-1 border border-gpurple-1 bg-gpurple-2/60 px-3 py-0.5 mt-1 rounded-2xl">
           SEE MORE {"➜"}
          </p> */}
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
