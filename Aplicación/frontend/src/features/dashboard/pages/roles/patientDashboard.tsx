import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

import { RoleDashboard } from "../../types";

export const patientDashboard: RoleDashboard = {
  title: "Tu esquema de vacunación",
  subtitle: "Resumen personal con próximas citas, historial clínico y certificado disponible.",
  stats: [
    { label: "Próxima vacuna", value: "12 Ago", delta: "Refuerzo de influenza", tone: "primary", icon: <VaccinesIcon /> },
    { label: "Esquema completado", value: "84%", delta: "5 de 6 dosis al día", tone: "success", icon: <VerifiedOutlinedIcon /> },
    { label: "Citas próximas", value: "2", delta: "Una confirmada", tone: "info", icon: <CalendarMonthIcon /> },
    { label: "Certificado", value: "Disponible", delta: "Descarga en PDF", tone: "warning", icon: <FactCheckOutlinedIcon /> },
  ],
  alerts: [
    "Tu cita del 12 de agosto está pendiente de confirmación.",
    "Revisa la actualización de tu esquema antes del próximo control.",
    "El certificado ya se puede descargar desde tu perfil.",
  ],
  quickActions: ["Ver certificado", "Revisar historial", "Confirmar cita", "Actualizar datos"],
  chartTitle: "Avance del esquema de vacunación",
  chartLegend: "Cobertura acumulada por dosis",
  chartData: [
    { label: "D1", value: 100, color: "#1565C0" },
    { label: "D2", value: 92, color: "#26A69A" },
    { label: "D3", value: 84, color: "#42A5F5" },
    { label: "D4", value: 64, color: "#0D47A1" },
    { label: "D5", value: 48, color: "#4CAF50" },
  ],
  tableTitle: "Historial reciente",
  tableHead: ["Vacuna", "Fecha", "Estado"],
  tableRows: [
    { cells: ["Influenza", "12/06/2026", "Aplicada"] },
    { cells: ["COVID-19 refuerzo", "10/03/2026", "Aplicada"] },
    { cells: ["Tétanos", "04/01/2026", "Pendiente de refuerzo"] },
  ],
  secondaryCards: [
    { title: "Dosis aplicadas", value: "5", helper: "De un total de 6 recomendadas", icon: <VaccinesIcon /> },
    { title: "Citas confirmadas", value: "1", helper: "Una cita pendiente", icon: <CalendarMonthIcon /> },
    { title: "Certificado", value: "Listo", helper: "Acceso directo al documento", icon: <VerifiedOutlinedIcon /> },
  ],
};