import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
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
import { useNavigate } from "react-router-dom";

const metrics = [
  {
    title: "Vacunas recibidas",
    value: 8,
    icon: <VaccinesOutlinedIcon />,
    color: "#2E7D32",
  },
  {
    title: "Próxima cita",
    value: "12 Ago",
    icon: <EventAvailableOutlinedIcon />,
    color: "#1565C0",
  },
  {
    title: "Certificados",
    value: 3,
    icon: <DownloadOutlinedIcon />,
    color: "#0288D1",
  },
  {
    title: "Pendientes",
    value: 1,
    icon: <CalendarMonthOutlinedIcon />,
    color: "#EF6C00",
  },
];

const stats = [
  {
    title: "Cobertura personal",
    value: "95%",
  },
  {
    title: "Última vacuna",
    value: "COVID-19",
  },
  {
    title: "Centro frecuente",
    value: "CESFAM Norte",
  },
  {
    title: "Estado",
    value: "Al día",
  },
];

const appointments = [
  {
    vaccine: "Influenza Refuerzo",
    date: "12 Agosto 2026",
    time: "09:30 hrs",
    place: "CESFAM Norte",
    status: "Confirmada",
  },
];

const history = [
  {
    vaccine: "COVID-19",
    date: "12/05/2025",
    place: "CESFAM Norte",
  },
  {
    vaccine: "Influenza",
    date: "20/03/2025",
    place: "Hospital Regional",
  },
  {
    vaccine: "Hepatitis B",
    date: "08/11/2024",
    place: "CESFAM Central",
  },
];

const alerts = [
  {
    id: 1,
    title: "Refuerzo pendiente",
    description: "Tienes un refuerzo de Influenza programado para este mes.",
    status: "Importante",
  },
  {
    id: 2,
    title: "Certificado actualizado",
    description: "Ya puedes descargar tu certificado de vacunación.",
    status: "Disponible",
  },
];

export default function PatientDashboard() {
  const navigate = useNavigate();
  return (
    <Stack spacing={3}>
      <DashboardHero
        title="Mi Panel de Vacunación"
        subtitle="Consulta tu historial, próximas vacunas y estado de tu esquema"
        badge="Paciente"
        avatar={<PersonOutlineIcon sx={{ fontSize: 40 }} />}
      />

      <DashboardMetrics metrics={metrics} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <DashboardTable
            title="Próximas citas"
            subtitle="Vacunas y refuerzos programados"
            actions={
              <Button variant="contained" startIcon={<EventAvailableOutlinedIcon />} onClick={() => navigate("/appointments/new")}>
                Agendar cita
              </Button>
            }
          >
            <Stack spacing={2}>
              {appointments.map((appointment) => (
                <Box
                  key={`${appointment.vaccine}-${appointment.date}`}
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
                          {appointment.place}
                        </Typography>
                      </Box>

                      <Chip
                        label={appointment.status}
                        color="success"
                        size="small"
                      />
                    </Stack>

                    <Stack direction="row" spacing={1.5} flexWrap="wrap">
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
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </DashboardTable>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <DashboardAlerts
            title="Recordatorios"
            alerts={alerts}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <DashboardChart
            title="Historial de vacunación"
            subtitle="Cantidad de vacunas recibidas por año"
          >
            <Stack spacing={2}>
              <MiniBar label="2021" value={1} max={3} color="primary" />
              <MiniBar label="2022" value={2} max={3} color="primary" />
              <MiniBar label="2023" value={2} max={3} color="primary" />
              <MiniBar label="2024" value={1} max={3} color="primary" />
              <MiniBar label="2025" value={2} max={3} color="success" />
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
                label="Esquema completo"
                value={95}
                max={100}
                color="success"
              />

              <MiniBar
                label="Vacunas recibidas"
                value={8}
                max={10}
                color="primary"
              />

              <MiniBar
                label="Pendientes"
                value={1}
                max={4}
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
          {history.map((item) => (
            <Box
              key={`${item.vaccine}-${item.date}`}
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
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <CheckCircleOutlineIcon color="success" />

                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {item.vaccine}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {item.place}
                    </Typography>
                  </Box>
                </Stack>

                <Chip
                  label={item.date}
                  variant="outlined"
                />
              </Stack>
            </Box>
          ))}
        </Stack>
      </DashboardTable>

      <DashboardStats stats={stats} />
    </Stack>
  );
}