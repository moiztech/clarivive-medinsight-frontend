import { Card } from "@/components/ui/card";

export function AttendanceChart() {
  const attendanceData = [
    { label: "Present", percentage: 87, color: "bg-chart-1" },
    { label: "Absent", percentage: 40, color: "bg-chart-2" },
    { label: "Late", percentage: 20, color: "bg-chart-3" },
    { label: "Half day", percentage: 20, color: "bg-chart-4" },
  ];

  return (
    <Card className="p-6 bg-card">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Student Attendance
      </h3>
      <div className="space-y-4">
        {attendanceData.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                {item.label}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {item.percentage}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className={`h-3 rounded-full ${item.color}`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
