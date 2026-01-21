# Axios & Authentication Setup Guide

## 📁 File Structure

```
lib/axios/
├── index.ts          ← Main export file (use this!)
├── client.ts         ← Browser axios instance
├── server.ts         ← Server-side axios instance
└── authedClient.ts   ← Interceptors for auto-auth & token refresh
```

## 🎯 How to Use

### **In Client Components (Browser)**

```typescript
import { clientApi } from "@/lib/axios";

// ✅ Access token is automatically attached!
const response = await clientApi.get("/protected-route");
const data = await clientApi.post("/user/profile", { name: "John" });
```

### **In Server Components & API Routes**

```typescript
import { serverApi } from "@/lib/axios";

// Server-to-server calls (no cookies/tokens)
const response = await serverApi.get("/external-api");
```

## 🔐 How Authentication Works

### **1. Login Flow**

```typescript
import { useAuth } from "@/app/_contexts/AuthProvider";

const { login } = useAuth();
await login("user@example.com", "password");

// What happens behind the scenes:
// ├─> Calls /api/auth/login
// ├─> Backend returns access_token + refresh_token
// ├─> access_token → saved to localStorage
// └─> refresh_token → saved as httpOnly cookie
```

### **2. Automatic Token Attachment**

Every request made with `clientApi` automatically:

```typescript
// lib/axios/authedClient.ts (Request Interceptor)
clientApi.interceptors.request.use((config) => {
  const token = tokenStore.get(); // ← From localStorage
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

### **3. Automatic Token Refresh on 401**

When your access token expires:

```typescript
// What happens automatically:
// 1. API returns 401 (unauthorized)
// 2. Interceptor catches the error
// 3. Calls /api/auth/refresh (uses refresh_token cookie)
// 4. Gets new access_token
// 5. Saves to localStorage
// 6. Retries original failed request
// 7. ✅ Success!
```

### **4. Concurrent Request Queuing**

If multiple requests fail at the same time:

```typescript
// Smart queue system prevents multiple refresh calls:
// Request A fails (401) → Starts refresh
// Request B fails (401) → Waits in queue
// Request C fails (401) → Waits in queue
// Refresh completes → All queued requests retry with new token
```

## 🛠️ Token Storage

### **Access Token** (Short-lived)

- **Location:** `localStorage` (key: `access_token`)
- **Used for:** API authentication headers
- **Managed by:** `lib/auth/tokenStore.ts`

### **Refresh Token** (Long-lived)

- **Location:** `httpOnly` cookie (key: `refresh_token`)
- **Used for:** Getting new access tokens
- **Managed by:** Server-side API routes

## 📝 Example Usage

### **Protected API Call**

```typescript
"use client";
import { clientApi } from "@/lib/axios";

async function fetchProfile() {
  try {
    // Token is added automatically!
    const res = await clientApi.get("/user/profile");
    console.log(res.data);
  } catch (error) {
    // If token refresh fails, user is logged out
    console.error("Failed to fetch profile", error);
  }
}
```

### **Logout**

```typescript
import { useAuth } from "@/app/_contexts/AuthProvider";

const { logout } = useAuth();
await logout();

// What happens:
// ├─> Clears access_token from localStorage
// ├─> Clears user from state
// ├─> Calls /api/auth/logout
// └─> Server clears refresh_token cookie
```

## 🚨 Important Notes

1. **Always import from `@/lib/axios`** (not from individual files)
2. The interceptors are automatically registered when you import `clientApi`
3. Use `clientApi` for browser requests, `serverApi` for server-to-server
4. Token refresh happens silently in the background
5. If refresh fails, tokens are cleared and user is logged out

## 🔄 Token Refresh Flow Diagram

```
User makes API call
    │
    ├─> Request with Bearer token
    │       │
    │       ├─> ✅ Success (200)
    │       │
    │       └─> ❌ 401 Unauthorized
    │           │
    │           ├─> Call /api/auth/refresh
    │           │       │
    │           │       ├─> Success
    │           │       │   ├─> Save new access_token
    │           │       │   └─> Retry original request
    │           │       │
    │           │       └─> Failed
    │           │           ├─> Clear all tokens
    │           │           └─> User logged out
```

## 🎨 Customization

### **Adding Custom Headers**

```typescript
import { clientApi } from "@/lib/axios";

// One-time custom header
const res = await clientApi.get("/data", {
  headers: { "X-Custom-Header": "value" },
});

// Global header
clientApi.defaults.headers.common["X-App-Version"] = "1.0.0";
```

### **Changing Token Refresh Endpoint**

Edit `lib/axios/authedClient.ts` line 42:

```typescript
const refreshRes = await clientApi.post("/auth/refresh");
```

---

**Created:** 2026-01-21  
**Last Updated:** 2026-01-21
