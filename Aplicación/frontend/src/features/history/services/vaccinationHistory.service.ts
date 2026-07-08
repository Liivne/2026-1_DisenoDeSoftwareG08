import { apiFetch } from "@/app/api";
import type { VaccinationHistoryItem } from "../types/vaccinationHistory";

type ApiVaccinationRecord = {
  id: number;
  doseNumber: number;
  appliedAt: string;
  notes: string | null;
  vaccine: {
    id: number;
    name: string;
  };
  appointment: {
    id: number;
    date: string;
    status: string;
    vaccinationPoint: string;
    campaign: string;
  };
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("es-CL");
}

function mapRecordFromApi(
  record: ApiVaccinationRecord
): VaccinationHistoryItem {
  return {
    id: record.id,
    vaccine: record.vaccine.name,
    dose: `Dosis ${record.doseNumber}`,
    date: record.appliedAt.split("T")[0],
    displayDate: formatDate(record.appliedAt),
    center: record.appointment.vaccinationPoint,
    status: "Aplicada",
  };
}

export async function getMyVaccinationHistory() {
  const records = await apiFetch<ApiVaccinationRecord[]>(
    "/vaccination-records/my"
  );

  return records.map(mapRecordFromApi);
}