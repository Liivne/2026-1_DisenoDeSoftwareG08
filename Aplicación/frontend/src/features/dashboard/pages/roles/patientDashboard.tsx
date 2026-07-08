import { useEffect, useMemo, useState } from "react";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import type { Appointment } from "@/features/appointments/types/appointment";
import { getMyAppointments } from "@/features/appointments/services/appointments.service";
import { getMyVaccinationHistory } from "@/features/history/services/vaccinationHistory.service";
import type { VaccinationHistoryItem } from "@/features/history/types/vaccinationHistory";

import DashboardAlerts from "../../components/DashboardAlerts";
import DashboardChart from "../../components/DashboardChart";
import DashboardHero from "../../components/DashboardHero";
import DashboardMetrics from "../../components/DashboardMetrics";
import DashboardTable from "../../components/DashboardTable";
import MiniBar from "../../components/MiniBars";
import { useAuth } from "@/features/auth/context/AuthContext";
import { mapApiRoleToFrontendRole } from "@/shared/utils/roleMapper";

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

export default function PatientDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [history, setHistory] = useState<VaccinationHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [appointmentsData, historyData] = await Promise.all([
          getMyAppointments(),
          getMyVaccinationHistory(),
        ]);

        setAppointments(appointmentsData);
        setHistory(historyData);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const pendingAppointments = useMemo(
    () =>
      appointments.filter((appointment) =>
        ["PENDIENTE", "CONFIRMADA", "EN_PROCESO"].includes(
          appointment.status
        )
      ),
    [appointments]
  );

  if (loading) {
    return <CircularProgress />;
  }

  const nextAppointment = pendingAppointments[0];

  const metrics = [
    {
      title: "Vacunas recibidas",
      value: history.length,
      icon: <VaccinesOutlinedIcon />,
      color: "#2E7D32",
    },
    {
      title: "Próxima cita",
      value: nextAppointment ? formatDate(nextAppointment.date) : "Sin cita",
      icon: <EventAvailableOutlinedIcon />,
      color: "#1565C0",
    },
    {
      title: "Historial",
      value: history.length,
      icon: <DescriptionOutlinedIcon />,
      color: "#0288D1",
    },
    {
      title: "Pendientes",
      value: pendingAppointments.length,
      icon: <CalendarMonthOutlinedIcon />,
      color: "#EF6C00",
    },
  ];

  const stats = [
    {
      title: "Vacunas recibidas",
      value: history.length,
    },
    {
      title: "Última vacuna",
      value: history[0]?.vaccine ?? "Sin registros",
    },
    {
      title: "Centro frecuente",
      value: history[0]?.center ?? "Sin registros",
    },
    {
      title: "Estado",
      value: pendingAppointments.length > 0 ? "Con pendientes" : "Al día",
    },
  ];

  const alerts = [
    {
      id: 1,
      title: pendingAppointments.length > 0 ? "Cita pendiente" : "Sin pendientes",
      description:
        pendingAppointments.length > 0
          ? "Tienes citas pendientes o confirmadas."
          : "No tienes citas pendientes actualmente.",
      status: pendingAppointments.length > 0 ? "Importante" : "Al día",
    },
    {
      id: 2,
      title: "Historial actualizado",
      description: `Tienes ${history.length} registros de vacunación.`,
      status: "Disponible",
    },
  ];

  return (
    <Stack spacing={3}>
      <DashboardHero
        title="Mi Panel de Vacunación"
        subtitle="Consulta tu historial, próximas vacunas y estado de tu esquema"
        badge="Paciente"
        avatar={<PersonOutlineIcon sx={{ fontSize: 40 }} />}
        details={
          user
            ? [
                { label: "Nombre", value: user.name },
                { label: "Correo", value: user.email },
                { label: "RUT", value: user.rut },
                { label: "Rol", value: mapApiRoleToFrontendRole(user.role) },
              ]
            : []
        }
      />

      <DashboardMetrics metrics={metrics} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <DashboardTable
            title="Próximas citas"
            subtitle="Vacunas y refuerzos programados"
            actions={
              <Button
                variant="contained"
                startIcon={<EventAvailableOutlinedIcon />}
                onClick={() => navigate("/appointments/new")}
              >
                Agendar cita
              </Button>
            }
          >
            <Stack spacing={2}>
              {pendingAppointments.length === 0 && (
                <Typography color="text.secondary">
                  No tienes citas próximas.
                </Typography>
              )}

              {pendingAppointments.slice(0, 3).map((appointment) => (
                <Box
                  key={appointment.id}
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Stack spacing={2}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography variant="subtitle1" fontWeight={700}>
                          {appointment.vaccine}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          {appointment.vaccinationPoint}
                        </Typography>
                      </Box>

                      <Chip
                        label={getStatusLabel(appointment.status)}
                        color={
                          appointment.status === "CONFIRMADA"
                            ? "success"
                            : appointment.status === "EN_PROCESO"
                              ? "info"
                              : "warning"
                        }
                        size="small"
                      />
                    </Stack>

                    <Stack direction="row" spacing={1.5} flexWrap="wrap">
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
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </DashboardTable>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <DashboardAlerts title="Recordatorios" alerts={alerts} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <DashboardChart
            title="Historial de vacunación"
            subtitle="Cantidad de vacunas registradas"
          >
            <Stack spacing={2}>
              <MiniBar
                label="Vacunas recibidas"
                value={history.length}
                max={Math.max(history.length, 1)}
                color="success"
              />

              <MiniBar
                label="Citas pendientes"
                value={pendingAppointments.length}
                max={Math.max(appointments.length, 1)}
                color="warning"
              />

              <MiniBar
                label="Citas totales"
                value={appointments.length}
                max={Math.max(appointments.length, 1)}
                color="primary"
              />
            </Stack>
          </DashboardChart>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <DashboardTable
            title="Esquema personal"
            subtitle="Avance del esquema de vacunación"
          >
            <Stack spacing={2}>
              <MiniBar
                label="Vacunas recibidas"
                value={history.length}
                max={Math.max(history.length, 1)}
                color="success"
              />

              <MiniBar
                label="Citas pendientes"
                value={pendingAppointments.length}
                max={Math.max(appointments.length, 1)}
                color="warning"
              />
            </Stack>
          </DashboardTable>
        </Grid>
      </Grid>

      <DashboardTable
        title="Historial reciente"
        subtitle="Últimas vacunas registradas"
      >
        <Stack spacing={2}>
          {history.length === 0 && (
            <Typography color="text.secondary">
              No tienes vacunas registradas.
            </Typography>
          )}

          {history.slice(0, 3).map((item) => (
            <Box
              key={item.id}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <CheckCircleOutlineIcon color="success" />

                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {item.vaccine}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {item.center}
                    </Typography>
                  </Box>
                </Stack>

                <Chip label={item.displayDate} variant="outlined" />
              </Stack>
            </Box>
          ))}
        </Stack>
      </DashboardTable>
    </Stack>
  );
}