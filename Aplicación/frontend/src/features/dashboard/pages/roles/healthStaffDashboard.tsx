import { useEffect, useMemo, useState } from "react";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
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

import type { Appointment } from "@/features/appointments/types/appointment";
import { getAppointments } from "@/features/agenda/services/agenda.service";

import DashboardAlerts from "../../components/DashboardAlerts";
import DashboardChart from "../../components/DashboardChart";
import DashboardHero from "../../components/DashboardHero";
import DashboardMetrics from "../../components/DashboardMetrics";
import DashboardTable from "../../components/DashboardTable";
import MiniBar from "../../components/MiniBars";
import {
  getDashboardSummary,
  type DashboardSummary,
} from "../../services/dashboard.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import { mapApiRoleToFrontendRole } from "@/shared/utils/roleMapper";

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

export default function HealthStaffDashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [summaryData, appointmentsData] = await Promise.all([
          getDashboardSummary(),
          getAppointments(),
        ]);

        setSummary(summaryData);
        setAppointments(appointmentsData);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const activeAppointments = useMemo(
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

  if (!summary) {
    return (
      <Typography color="error">
        No fue posible cargar el dashboard.
      </Typography>
    );
  }

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "PENDIENTE"
  ).length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "COMPLETADA"
  ).length;

  const metrics = [
    {
      title: "Pacientes agendados",
      value: appointments.length,
      icon: <EventAvailableOutlinedIcon />,
      color: "#1565C0",
    },
    {
      title: "Vacunas aplicadas",
      value: summary.vaccinationRecords,
      icon: <VaccinesOutlinedIcon />,
      color: "#2E7D32",
    },
    {
      title: "Citas pendientes",
      value: pendingAppointments,
      icon: <AccessTimeOutlinedIcon />,
      color: "#EF6C00",
    },
    {
      title: "Centros vacunatorios",
      value: summary.vaccinationPoints,
      icon: <Inventory2OutlinedIcon />,
      color: "#6A1B9A",
    },
  ];

  const stats = [
    {
      title: "Citas completadas",
      value: completedAppointments,
    },
    {
      title: "Citas activas",
      value: activeAppointments.length,
    },
    {
      title: "Campañas activas",
      value: summary.activeCampaigns,
    },
    {
      title: "Registros generados",
      value: summary.vaccinationRecords,
    },
  ];

  const patients = activeAppointments.slice(0, 3);

  const alerts = [
    {
      id: 1,
      title: "Citas pendientes",
      description: `${pendingAppointments} citas aún requieren confirmación.`,
      status: "Revisar",
    },
    {
      id: 2,
      title: "Vacunaciones registradas",
      description: `${summary.vaccinationRecords} registros de vacunación creados.`,
      status: "Actualizado",
    },
    {
      id: 3,
      title: "Agenda activa",
      description: `${activeAppointments.length} citas activas en el sistema.`,
    },
  ];

  return (
    <Stack spacing={3}>
      <DashboardHero
        title="Panel del Personal de Salud"
        subtitle="Monitoreo diario de pacientes, vacunaciones y agenda clínica"
        badge="Personal de Salud"
        avatar={<LocalHospitalOutlinedIcon sx={{ fontSize: 40 }} />}
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
            title="Próximos pacientes"
            subtitle="Pacientes agendados para la jornada"
            actions={
              <Button
                variant="contained"
                startIcon={<EventAvailableOutlinedIcon />}
                onClick={() => navigate("/agenda")}
              >
                Ver agenda
              </Button>
            }
          >
            <Stack spacing={2}>
              {patients.length === 0 && (
                <Typography color="text.secondary">
                  No hay pacientes pendientes.
                </Typography>
              )}

              {patients.map((appointment) => (
                <Box
                  key={appointment.id}
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
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {appointment.campaign}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {appointment.vaccine}
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Chip
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
                              : "warning"
                        }
                        size="small"
                      />
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </DashboardTable>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <DashboardAlerts title="Pendientes del día" alerts={alerts} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <DashboardChart
            title="Estado de citas"
            subtitle="Resumen operativo de la agenda"
          >
            <Stack spacing={2}>
              <MiniBar
                label="Pendientes"
                value={pendingAppointments}
                max={Math.max(appointments.length, 1)}
                color="warning"
              />

              <MiniBar
                label="Completadas"
                value={completedAppointments}
                max={Math.max(appointments.length, 1)}
                color="success"
              />

              <MiniBar
                label="Activas"
                value={activeAppointments.length}
                max={Math.max(appointments.length, 1)}
                color="primary"
              />
            </Stack>
          </DashboardChart>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <DashboardTable
            title="Avance de jornada"
            subtitle="Estado operativo del sistema"
          >
            <Stack spacing={2}>
              <MiniBar
                label="Citas completadas"
                value={completedAppointments}
                max={Math.max(appointments.length, 1)}
                color="success"
              />

              <MiniBar
                label="Citas pendientes"
                value={pendingAppointments}
                max={Math.max(appointments.length, 1)}
                color="warning"
              />

              <MiniBar
                label="Vacunaciones registradas"
                value={summary.vaccinationRecords}
                max={Math.max(summary.appointments, 1)}
                color="primary"
              />
            </Stack>
          </DashboardTable>
        </Grid>
      </Grid>
    </Stack>
  );
}