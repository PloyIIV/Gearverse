import React from "react";

const HeaderSection = ({ name }) => {
  return (
    <h2 className="text-white font-bold text-xl mb-8">
      <span className="text-gpurple-2 font-black">—</span> {name.toUpperCase()}
    </h2>
  );
};

export default HeaderSection;
