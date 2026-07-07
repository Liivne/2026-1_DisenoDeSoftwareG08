import { useMemo, useState } from "react";

import {
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import VaccinationHistoryFilters from "../components/VaccinationHistoryFilters";
import VaccinationHistoryList from "../components/VaccinationHistoryList";
import type {
  VaccinationHistoryFilters as Filters,
  VaccinationHistoryItem,
} from "../types/vaccinationHistory";

const vaccinationHistory: VaccinationHistoryItem[] = [
  {
    id: 1,
    vaccine: "COVID-19",
    dose: "Refuerzo",
    date: "2025-05-12",
    displayDate: "12/05/2025",
    center: "CESFAM Norte",
    status: "Aplicada",
  },
  {
    id: 2,
    vaccine: "Influenza",
    dose: "Dosis anual",
    date: "2025-03-20",
    displayDate: "20/03/2025",
    center: "Hospital Regional",
    status: "Aplicada",
  },
  {
    id: 3,
    vaccine: "Hepatitis B",
    dose: "Segunda dosis",
    date: "2024-11-08",
    displayDate: "08/11/2024",
    center: "CESFAM Central",
    status: "Aplicada",
  },
  {
    id: 4,
    vaccine: "VPH",
    dose: "Primera dosis",
    date: "2024-08-15",
    displayDate: "15/08/2024",
    center: "Hospital San Borja Arriarán",
    status: "Aplicada",
  },
];

const initialFilters: Filters = {
  vaccine: "",
  center: "",
  dateFrom: "",
  dateTo: "",
};

export default function VaccinationHistoryPage() {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const filteredHistory = useMemo(() => {
    return vaccinationHistory.filter((item) => {
      const matchesVaccine = filters.vaccine
        ? item.vaccine === filters.vaccine
        : true;

      const matchesCenter = filters.center
        ? item.center === filters.center
        : true;

      const matchesDateFrom = filters.dateFrom
        ? item.date >= filters.dateFrom
        : true;

      const matchesDateTo = filters.dateTo
        ? item.date <= filters.dateTo
        : true;

      return (
        matchesVaccine &&
        matchesCenter &&
        matchesDateFrom &&
        matchesDateTo
      );
    });
  }, [filters]);

  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          background: "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)",
          color: "white",
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h4" fontWeight={700}>
            Historial de vacunación
          </Typography>

          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Consulta tus vacunas aplicadas y filtra por vacuna, rango de fechas
            o centro de vacunación.
          </Typography>
        </Stack>
      </Paper>

      <VaccinationHistoryFilters
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters(initialFilters)}
      />

      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={700}>
          Vacunas registradas
        </Typography>

        <VaccinationHistoryList items={filteredHistory} />
      </Stack>
    </Stack>
  );
}