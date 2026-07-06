import { Icon, Stack } from "@mui/material";

import DashboardHero from "../../components/DashboardHero";
import { DashboardStats } from "../../components/DashboardStats";
import DashboardChart from "../../components/DashboardChart";
import { DashboardData } from "../../types";

const dashboard: DashboardData = {
  title: "Mi Panel de Vacunación",

  subtitle:
    "Consulta tu historial, próximas vacunas y estado de tu esquema.",

  stats: [
    {
      label: "Vacunas recibidas",
      value: "8",
      delta: "Esquema actualizado",
      tone: "success",
      icon: <Icon />,
    },
    {
      label: "Próxima cita",
      value: "12 Ago",
      delta: "09:30 hrs",
      tone: "primary",
      icon: <Icon />,
    },
    {
      label: "Certificados",
      value: "3",
      delta: "Disponibles",
      tone: "info",
      icon: <Icon />,
    },
    {
      label: "Pendientes",
      value: "1",
      delta: "Refuerzo Influenza",
      tone: "warning",
      icon: <Icon />,
    },
  ],

  chartTitle: "Historial de vacunación",

  chartSubtitle:
    "Cantidad de vacunas recibidas por año.",

  chartData: [
    { label: "2021", value: 1, color: "#90CAF9" },
    { label: "2022", value: 2, color: "#64B5F6" },
    { label: "2023", value: 2, color: "#42A5F5" },
    { label: "2024", value: 1, color: "#1E88E5" },
    { label: "2025", value: 2, color: "#1565C0" },
  ],

  metrics: [
    {
      title: "Cobertura personal",
      value: "95%",
      delta: "Completa",
      icon: <Icon />,
    },
    {
      title: "Última vacuna",
      value: "COVID-19",
      delta: "Hace 3 meses",
      icon: <Icon />,
    },
  ],

  tableTitle: "Historial reciente",

  tableHead: [
    "Vacuna",
    "Fecha",
    "Centro",
  ],

  tableRows: [
    {
      cells: ["COVID-19", "12/05/2025", "CESFAM Norte"],
    },
    {
      cells: ["Influenza", "20/03/2025", "Hospital Regional"],
    },
    {
      cells: ["Hepatitis B", "08/11/2024", "CESFAM Central"],
    },
  ],

  alerts: [
    "Tienes un refuerzo de Influenza programado para este mes.",
    "Recuerda descargar tu certificado actualizado.",
  ],
};

export default function PatientDashboard() {
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