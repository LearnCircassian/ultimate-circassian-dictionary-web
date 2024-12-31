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

  return (
    <div className="relative flex items-center">
      {/* Tooltip Content */}
      <div
        className={cn(
          `absolute bg-gray-800 text-white text-sm rounded-[4px] px-3 py-2 font-vt323 transition-opacity duration-200 whitespace-nowrap`,
          "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
          { hidden: !isVisible },
          className,
        )}
      >
        {text}
        {/* Spike (Arrow) */}
        <div
          className={cn(
            `absolute w-3 h-3 bg-gray-800 transform rotate-45`,
            "left-1/2 -translate-x-1/2 -bottom-1",
          )}
        />
      </div>

      {/* Wrapped Children */}
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-block"
      >
        {children}
      </div>
    </div>
  );
}
