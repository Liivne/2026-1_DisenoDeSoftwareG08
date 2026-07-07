import { useState } from "react";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import { Appointment } from "../types/appointment";
import { initialAppointments } from "../data/mockAppointments";

import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import CancelAppointmentDialog from "../components/CancelAppointmentDialog";

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const handleOpenCancelDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseCancelDialog = () => {
    setSelectedAppointment(null);
  };

  const handleConfirmCancel = () => {
    if (!selectedAppointment) return;

    setAppointments((currentAppointments) =>
      currentAppointments.map((appointment) =>
        appointment.id === selectedAppointment.id
          ? {
              ...appointment,
              status: "Cancelada",
            }
          : appointment
      )
    );

    setSelectedAppointment(null);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>
        Mis citas
      </Typography>

      <Stack spacing={2}>
        {appointments.map((appointment) => {
          const isCancelled = appointment.status === "Cancelada";
          const isCompleted = appointment.status === "Completada";

          return (
            <Paper
              key={appointment.id}
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                opacity: isCancelled ? 0.65 : 1,
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
                      {appointment.location}
                    </Typography>

                    <Stack direction="row" spacing={1.5} mt={1.5} flexWrap="wrap">
                      <Chip
                        icon={<CalendarMonthOutlinedIcon />}
                        label={appointment.date}
                        variant="outlined"
                      />

                      <Chip
                        icon={<EventAvailableOutlinedIcon />}
                        label={appointment.time}
                        variant="outlined"
                      />

                      <Chip
                        label={appointment.status}
                        color={
                          appointment.status === "Cancelada"
                            ? "error"
                            : appointment.status === "Confirmada"
                              ? "success"
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
                  disabled={isCancelled || isCompleted}
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
          );
        })}
      </Stack>

      <CancelAppointmentDialog
        open={Boolean(selectedAppointment)}
        appointmentName={selectedAppointment?.vaccine}
        appointmentDate={
          selectedAppointment
            ? `${selectedAppointment.date} a las ${selectedAppointment.time}`
            : undefined
        }
        onClose={handleCloseCancelDialog}
        onConfirm={handleConfirmCancel}
      />
    </Stack>
  );
}