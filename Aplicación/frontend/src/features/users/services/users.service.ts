import { apiFetch } from "@/app/api";
import type { User } from "../types/user";

export function getUsers() {
  return apiFetch<User[]>("/users");
}