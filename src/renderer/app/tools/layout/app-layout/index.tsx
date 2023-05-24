import { Outlet } from "react-router-dom";

import CLASSNAMES from "./index.module.css";

import { Toolbar } from "../common/toolbar";
import { Navbar } from "../common/navbar";
import { useState } from "react";


const ApplicationLayout = () => {

  const [isOpenNavbar, setIsOpenNavbar] = useState(false)

  const handleOnClose = () => setIsOpenNavbar(false)

  return (
    <div className="h-screen overflow-hidden">
      <Toolbar onNavbarControl={setIsOpenNavbar} />
      <div className="flex">
        <Navbar isOpen={isOpenNavbar} />

        <div className={CLASSNAMES.layout} style={{ transform: isOpenNavbar ? 'translateX(400px)' : '' }}>
          { isOpenNavbar && <div className="w-full h-full absolute z-10 top-0 left-0 cursor-pointer" onClick={handleOnClose} /> }
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export { ApplicationLayout };
