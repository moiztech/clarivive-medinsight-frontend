"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "English", value: 15, label: "English 15" },
  { name: "Mathematics", value: 15, label: "Math 15" },
  { name: "Biology", value: 5, label: "Biology 5" },
  { name: "Physics", value: 10, label: "Physics 10" },
];

const COLORS = [
  "var(--color-chart-2)",
  "var(--color-chart-1)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
];

export function NewAdmissions() {
  return (
    <Card className="p-6 bg-card flex flex-col items-center">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        New Admissions
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
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
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        <Badge className="bg-chart-2 text-dashboard-green hover:bg-dashboard-green/30">
          English 15
        </Badge>
        <Badge className="bg-chart-1 text-primary hover:bg-primary/30">
          Math 15
        </Badge>
        <Badge className="bg-chart-3 text-dashboard-purple hover:bg-dashboard-purple/30">
          Biology 5
        </Badge>
        <Badge className="bg-chart-4 text-dashboard-orange hover:bg-dashboard-orange/30">
          Physics 10
        </Badge>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs font-medium text-muted-foreground">
          Total Admissions
        </p>
        <p className="text-2xl font-bold text-foreground mt-1">50</p>
      </div>
    </Card>
  );
}
