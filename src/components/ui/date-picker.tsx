import * as React from "react"
import { CalendarBlank } from "@phosphor-icons/react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export interface DatePickerProps {
  /** Currently selected date */
  value?: Date
  /** Called when the user selects a date */
  onChange?: (date: Date | undefined) => void
  /** Placeholder text shown when no date is selected */
  placeholder?: string
  /** Disables the date picker */
  disabled?: boolean
  /** Additional class names for the trigger button */
  className?: string
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = "Pick a date",
      disabled = false,
      className,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            disabled={disabled}
            aria-label={
              value ? `Selected date: ${format(value, "PPP")}` : placeholder
            }
            className={cn(
              "w-[280px] justify-start gap-2 text-left font-normal transition-colors duration-instant",
              !value && "text-muted-foreground",
              className
            )}
          >
            <CalendarBlank className="size-4 shrink-0" weight="regular" />
            <span>{value ? format(value, "PPP") : placeholder}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange?.(date)
              setOpen(false)
            }}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
)
DatePicker.displayName = "DatePicker"

export { DatePicker }
