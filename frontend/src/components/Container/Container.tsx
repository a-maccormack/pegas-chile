import React from 'react';
import type { HTMLAttributes } from 'react';

type ContainerProps = HTMLAttributes<HTMLDivElement>;

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <div className={`w-[60%] mx-auto ${className || ''}`} {...otherProps}>
      {children}
    </div>
  );
};

export default Container;
