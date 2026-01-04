type Service = {
    title: string;
    icon: React.ComponentType<any>;
}
type EventType = {
  id: number
  department: string
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"
  start: string
  end: string
  doctor: string
}

export type { Service, EventType };