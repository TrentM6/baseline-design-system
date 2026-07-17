"use client";

import { cn } from "../../lib/utils";
import { type CSSProperties, type ElementType, memo } from "react";

export type TextShimmerProps = {
  children: string;
  as?: ElementType;
  className?: string;
  duration?: number;
  spread?: number;
};

// Pure CSS shimmer (animate-shimmer keyframes live in the tailwind preset).
// The vendored original drove background-position from JS per frame via
// motion AND recreated its motion component every render — on a streaming
// chat surface that re-renders constantly, the animation restarted and
// stuttered. A CSS keyframe loop is immune to re-renders.
const ShimmerComponent = ({
  children,
  as: Component = "p",
  className,
  duration = 2,
  spread = 2,
}: TextShimmerProps) => {
  const dynamicSpread = (children?.length ?? 0) * spread;

  return (
    <Component
      className={cn(
        "relative inline-block animate-shimmer bg-[length:250%_100%,auto] bg-clip-text text-transparent",
        // sweep highlight + base text color are Baseline tokens
        "[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--bl-fg-primary),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]",
        className
      )}
      style={
        {
          "--spread": `${dynamicSpread}px`,
          backgroundImage:
            "var(--bg), linear-gradient(var(--bl-fg-muted), var(--bl-fg-muted))",
          animationDuration: `${duration}s`,
        } as CSSProperties
      }
    >
      {children}
    </Component>
  );
};

export const Shimmer = memo(ShimmerComponent);
