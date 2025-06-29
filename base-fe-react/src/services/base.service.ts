import axios from "axios";
import { ResponseEntity } from "../entities/response.entity";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage?.getItem("token") || ""}`,
  },
  timeout: 10000,
});

export class BaseService {
  // GET request
  public static async getList<T>(url: string): Promise<ResponseEntity<T>> {
    return (await api.get<ResponseEntity<T>>(apiUrl + url)).data;
  }

  // POST request
  public static async post<T>(
    url: string,
    data: T
  ): Promise<ResponseEntity<T>> {
    return (await api.post<ResponseEntity<T>>(apiUrl + url, data)).data;
  }
}
