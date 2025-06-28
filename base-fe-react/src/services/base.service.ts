import axios from "axios";
import { ResponseEntity } from "../entities/response.entity";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage?.getItem("token") || ""}`,
  },
  timeout: 10000,
});

export class BaseService {
  public apiUrl = process.env.REACT_APP_API_URL;

  // GET request
  public static async getList<T>(url: string): Promise<ResponseEntity<T>> {
    return (await api.get<ResponseEntity<T>>(url)).data;
  }

  // POST request
  public static async post<T>(
    url: string,
    data: T
  ): Promise<ResponseEntity<T>> {
    return (await api.post<ResponseEntity<T>>(url, data)).data;
  }
}
