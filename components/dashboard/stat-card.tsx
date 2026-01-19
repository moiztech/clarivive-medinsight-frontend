import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  change: number;
  trend: "up" | "down";
  backgroundColor: string;
}

export function StatCard({
  icon,
  title,
  value,
  change,
  trend,
  backgroundColor,
}: StatCardProps) {
  return (
    <Card className="p-6 bg-card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-foreground mb-3">{value}</h3>
          <div className="flex items-center gap-1">
            {trend === "up" ? (
              <>
                <TrendingUp className="h-4 w-4 text-dashboard-green" />
                <span className="text-sm font-semibold text-dashboard-green">
                  {change > 0 ? "+" : ""}
                  {change}%
                </span>
              </>
            ) : (
              <>
                <TrendingDown className="h-4 w-4 text-red-500" />
                <span className="text-sm font-semibold text-red-500">
                  {change}%
                </span>
              </>
            )}
            <span className="text-xs text-muted-foreground ml-1">
              This Month
            </span>
          </div>
        </div>
        <div
          className={`p-3 rounded-lg ${backgroundColor} flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}
