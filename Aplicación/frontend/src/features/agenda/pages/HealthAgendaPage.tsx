import { useEffect, useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useSnackbar } from "@/shared/context/SnackbarContext";
import type { Appointment } from "@/features/appointments/types/appointment";

import AgendaAppointmentCard from "../components/AgendaAppointmentCard";
import {
  completeAppointment,
  confirmAppointment,
  getAppointments,
  markNoShowAppointment,
  startAppointment,
} from "../services/agenda.service";

export default function HealthAgendaPage() {
  const { showSuccess, showError } = useSnackbar();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAppointments() {
    try {
      setLoading(true);
      setError("");

      const data = await getAppointments();

      setAppointments(data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No fue posible cargar la agenda.";

      setError(message);
      showError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  const filteredAppointments = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return appointments;
    }

    return appointments.filter(
      (appointment) =>
        appointment.vaccine.toLowerCase().includes(value) ||
        appointment.campaign.toLowerCase().includes(value) ||
        appointment.vaccinationPoint.toLowerCase().includes(value)
    );
  }, [appointments, search]);

  function updateAppointment(updated: Appointment) {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === updated.id ? updated : appointment
      )
    );
  }

  async function handleConfirm(appointment: Appointment) {
    try {
      const updated = await confirmAppointment(appointment.id);

      updateAppointment(updated);
      showSuccess("Cita confirmada correctamente.");
    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : "No fue posible confirmar la cita."
      );
    }
  }

  async function handleStart(appointment: Appointment) {
    try {
      const updated = await startAppointment(appointment.id);

      updateAppointment(updated);
      showSuccess("Atención iniciada correctamente.");
    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : "No fue posible iniciar la atención."
      );
    }
  }

  async function handleComplete(appointment: Appointment) {
    try {
      const updated = await completeAppointment(appointment.id);

      updateAppointment(updated);
      showSuccess("Vacunación registrada correctamente.");
    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : "No fue posible completar la vacunación."
      );
    }
  }

  async function handleNoShow(appointment: Appointment) {
    try {
      const updated = await markNoShowAppointment(appointment.id);

      updateAppointment(updated);
      showSuccess("Paciente marcado como ausente.");
    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : "No fue posible marcar la cita como ausente."
      );
    }
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        Agenda de vacunación
      </Typography>

      <TextField
        size="small"
        placeholder="Buscar por vacuna, campaña o centro..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        sx={{ width: 360, mb: 3 }}
      />

      {loading && <CircularProgress />}

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && filteredAppointments.length === 0 && (
        <Typography color="text.secondary">
          No hay citas en la agenda.
        </Typography>
      )}

      {!loading && !error && (
        <Stack spacing={2}>
          {filteredAppointments.map((appointment) => (
            <AgendaAppointmentCard
              key={appointment.id}
              appointment={appointment}
              onConfirm={handleConfirm}
              onStart={handleStart}
              onComplete={handleComplete}
              onNoShow={handleNoShow}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}