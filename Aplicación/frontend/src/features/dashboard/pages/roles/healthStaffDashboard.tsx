import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import {
  Box,
  Button,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import DashboardAlerts from "../../components/DashboardAlerts";
import DashboardChart from "../../components/DashboardChart";
import DashboardHero from "../../components/DashboardHero";
import DashboardMetrics from "../../components/DashboardMetrics";
import DashboardStats from "../../components/DashboardStats";
import DashboardTable from "../../components/DashboardTable";
import MiniBar from "../../components/MiniBars";

const metrics = [
  {
    title: "Pacientes agendados",
    value: 48,
    icon: <EventAvailableOutlinedIcon />,
    color: "#1565C0",
  },
  {
    title: "Vacunas aplicadas",
    value: 36,
    icon: <VaccinesOutlinedIcon />,
    color: "#2E7D32",
  },
  {
    title: "Citas pendientes",
    value: 12,
    icon: <AccessTimeOutlinedIcon />,
    color: "#EF6C00",
  },
  {
    title: "Stock disponible",
    value: 320,
    icon: <Inventory2OutlinedIcon />,
    color: "#6A1B9A",
  },
];

const stats = [
  {
    title: "Tiempo promedio",
    value: "9 min",
  },
  {
    title: "Cobertura diaria",
    value: "82%",
  },
  {
    title: "Turno actual",
    value: "Mañana",
  },
  {
    title: "Atenciones restantes",
    value: 12,
  },
];

const patients = [
  {
    name: "María Pérez",
    time: "09:30",
    vaccine: "Influenza",
    status: "Confirmada",
  },
  {
    name: "Juan Soto",
    time: "10:00",
    vaccine: "COVID-19",
    status: "Pendiente",
  },
  {
    name: "Ana Rojas",
    time: "10:30",
    vaccine: "Hepatitis B",
    status: "Confirmada",
  },
];

const alerts = [
  {
    id: 1,
    title: "Pacientes sin confirmar",
    description: "3 pacientes aún no confirman su asistencia.",
    status: "Revisar",
  },
  {
    id: 2,
    title: "Revisión de stock",
    description: "El stock de Influenza debe revisarse antes del cierre.",
    status: "Pendiente",
  },
  {
    id: 3,
    title: "Turno tarde",
    description: "Hay 12 citas pendientes para el segundo bloque.",
  },
];

export default function HealthStaffDashboard() {
  return (
    <Stack spacing={3}>
      <DashboardHero
        title="Panel del Personal de Salud"
        subtitle="Monitoreo diario de pacientes, vacunaciones y agenda clínica"
        badge="Personal de Salud"
        avatar={<LocalHospitalOutlinedIcon sx={{ fontSize: 40 }} />}
      />

      <DashboardMetrics metrics={metrics} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <DashboardTable
            title="Próximos pacientes"
            subtitle="Pacientes agendados para la jornada actual"
            actions={
              <Button
                variant="contained"
                startIcon={<PersonSearchOutlinedIcon />}
              >
                Buscar paciente
              </Button>
            }
          >
            <Stack spacing={2}>
              {patients.map((patient) => (
                <Box
                  key={`${patient.name}-${patient.time}`}
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                    spacing={2}
                    justifyContent="space-between"
                    alignItems={{
                      xs: "flex-start",
                      sm: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {patient.name}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {patient.vaccine}
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Chip label={patient.time} variant="outlined" />

                      <Chip
                        label={patient.status}
                        color={
                          patient.status === "Confirmada"
                            ? "success"
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
          <DashboardAlerts
            title="Pendientes del día"
            alerts={alerts}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <DashboardChart
            title="Vacunaciones por día"
            subtitle="Cantidad de dosis administradas durante la semana"
          >
            <Stack spacing={2}>
              <MiniBar label="Lunes" value={24} max={40} color="primary" />
              <MiniBar label="Martes" value={32} max={40} color="primary" />
              <MiniBar label="Miércoles" value={28} max={40} color="info" />
              <MiniBar label="Jueves" value={35} max={40} color="success" />
              <MiniBar label="Viernes" value={31} max={40} color="success" />
            </Stack>
          </DashboardChart>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <DashboardTable
            title="Avance de jornada"
            subtitle="Estado operativo del día"
          >
            <Stack spacing={2}>
              <MiniBar
                label="Citas completadas"
                value={36}
                max={48}
                color="success"
              />

              <MiniBar
                label="Pacientes pendientes"
                value={12}
                max={48}
                color="warning"
              />

              <MiniBar
                label="Stock utilizado"
                value={180}
                max={500}
                color="primary"
              />
            </Stack>
          </DashboardTable>
        </Grid>
      </Grid>

      <DashboardStats stats={stats} />
    </Stack>
  );
}