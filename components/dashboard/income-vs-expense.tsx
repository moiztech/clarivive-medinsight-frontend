"use client";

import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Feb", income: 4000, expense: 2400 },
  { month: "Mar", income: 3000, expense: 1398 },
  { month: "Apr", income: 2000, expense: 9800 },
  { month: "May", income: 2780, expense: 3908 },
  { month: "Jun", income: 1890, expense: 4800 },
  { month: "Jul", income: 2390, expense: 3800 },
  { month: "Aug", income: 2490, expense: 3200 },
  { month: "Sep", income: 2000, expense: 1800 },
];

export function IncomeVsExpense() {
  return (
    <Card className="p-6 bg-card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Income Vs Expense
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          <span className="inline-flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-dashboard-green" />
            Income: $500
          </span>
          <span className="inline-flex items-center gap-1 ml-4">
            <span className="w-3 h-3 rounded-full bg-dashboard-orange" />
            Expense: $300
          </span>
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="currentColor"
            opacity={0.1}
          />
          <XAxis dataKey="month" stroke="currentColor" opacity={0.5} />
          <YAxis stroke="currentColor" opacity={0.5} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "var(--color-foreground)" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke="var(--color-chart-2)"
            name="Income"
            strokeWidth={2}
            dot={{ fill: "var(--color-chart-2)", r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="var(--color-chart-4)"
            name="Expense"
            strokeWidth={2}
            dot={{ fill: "var(--color-chart-4)", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
