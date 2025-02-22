const dev = process.env.NODE_ENV === "development";

export const baseURL = dev
  ? "http://localhost:3000"
  : "https://openui.vercel.app";
