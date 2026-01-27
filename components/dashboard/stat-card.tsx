import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { ReactNode } from "react";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, Area, AreaChart } from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  change: number;
  trend: "up" | "down";
  backgroundColor: string;
  chartData?: any[];
  chartType?: "bar" | "line";
}
const defaultChartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
];

export function StatCard({
  icon,
  title,
  value,
  change,
  trend,
  backgroundColor,
  chartData = defaultChartData,
  chartType = "bar",
  chartColor = "#2563eb",
}: StatCardProps & { chartColor?: string }) {
  const dynamicChartConfig = {
    desktop: {
      label: "Desktop",
      color: chartColor,
    },
  } satisfies ChartConfig;

  return (
    <Card className="p-6 bg-card shadow-blue-200 gap-2! dark:shadow-blue-900/20 overflow-hidden relative hover:shadow-lg transition-shadow">
      <div
        className={`absolute inset-0 bg-${backgroundColor} opacity-10`}
      ></div>
      <div className="flex items-center justify-start gap-6 mb-2">
        <div
          className={`p-2 rounded-full bg-${backgroundColor} flex items-center justify-center`}
        >
          {icon}
        </div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          {title}
        </p>
      </div>
      <div>
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
          <span className="text-xs text-muted-foreground ml-1">This Month</span>
        </div>
      </div>
      {chartType === "bar" ? (
        <ChartContainer
          config={dynamicChartConfig}
          className="min-h-[120px] w-full"
        >
          <BarChart accessibilityLayer data={chartData}>
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      ) : (
        <ChartContainer
          config={dynamicChartConfig}
          className="min-h-[120px] w-full"
        >
          <AreaChart accessibilityLayer data={chartData}>
            <Area
              dataKey="desktop"
              stroke="var(--color-desktop)"
              fill="var(--color-desktop)"
              radius={4}
            />
          </AreaChart>
        </ChartContainer>
      )}
    </Card>
  );
}
