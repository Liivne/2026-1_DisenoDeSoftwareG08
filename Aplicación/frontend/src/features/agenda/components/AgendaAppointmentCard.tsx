import {
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import type { Appointment } from "@/features/appointments/types/appointment";

interface AgendaAppointmentCardProps {
  appointment: Appointment;
  onConfirm: (appointment: Appointment) => void;
  onStart: (appointment: Appointment) => void;
  onComplete: (appointment: Appointment) => void;
  onNoShow: (appointment: Appointment) => void;
}

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

export default function AgendaAppointmentCard({
  appointment,
  onConfirm,
  onStart,
  onComplete,
  onNoShow,
}: AgendaAppointmentCardProps) {
  const disabledFinal =
    appointment.status === "COMPLETADA" ||
    appointment.status === "CANCELADA" ||
    appointment.status === "AUSENTE";

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack spacing={2}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Stack spacing={0.5}>
            <Typography variant="h6" fontWeight={700}>
              {appointment.vaccine}
            </Typography>

            <Typography color="text.secondary">
              {appointment.campaign}
            </Typography>

            <Typography color="text.secondary">
              {appointment.vaccinationPoint} — {appointment.address}
            </Typography>

            <Typography>
              {formatDate(appointment.date)} · {formatTime(appointment.date)}
            </Typography>
          </Stack>

          <Chip label={getStatusLabel(appointment.status)} />
        </Stack>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Button
            variant="outlined"
            disabled={appointment.status !== "PENDIENTE"}
            onClick={() => onConfirm(appointment)}
          >
            Confirmar
          </Button>

          <Button
            variant="outlined"
            disabled={appointment.status !== "CONFIRMADA"}
            onClick={() => onStart(appointment)}
          >
            Iniciar
          </Button>

          <Button
            variant="contained"
            disabled={appointment.status !== "EN_PROCESO"}
            onClick={() => onComplete(appointment)}
          >
            Completar
          </Button>

          <Button
            variant="outlined"
            color="error"
            disabled={disabledFinal}
            onClick={() => onNoShow(appointment)}
          >
            Ausente
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}