import * as React from "react"
import { UploadSimple } from "@phosphor-icons/react"

import { cn } from "../../lib/utils"

export interface FileUploadProps {
  /** Called with the dropped or selected files */
  onFiles: (files: File[]) => void
  /** Comma-separated MIME types or extensions, e.g. "image/*,.pdf" */
  accept?: string
  /** Allow multiple file selection */
  multiple?: boolean
  /** Maximum file size in bytes */
  maxSize?: number
  /** Disables the upload zone */
  disabled?: boolean
  /** Additional class names for the root element */
  className?: string
  /** Custom content to render inside the drop zone */
  children?: React.ReactNode
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      onFiles,
      accept,
      multiple = false,
      maxSize,
      disabled = false,
      className,
      children,
    },
    ref
  ) => {
    const [isDragOver, setIsDragOver] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleFiles = React.useCallback(
      (fileList: FileList | null) => {
        if (!fileList || disabled) return
        let files = Array.from(fileList)
        if (maxSize) {
          files = files.filter((f) => f.size <= maxSize)
        }
        if (files.length > 0) {
          onFiles(files)
        }
      },
      [onFiles, maxSize, disabled]
    )

    const handleDragOver = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (!disabled) setIsDragOver(true)
      },
      [disabled]
    )

    const handleDragLeave = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragOver(false)
      },
      []
    )

    const handleDrop = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragOver(false)
        handleFiles(e.dataTransfer.files)
      },
      [handleFiles]
    )

    const handleClick = React.useCallback(() => {
      if (!disabled) inputRef.current?.click()
    }, [disabled])

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault()
          inputRef.current?.click()
        }
      },
      [disabled]
    )

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files)
        // Reset the input so the same file can be selected again
        e.target.value = ""
      },
      [handleFiles]
    )

    const acceptHint = React.useMemo(() => {
      if (!accept) return null
      return accept
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .join(", ")
    }, [accept])

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload files"
        aria-disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed border-input bg-background px-6 py-8 text-center transition-colors duration-quick",
          "hover:border-ring hover:bg-accent/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isDragOver &&
            "border-ring bg-accent/50",
          disabled &&
            "pointer-events-none cursor-not-allowed opacity-50",
          className
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          disabled={disabled}
        />

        {children ?? (
          <>
            <UploadSimple
              className="size-8 text-muted-foreground"
              weight="regular"
            />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-foreground">
                Drop files here or click to browse
              </p>
              {acceptHint && (
                <p className="text-xs text-muted-foreground">
                  Accepted: {acceptHint}
                </p>
              )}
              {maxSize && (
                <p className="text-xs text-muted-foreground">
                  Max size: {formatBytes(maxSize)}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    )
  }
)
FileUpload.displayName = "FileUpload"

/** Format bytes into a human-readable string */
function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B"
  const units = ["B", "KB", "MB", "GB"]
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / Math.pow(1024, i)
  return `${value % 1 === 0 ? value : value.toFixed(1)} ${units[i]}`
}

export { FileUpload }
