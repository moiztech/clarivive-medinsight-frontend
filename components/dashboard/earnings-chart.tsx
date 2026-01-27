"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const data = [
  { month: "Jan", earnings: 100 },
  { month: "Feb", earnings: 450 },
  { month: "Mar", earnings: 300 },
  { month: "Apr", earnings: 500 },
  { month: "May", earnings: 100 },
  { month: "Jun", earnings: 300 },
  { month: "Jul", earnings: 450 },
  { month: "Aug", earnings: 150 },
  { month: "Sep", earnings: 450 },
  { month: "Oct", earnings: 100 },
  { month: "Nov", earnings: 250 },
  { month: "Dec", earnings: 150 },
];

export function EarningsChart() {
  return (
    <Card className="p-6 bg-card h-full">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Earning Statistic
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">$27,200</span>
            <span className="text-xs font-medium bg-dashboard-green/10 text-dashboard-green px-2 py-0.5 rounded">
              10%
            </span>
            <span className="text-xs text-muted-foreground">
              + $1500 Per Day
            </span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          Yearly <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={40}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border))"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Bar
              dataKey="earnings"
              fill="hsl(158, 64%, 52%)" // Green color matching design
              radius={[4, 4, 0, 0]}
              background={{ fill: "hsl(158, 64%, 95%)" }} // Light background bar
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
