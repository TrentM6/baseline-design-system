import * as React from "react"
import { CaretDown } from "@phosphor-icons/react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const nativeSelectVariants = cva(
  "flex h-10 w-full appearance-none rounded-md bg-background px-3 py-2 pr-10 text-base ring-offset-background transition-colors duration-instant placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: "border border-input",
        outline:
          "border-2 border-input hover:border-ring",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface NativeSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof nativeSelectVariants> {}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(nativeSelectVariants({ variant, className }))}
          {...props}
        >
          {children}
        </select>
        <CaretDown
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          weight="bold"
          aria-hidden="true"
        />
      </div>
    )
  }
)
NativeSelect.displayName = "NativeSelect"

export { NativeSelect, nativeSelectVariants }
