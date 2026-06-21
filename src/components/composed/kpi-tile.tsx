import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export interface KpiTileProps {
  label: string;
  value: string;
  target: string;
  progress: number;
}

/**
 * KpiTile — metric with a target and progress toward it.
 * Composes: Card, Badge, Progress.
 */
export function KpiTile({ label, value, target, progress }: KpiTileProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardDescription className="text-xs">{label}</CardDescription>
          <Badge variant="secondary" className="text-[10px]">
            Target: {target}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-heading font-bold mb-2">{value}</p>
        <Progress value={progress} className="h-1.5" />
      </CardContent>
    </Card>
  );
}
