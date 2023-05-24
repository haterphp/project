import { RouterPath } from "@app/router/path";
import { IStep, Stepper } from "@app/ui";
import { useCallback } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";

const STEPS_LIST: IStep[] = [
  { key: RouterPath.UF_GREETING, title: "1" },
  { key: RouterPath.UF_UPLOAD, title: "2" },
  { key: RouterPath.UF_RESULTS, title: "3", disabled: true },
];

const LayoutStepper = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();    

  const handleOnClick = useCallback((key: string) => {
    navigate(key);
  }, []);

  const handleOnActive = useCallback(
    (key: string) => {
      return !!matchPath(key, pathname);
    },
    [pathname]
  );

  return (
    <Stepper
      steps={STEPS_LIST}
      onActive={handleOnActive}
      onClick={handleOnClick}
    />
  );
};

export { LayoutStepper };
