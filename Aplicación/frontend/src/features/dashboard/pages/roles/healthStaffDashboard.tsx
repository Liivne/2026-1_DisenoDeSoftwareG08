import { Icon, Stack } from "@mui/material";

import DashboardHero from "../../components/DashboardHero";
import { DashboardStats } from "../../components/DashboardStats";
import DashboardChart from "../../components/DashboardChart";
import { DashboardData } from "../../types";

const dashboard: DashboardData = {
  title: "Panel del Personal de Salud",

  subtitle:
    "Monitoreo diario de pacientes, vacunaciones y agenda clínica.",

  stats: [
    {
      label: "Pacientes agendados",
      value: "48",
      delta: "+6 hoy",
      tone: "primary",
      icon: <Icon />,
    },
    {
      label: "Vacunas aplicadas",
      value: "36",
      delta: "75% completado",
      tone: "success",
      icon: <Icon />,
    },
    {
      label: "Citas pendientes",
      value: "12",
      delta: "Turno tarde",
      tone: "warning",
      icon: <Icon />,
    },
    {
      label: "Stock disponible",
      value: "320",
      delta: "Sin incidencias",
      tone: "info",
      icon: <Icon />,
    },
  ],

  chartTitle: "Vacunaciones por día",

  chartSubtitle: "Cantidad de dosis administradas durante la semana.",

  chartData: [
    { label: "Lun", value: 24, color: "#1565C0" },
    { label: "Mar", value: 32, color: "#1976D2" },
    { label: "Mié", value: 28, color: "#26A69A" },
    { label: "Jue", value: 35, color: "#42A5F5" },
    { label: "Vie", value: 31, color: "#4CAF50" },
  ],

  metrics: [
    {
      title: "Tiempo promedio",
      value: "9 min",
      delta: "-1 min",
      icon: <Icon />,
    },
    {
      title: "Cobertura diaria",
      value: "82%",
      delta: "+4%",
      icon: <Icon />,
    },
  ],

  tableTitle: "Próximos pacientes",

  tableHead: [
    "Paciente",
    "Hora",
    "Vacuna",
  ],

  tableRows: [
    {
      cells: ["María Pérez", "09:30", "Influenza"],
    },
    {
      cells: ["Juan Soto", "10:00", "COVID-19"],
    },
    {
      cells: ["Ana Rojas", "10:30", "Hepatitis B"],
    },
  ],

  alerts: [
    "3 pacientes aún no confirman su asistencia.",
    "El stock de Influenza debe revisarse antes del cierre.",
  ],
};

export default function HealthStaffDashboard() {
  return (
    <Stack spacing={3}>
      <DashboardHero
        title={dashboard.title}
        subtitle={dashboard.subtitle}
      />

      <DashboardStats
        stats={dashboard.stats}
      />

      <DashboardChart />
    </Stack>
  );
}