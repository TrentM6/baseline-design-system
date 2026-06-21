import * as React from "react";
import {
  CloudArrowUp,
  File as FileIcon,
  X,
  CheckCircle,
  Spinner,
} from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type FileStatus = "uploading" | "complete" | "error";

interface UploadFile {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: FileStatus;
}

export interface FileUploaderProps {
  className?: string;
}

const STATUS_STYLE: Record<FileStatus, { fg: string; label: string }> = {
  uploading: { fg: "var(--bl-fill-primary)", label: "Uploading" },
  complete: { fg: "var(--bl-fill-success)", label: "Complete" },
  error: { fg: "var(--bl-fill-danger)", label: "Failed" },
};

const DEFAULT_FILES: UploadFile[] = [
  { id: "1", name: "design-system-spec.pdf", size: "2.4 MB", progress: 100, status: "complete" },
  { id: "2", name: "quarterly-report.xlsx", size: "1.8 MB", progress: 64, status: "uploading" },
  { id: "3", name: "brand-assets.zip", size: "12.1 MB", progress: 22, status: "uploading" },
];

export function FileUploader({ className }: FileUploaderProps) {
  const [files, setFiles] = React.useState(DEFAULT_FILES);
  const [dragOver, setDragOver] = React.useState(false);

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));

  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm">Upload Files</CardTitle>
        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 tabular-nums">
          {files.length} files
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Drop zone */}
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-6 transition-colors duration-quick ease-out cursor-pointer",
            dragOver
              ? "border-[var(--bl-fill-primary)] bg-[color-mix(in_srgb,var(--bl-fill-primary)_8%,transparent)]"
              : "border-[var(--bl-border-muted)] hover:border-[var(--bl-border-primary)] hover:bg-[var(--bl-bg-elevated)]"
          )}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
          role="button"
          tabIndex={0}
          aria-label="Drop files here or click to upload"
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") e.preventDefault(); }}
        >
          <CloudArrowUp size={28} weight="duotone" style={{ color: "var(--bl-fg-muted)" }} />
          <div className="text-center">
            <p className="text-[13px] font-medium" style={{ color: "var(--bl-fg-primary)" }}>
              Drop files here or click to upload
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: "var(--bl-fg-muted)" }}>
              PDF, XLSX, ZIP up to 50 MB
            </p>
          </div>
        </div>

        {/* File list */}
        <div className="space-y-1">
          {files.map((file) => {
            const status = STATUS_STYLE[file.status];
            return (
              <div
                key={file.id}
                className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors duration-instant ease-out hover:bg-[var(--bl-bg-elevated)]"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "var(--bl-bg-active)" }}
                >
                  <FileIcon size={16} weight="duotone" style={{ color: "var(--bl-fg-secondary)" }} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-medium truncate" style={{ color: "var(--bl-fg-primary)" }}>
                      {file.name}
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {file.status === "complete" && (
                        <CheckCircle size={14} weight="fill" style={{ color: status.fg }} />
                      )}
                      {file.status === "uploading" && (
                        <Spinner size={14} className="animate-spin" style={{ color: status.fg }} />
                      )}
                      <span className="text-[10px] tabular-nums" style={{ color: "var(--bl-fg-muted)" }}>
                        {file.size}
                      </span>
                    </div>
                  </div>
                  {file.status === "uploading" && (
                    <div className="mt-1.5">
                      <Progress value={file.progress} className="h-1" />
                      <p className="text-[10px] mt-0.5 tabular-nums" style={{ color: "var(--bl-fg-muted)" }}>
                        {file.progress}%
                      </p>
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0"
                  onClick={() => removeFile(file.id)}
                  aria-label={`Remove ${file.name}`}
                >
                  <X size={14} />
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
