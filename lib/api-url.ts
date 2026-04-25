const rawApiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "";

export const apiBaseUrl = rawApiBaseUrl.replace(/\/+$/, "");

export function withApiPrefix(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/api/") || path === "/api") return path;
  if (path.startsWith("/")) return `/api${path}`;
  return `/api/${path}`;
}

export function buildApiUrl(path: string): string {
  return `${apiBaseUrl}${withApiPrefix(path)}`;
}
