import { MouseEventHandler, PropsWithChildren, useMemo } from "react";
import { IDefaultComponentProps } from "../common";

import CLASSNAMES from './index.module.css';

type ButtonColors = "primary" | "secondary" | "error";
type ButtonSizes = "default" | "small";

interface IButtonProps extends PropsWithChildren, IDefaultComponentProps {
  color: ButtonColors;
  size?: ButtonSizes;

  htmlType?: "submit" | "button";
  fullWidth?: boolean;

  onClick?: MouseEventHandler;
}

const COLOR_PRESETS_CLASSNAMES: Record<ButtonColors, string> = {
  primary: CLASSNAMES.btn_primary,
  secondary: CLASSNAMES.btn_secondary,
  error: CLASSNAMES.btn_error,
};

const SIZES_PRESETS_CLASSNAMES: Record<ButtonSizes, string> = {
  default: CLASSNAMES.btn_default,
  small: CLASSNAMES.btn_small
}

const Button = ({
  color,
  htmlType,
  fullWidth,
  children,
  className,
  size,
  ...props
}: IButtonProps) => {
  const innerClassname = useMemo(() => {
    return [
      CLASSNAMES.btn,
      COLOR_PRESETS_CLASSNAMES[color],
      SIZES_PRESETS_CLASSNAMES[size ?? 'default'],
      fullWidth ? CLASSNAMES.btn_block : null,
      className ?? null,
    ]
      .filter((item) => item !== null)
      .join(" ");
  }, [color, className]);  

  return (
    <button type={htmlType ?? "button"} className={innerClassname} {...props}>
      {children}
    </button>
  );
};

export { Button };
