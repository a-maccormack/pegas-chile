import React from "react";
import type { HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <div className={`mx-auto w-[60%] ${className || ""}`} {...otherProps}>
      {children}
    </div>
  );
};

export default Container;
