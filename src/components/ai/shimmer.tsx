"use client";

import { cn } from "../../lib/utils";
import { motion } from "motion/react";
import {
  type CSSProperties,
  type ElementType,
  type JSX,
  memo,
  useMemo,
} from "react";

export type TextShimmerProps = {
  children: string;
  as?: ElementType;
  className?: string;
  duration?: number;
  spread?: number;
};

const ShimmerComponent = ({
  children,
  as: Component = "p",
  className,
  duration = 2,
  spread = 2,
}: TextShimmerProps) => {
  const MotionComponent = motion.create(
    Component as keyof JSX.IntrinsicElements
  );

  const dynamicSpread = useMemo(
    () => (children?.length ?? 0) * spread,
    [children, spread]
  );

  return (
    <MotionComponent
      animate={{ backgroundPosition: "0% center" }}
      className={cn(
        "relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent",
        // sweep highlight + base text color are Baseline tokens — the vendored
        // original referenced Tailwind v4 --color-* theme vars that don't exist
        // in a v3 consumer, which rendered the clipped text fully transparent
        "[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--bl-fg-primary),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]",
        className
      )}
      initial={{ backgroundPosition: "100% center" }}
      style={
        {
          "--spread": `${dynamicSpread}px`,
          backgroundImage:
            "var(--bg), linear-gradient(var(--bl-fg-muted), var(--bl-fg-muted))",
        } as CSSProperties
      }
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration,
        ease: "linear",
      }}
    >
      {children}
    </MotionComponent>
  );
};

export const Shimmer = memo(ShimmerComponent);
