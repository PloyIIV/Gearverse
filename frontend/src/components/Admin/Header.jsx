import React from "react";

const Header = ({ heading, desc }) => {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
        Admin Dashboard
      </p>
      <h1 className="text-3xl font-bold sm:text-4xl">{heading}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        {desc}
      </p>
    </div>
  );
};

export default Header;
