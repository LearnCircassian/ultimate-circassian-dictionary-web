import React, { useState } from "react";
import { cn } from "~/utils/classNames";

interface TopTooltipWithBottomSpikeProps {
  text: string;
  children: React.ReactNode;
  className?: string;
}

export default function TopTooltipWithBottomSpike({
  text,
  children,
  className = "",
}: TopTooltipWithBottomSpikeProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleTooltip = (visible: boolean) => {
    setIsVisible(visible);
  };

  return (
    <div className="relative flex items-center">
      {/* Tooltip Content */}
      {isVisible && (
        <div
          className={cn(
            `absolute bg-white whitespace-nowrap text-black text-sm rounded-md px-3 py-2 font-vt323 shadow-md`,
            "bottom-full left-1/2 transform -translate-x-1/2 mb-1",
            className,
          )}
        >
          {text}
          {/* Arrow */}
          <div
            className={cn(
              `absolute w-0 h-0 border-solid border-4`,
              "left-1/2 transform -translate-x-1/2 top-0 -translate-y-full",
            )}
            style={{
              borderColor: "transparent transparent #ffffff transparent",
            }}
          />
        </div>
      )}

      {/* Wrapped Children */}
      <div
        onMouseEnter={() => toggleTooltip(true)}
        onMouseLeave={() => toggleTooltip(false)}
        className="inline-block"
      >
        {children}
      </div>
    </div>
  );
}
