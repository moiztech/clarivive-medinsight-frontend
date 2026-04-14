type CalendarSession = {
  title: string;
  description?: string | null;
  location?: string | null;
  date: string;
  start_time: string;
  end_time: string;
};

function toUtcDate(date: string, time: string) {
  const [hours = "0", minutes = "0", seconds = "0"] = time.split(":");
  return new Date(
    Date.UTC(
      Number(date.slice(0, 4)),
      Number(date.slice(5, 7)) - 1,
      Number(date.slice(8, 10)),
      Number(hours),
      Number(minutes),
      Number(seconds),
    ),
  );
}

function toCalendarStamp(value: Date) {
  return value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export function createGoogleCalendarUrl(session: CalendarSession) {
  const start = toCalendarStamp(toUtcDate(session.date, session.start_time));
  const end = toCalendarStamp(toUtcDate(session.date, session.end_time));

  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", session.title);
  url.searchParams.set("dates", `${start}/${end}`);
  url.searchParams.set("details", session.description || "");
  url.searchParams.set("location", session.location || "");

  return url.toString();
}

export function downloadAppleCalendarFile(session: CalendarSession) {
  const start = toCalendarStamp(toUtcDate(session.date, session.start_time));
  const end = toCalendarStamp(toUtcDate(session.date, session.end_time));
  const now = toCalendarStamp(new Date());

  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Clarivive Medinsight//Course Session//EN",
    "BEGIN:VEVENT",
    `UID:${session.title}-${session.date}-${session.start_time}@clarivive-medinsight`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${session.title}`,
    `DESCRIPTION:${session.description || ""}`,
    `LOCATION:${session.location || ""}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${session.title}-${session.date}.ics`;
  link.click();
  URL.revokeObjectURL(url);
}
