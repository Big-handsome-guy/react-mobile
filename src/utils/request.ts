import axios from "axios";
import { ID, BASE, KEY } from "../config";

const instance = axios.create({
  baseURL: `${BASE}/1.1`,
  headers: {
    "X-LC-Id": ID,
    "X-LC-Key": KEY,
    "Content-Type": "application/json",
  },
});

export default instance;
