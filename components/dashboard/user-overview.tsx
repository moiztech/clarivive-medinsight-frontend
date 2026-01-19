"use client";

import { Card } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Student", value: 60 },
  { name: "Teacher", value: 30 },
  { name: "Staffs", value: 10 },
];

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"];

export function UserOverview() {
  return (
    <Card className="p-6 bg-card flex flex-col items-center">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        User Overview
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "var(--color-foreground)" }}
          />
          <Legend
            iconType="circle"
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{
              marginBottom: "-40px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-6 grid grid-cols-3 gap-4 w-full">
        <div className="text-center">
          <p className="text-xs font-medium text-muted-foreground">Student</p>
          <p className="text-lg font-bold text-foreground mt-1">750</p>
        </div>
        <div className="text-center border-x border-border">
          <p className="text-xs font-medium text-muted-foreground">Teacher</p>
          <p className="text-lg font-bold text-foreground mt-1">56</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-medium text-muted-foreground">Staffs</p>
          <p className="text-lg font-bold text-foreground mt-1">15</p>
        </div>
      </div>
    </Card>
  );
}
