import { Outlet } from "react-router-dom";

import CLASSNAMES from "./index.module.css";

import { LayoutStepper } from "./stepper";
import { Toolbar } from "./toolbar";
import { Navbar } from "./navbar";
import { useState } from "react";


const ApplicationLayout = () => {

  const [isOpenNavbar, setIsOpenNavbar] = useState(false)

  return (
    <div className="h-screen overflow-hidden">
      <Toolbar onNavbarControl={setIsOpenNavbar} />
      <div className="flex">
        <Navbar isOpen={isOpenNavbar} />

        <div className={CLASSNAMES.layout} style={{ transform: isOpenNavbar ? 'translateX(400px)' : '' }}>
          <div className={CLASSNAMES.layout__stepper}>
            <LayoutStepper />
          </div>

          <div className={CLASSNAMES.layout__content}>
            <Outlet />
          </div>
        </div>
      </div>

    </div>
  );
};

export { ApplicationLayout };
