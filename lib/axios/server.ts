import axios from "axios";

export const serverApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
  headers: {
    Accept: "application/json",
  },
  timeout: 20000,
});
