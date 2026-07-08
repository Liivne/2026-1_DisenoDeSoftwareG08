import { apiFetch } from "@/app/api";
import type { Vaccine } from "../types/vaccine";

export type CreateVaccinePayload = {
  name: string;
  laboratory?: string;
  description?: string;
  stock?: number;
};

export function getVaccines() {
  return apiFetch<Vaccine[]>("/vaccines");
}

export function createVaccine(data: CreateVaccinePayload) {
  return apiFetch<Vaccine>("/vaccines", {
    method: "POST",
    body: JSON.stringify(data),
  });
}