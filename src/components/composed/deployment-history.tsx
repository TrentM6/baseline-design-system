import {
  GitBranch,
  Clock,
  CheckCircle,
  XCircle,
  SpinnerGap,
} from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

type DeploymentStatus = "success" | "failed" | "in-progress";

interface Deployment {
  id: string;
  commitHash: string;
  branch: string;
  status: DeploymentStatus;
  duration: string;
  timestamp: string;
  message: string;
  author: string;
}

export interface DeploymentHistoryProps {
  className?: string;
}

const STATUS_CONFIG: Record<
  DeploymentStatus,
  {
    color: string;
    bg: string;
    label: string;
    Icon: typeof CheckCircle | typeof XCircle | typeof SpinnerGap;
  }
> = {
  success: {
    color: "var(--bl-fill-success)",
    bg: "color-mix(in srgb, var(--bl-fill-success) 14%, transparent)",
    label: "Success",
    Icon: CheckCircle,
  },
  failed: {
    color: "var(--bl-fill-danger)",
    bg: "color-mix(in srgb, var(--bl-fill-danger) 14%, transparent)",
    label: "Failed",
    Icon: XCircle,
  },
  "in-progress": {
    color: "var(--bl-fill-primary)",
    bg: "color-mix(in srgb, var(--bl-fill-primary) 14%, transparent)",
    label: "In Progress",
    Icon: SpinnerGap,
  },
};

const DEPLOYMENTS: Deployment[] = [
  {
    id: "1",
    commitHash: "a3f8c21",
    branch: "main",
    status: "success",
    duration: "2m 14s",
    timestamp: "3 min ago",
    message: "fix: resolve auth token refresh race condition",
    author: "Sarah Chen",
  },
  {
    id: "2",
    commitHash: "e7b4d09",
    branch: "feat/billing-v2",
    status: "in-progress",
    duration: "1m 42s",
    timestamp: "8 min ago",
    message: "feat: add invoice PDF generation endpoint",
    author: "Marcus Rivera",
  },
  {
    id: "3",
    commitHash: "1c9e5a3",
    branch: "main",
    status: "success",
    duration: "3m 08s",
    timestamp: "1 hr ago",
    message: "chore: bump dependencies and fix type errors",
    author: "Aisha Patel",
  },
  {
    id: "4",
    commitHash: "f42b71e",
    branch: "fix/rate-limiter",
    status: "failed",
    duration: "0m 47s",
    timestamp: "2 hr ago",
    message: "fix: increase rate limit window for webhook retries",
    author: "James Wilson",
  },
  {
    id: "5",
    commitHash: "8d0ca6f",
    branch: "main",
    status: "success",
    duration: "2m 51s",
    timestamp: "5 hr ago",
    message: "feat: add Stripe webhook signature verification",
    author: "Priya Sharma",
  },
  {
    id: "6",
    commitHash: "3b7f2e1",
    branch: "staging",
    status: "success",
    duration: "4m 03s",
    timestamp: "8 hr ago",
    message: "refactor: extract middleware into composable chain",
    author: "Yuki Tanaka",
  },
];

/**
 * DeploymentHistory -- CI/CD deployment log card.
 * Shows recent deployments with commit hash, branch, status, duration,
 * and timestamp in a compact, scannable list.
 *
 * Composes: Card, CardContent, CardHeader, CardTitle, CardDescription, Badge.
 * Icons: GitBranch, Clock, CheckCircle, XCircle, SpinnerGap (Phosphor).
 * Tokens: --bl-fill-success/danger/primary/warning, --bl-fg-*, --bl-bg-elevated, --bl-border-divider.
 */
export function DeploymentHistory({ className }: { className?: string }) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm">Deployment History</CardTitle>
          <CardDescription className="text-xs">
            Recent CI/CD pipeline runs
          </CardDescription>
        </div>
        <Badge
          variant="outline"
          className="text-[10px] px-1.5 py-0 h-5 tabular-nums"
        >
          {DEPLOYMENTS.length} deploys
        </Badge>
      </CardHeader>

      <CardContent className="px-3 pb-3">
        <div className="space-y-0" role="list" aria-label="Deployment history">
          {DEPLOYMENTS.map((deploy, i) => {
            const config = STATUS_CONFIG[deploy.status];
            const { Icon } = config;
            const isLast = i === DEPLOYMENTS.length - 1;

            return (
              <div
                key={deploy.id}
                role="listitem"
                className={cn(
                  "flex items-start gap-3 rounded-lg px-2 py-2.5 transition-colors",
                  !isLast && "border-b"
                )}
                style={{
                  borderColor: !isLast
                    ? "var(--bl-border-divider)"
                    : undefined,
                  transitionDuration: "var(--dur-instant)",
                  transitionTimingFunction: "var(--ease-out)",
                }}
              >
                {/* Status indicator */}
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full mt-0.5"
                  style={{ backgroundColor: config.bg }}
                >
                  <Icon
                    size={16}
                    weight="fill"
                    style={{ color: config.color }}
                    aria-label={config.label}
                    className={cn(
                      deploy.status === "in-progress" && "animate-spin"
                    )}
                  />
                </span>

                {/* Main content */}
                <div className="min-w-0 flex-1 space-y-1">
                  {/* Top row: commit message */}
                  <p
                    className="text-[13px] font-medium leading-snug truncate"
                    style={{ color: "var(--bl-fg-primary)" }}
                    title={deploy.message}
                  >
                    {deploy.message}
                  </p>

                  {/* Bottom row: hash, branch, metadata */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {/* Commit hash */}
                    <span
                      className="text-[11px] font-mono tabular-nums font-semibold"
                      style={{ color: "var(--bl-fg-secondary)" }}
                    >
                      {deploy.commitHash}
                    </span>

                    {/* Branch badge */}
                    <span className="flex items-center gap-1">
                      <GitBranch
                        size={12}
                        weight="bold"
                        style={{ color: "var(--bl-fg-muted)" }}
                        aria-hidden="true"
                      />
                      <span
                        className="text-[11px] font-mono truncate max-w-[120px]"
                        style={{ color: "var(--bl-fg-muted)" }}
                        title={deploy.branch}
                      >
                        {deploy.branch}
                      </span>
                    </span>

                    {/* Duration */}
                    <span className="flex items-center gap-1">
                      <Clock
                        size={12}
                        weight="bold"
                        style={{ color: "var(--bl-fg-muted)" }}
                        aria-hidden="true"
                      />
                      <span
                        className="text-[11px] tabular-nums"
                        style={{ color: "var(--bl-fg-muted)" }}
                      >
                        {deploy.duration}
                      </span>
                    </span>

                    {/* Timestamp */}
                    <span
                      className="text-[11px] tabular-nums"
                      style={{ color: "var(--bl-fg-muted)" }}
                    >
                      {deploy.timestamp}
                    </span>
                  </div>
                </div>

                {/* Status badge */}
                <Badge
                  variant="outline"
                  className="text-[10px] px-1.5 py-0 h-5 shrink-0 mt-0.5 border-0"
                  style={{
                    backgroundColor: config.bg,
                    color: config.color,
                  }}
                >
                  {config.label}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
