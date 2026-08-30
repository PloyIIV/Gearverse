import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import { useEffect } from "react";

import fluidCursor from "../contexts/use-FluidCursor";

const Layout = () => {
  useEffect(() => {
    fluidCursor();
  }, []);
  return (
    <>
      <Navbar />
      <div className="bg-gbg-3">
        <Outlet />
        <div className="fixed top-0 left-0 z-2 pointer-events-none">
          <canvas id="fluid" className="w-screen h-screen" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
