"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";

const data = [
  { month: "Jan", totalFee: 4000, collectedFee: 2400 },
  { month: "Feb", totalFee: 3000, collectedFee: 1398 },
  { month: "Mar", totalFee: 2000, collectedFee: 9800 },
  { month: "Apr", totalFee: 2780, collectedFee: 3908 },
  { month: "May", totalFee: 1890, collectedFee: 4800 },
  { month: "Jun", totalFee: 2390, collectedFee: 3800 },
  { month: "Jul", totalFee: 3490, collectedFee: 4300 },
  { month: "Aug", totalFee: 3000, collectedFee: 2100 },
  { month: "Sep", totalFee: 2500, collectedFee: 3500 },
  { month: "Oct", totalFee: 3200, collectedFee: 2800 },
  { month: "Nov", totalFee: 2800, collectedFee: 1900 },
  { month: "Dec", totalFee: 3100, collectedFee: 2500 },
];

export function RevenueChart() {
  return (
    <Card className="p-6 bg-card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Revenue Statistic
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          <span className="inline-flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-chart-1" />
            Total Fee: $500
          </span>
          <span className="inline-flex items-center gap-1 ml-4">
            <span className="w-3 h-3 rounded-full bg-chart-2" />
            Collected Fee: $300
          </span>
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="currentColor"
            opacity={0.1}
          />
          <XAxis dataKey="month" stroke="currentColor" opacity={0.5} />
          <YAxis stroke="currentColor" opacity={0.5} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--color-card))",
              border: "1px solid hsl(var(--color-border))",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "hsl(var(--color-foreground))" }}
          />
          <Legend />
          <Bar
            dataKey="totalFee"
            fill="var(--chart-1)"
            radius={[8, 8, 0, 0]}
            name="Total Fee"
          />
          <Bar
            dataKey="collectedFee"
            fill="var(--chart-2)"
            radius={[8, 8, 0, 0]}
            name="Collected Fee"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
