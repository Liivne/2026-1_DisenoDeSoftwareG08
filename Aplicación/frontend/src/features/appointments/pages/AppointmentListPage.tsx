import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useSnackbar } from "@/shared/context/SnackbarContext";

import CancelAppointmentDialog from "../components/CancelAppointmentDialog";
import type { Appointment } from "../types/appointment";
import {
  cancelAppointment,
  getMyAppointments,
} from "../services/appointments.service";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("es-CL");
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusLabel(status: Appointment["status"]) {
  switch (status) {
    case "PENDIENTE":
      return "Pendiente";
    case "CONFIRMADA":
      return "Confirmada";
    case "EN_PROCESO":
      return "En proceso";
    case "COMPLETADA":
      return "Completada";
    case "CANCELADA":
      return "Cancelada";
    case "AUSENTE":
      return "Ausente";
  }
}

export default function AppointmentListPage() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useSnackbar();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAppointments() {
    try {
      setLoading(true);
      setError("");

      const data = await getMyAppointments();

      setAppointments(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No fue posible cargar tus citas."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  const visibleAppointments = useMemo(
    () =>
      appointments.filter((appointment) =>
        ["PENDIENTE", "CONFIRMADA", "EN_PROCESO"].includes(
          appointment.status
        )
      ),
    [appointments]
  );

  const handleOpenCancelDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseCancelDialog = () => {
    setSelectedAppointment(null);
  };

  const handleConfirmCancel = async () => {
    if (!selectedAppointment) return;

    try {
      await cancelAppointment(selectedAppointment.id);

      setAppointments((current) =>
        current.filter(
          (appointment) =>
            appointment.id !== selectedAppointment.id
        )
      );

      showSuccess("Cita cancelada correctamente.");
      setSelectedAppointment(null);
    } catch {
      showError("No fue posible cancelar la cita.");
    }
  };

  return (
    <Stack spacing={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" fontWeight={700}>
          Mis citas
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/appointments/new")}
        >
          Agendar cita
        </Button>
      </Stack>

      {loading && <CircularProgress />}

      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && visibleAppointments.length === 0 && (
        <Typography color="text.secondary">
          No tienes citas pendientes o confirmadas.
        </Typography>
      )}

      {!loading && !error && (
        <Stack spacing={2}>
          {visibleAppointments.map((appointment) => (
            <Paper
              key={appointment.id}
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                spacing={2}
              >
                <Stack direction="row" spacing={2}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 3,
                      bgcolor: "rgba(21, 101, 192, 0.12)",
                      color: "#1565C0",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <VaccinesOutlinedIcon />
                  </Box>

                  <Box>
                    <Typography variant="h6" fontWeight={700}>
                      {appointment.vaccine}
                    </Typography>

                    <Typography color="text.secondary">
                      {appointment.vaccinationPoint} — {appointment.address}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1.5}
                      mt={1.5}
                      flexWrap="wrap"
                    >
                      <Chip
                        icon={<CalendarMonthOutlinedIcon />}
                        label={formatDate(appointment.date)}
                        variant="outlined"
                      />

                      <Chip
                        icon={<EventAvailableOutlinedIcon />}
                        label={formatTime(appointment.date)}
                        variant="outlined"
                      />

                      <Chip
                        label={getStatusLabel(appointment.status)}
                        color={
                          appointment.status === "CONFIRMADA"
                            ? "success"
                            : appointment.status === "EN_PROCESO"
                              ? "info"
                              : "primary"
                        }
                        size="small"
                      />
                    </Stack>
                  </Box>
                </Stack>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleOpenCancelDialog(appointment)}
                  sx={{
                    alignSelf: {
                      xs: "flex-start",
                      md: "center",
                    },
                  }}
                >
                  Cancelar cita
                </Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}

      <CancelAppointmentDialog
        open={Boolean(selectedAppointment)}
        appointmentName={selectedAppointment?.vaccine}
        appointmentDate={
          selectedAppointment
            ? `${formatDate(selectedAppointment.date)} a las ${formatTime(
                selectedAppointment.date
              )}`
            : undefined
        }
        onClose={handleCloseCancelDialog}
        onConfirm={handleConfirmCancel}
      />
    </Stack>
  );
}