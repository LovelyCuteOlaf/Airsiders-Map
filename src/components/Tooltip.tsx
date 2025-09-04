import React, { ReactNode, useState, PropsWithChildren, FC } from "react";

export type TooltipProps = {
  message: string | ReactNode;
} & PropsWithChildren;
const Tooltip: FC<TooltipProps> = (
  {
    message,
    children
  }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="relative">
      <div
        className="inline-block"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
      {showTooltip && (
        <div className="absolute bottom-12 w-60 z-5 px-2 py-1 bg-white shadow-md shadow-gray-800 rounded-md">
          {message}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
