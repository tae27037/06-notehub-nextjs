import axios from "axios";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NOTEHUB_BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});
