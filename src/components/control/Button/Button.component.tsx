import { forwardRef } from "react";

import "./Button.styles.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary";
}

export const Button: React.FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", className, ...nativeProps }, ref) => {
    return (
      <button ref={ref} className={`btn btn-${variant} ${className ? className : ""}`} {...nativeProps}>
        {children}
      </button>
    );
  }
);
