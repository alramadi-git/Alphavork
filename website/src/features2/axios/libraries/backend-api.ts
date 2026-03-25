import axios from "axios";

const backendApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  headers: {
    Accept: "application/json",
  },
  validateStatus: () => true,
});

export { backendApi };
