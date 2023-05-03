import { Outlet } from "react-router-dom";

import CLASSNAMES from "./index.module.css";

import { LayoutStepper } from "./stepper";


const ApplicationLayout = () => {
  return (
    <div className={CLASSNAMES.layout}>
      <div className={CLASSNAMES.layout__stepper}>
        <LayoutStepper />
      </div>

      <div className={CLASSNAMES.layout__content}>
          <Outlet />
      </div>
    </div>
  );
};

export { ApplicationLayout };
