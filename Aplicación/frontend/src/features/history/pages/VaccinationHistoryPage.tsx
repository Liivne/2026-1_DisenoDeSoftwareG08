import { useEffect, useMemo, useState } from "react";

import {
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import VaccinationHistoryFilters from "../components/VaccinationHistoryFilters";
import VaccinationHistoryList from "../components/VaccinationHistoryList";
import { getMyVaccinationHistory } from "../services/vaccinationHistory.service";
import type {
  VaccinationHistoryFilters as Filters,
  VaccinationHistoryItem,
} from "../types/vaccinationHistory";

const initialFilters: Filters = {
  vaccine: "",
  center: "",
  dateFrom: "",
  dateTo: "",
};

export default function VaccinationHistoryPage() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [history, setHistory] = useState<VaccinationHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHistory() {
      try {
        setLoading(true);
        setError("");

        const data = await getMyVaccinationHistory();

        setHistory(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "No fue posible cargar el historial."
        );
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
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
  }, [filters, history]);

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

      {loading && <CircularProgress />}

      {error && (
        <Typography color="error">
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={700}>
            Vacunas registradas
          </Typography>

          <VaccinationHistoryList items={filteredHistory} />
        </Stack>
      )}
    </Stack>
  );
}