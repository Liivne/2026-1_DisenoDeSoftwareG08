import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

import { RoleDashboard } from "../../types";

export const healthStaffDashboard: RoleDashboard = {
  title: "Agenda y atención del día",
  subtitle: "Flujo clínico enfocado en pacientes programados, vacunación y consulta rápida de historial.",
  stats: [
    { label: "Pacientes programados", value: "38", delta: "12 en espera", tone: "primary", icon: <CalendarMonthIcon /> },
    { label: "Vacunaciones realizadas", value: "27", delta: "+5 desde las 8:00", tone: "success", icon: <VaccinesIcon /> },
    { label: "Consulta de historiales", value: "16", delta: "Documentación completa", tone: "info", icon: <MedicalInformationOutlinedIcon /> },
    { label: "Stock disponible", value: "214 dosis", delta: "Cobertura para 2 jornadas", tone: "warning", icon: <Inventory2OutlinedIcon /> },
  ],
  alerts: [
    "4 pacientes requieren validación de consentimiento antes de vacunarse.",
    "El lote de refuerzo pediátrico debe reponerse al final de la jornada.",
    "Hay 2 citas con hora de ingreso vencida.",
  ],
  quickActions: ["Registrar vacunación", "Consultar historial", "Validar consentimiento", "Ver agenda"],
  chartTitle: "Distribución de atención hoy",
  chartLegend: "Pacientes atendidos por bloque horario",
  chartData: [
    { label: "08h", value: 24, color: "#1565C0" },
    { label: "10h", value: 31, color: "#26A69A" },
    { label: "12h", value: 18, color: "#42A5F5" },
    { label: "14h", value: 36, color: "#0D47A1" },
    { label: "16h", value: 29, color: "#4CAF50" },
  ],
  tableTitle: "Pacientes programados",
  tableHead: ["Paciente", "Hora", "Acción"],
  tableRows: [
    { cells: ["María Pérez", "09:00", "Vacunar"] },
    { cells: ["Luis Andrade", "10:15", "Revisar historial"] },
    { cells: ["Ana López", "11:30", "Validar esquema"] },
  ],
  secondaryCards: [
    { title: "Tasa de atención", value: "71%", helper: "Pacientes atendidos a tiempo", icon: <AccessTimeOutlinedIcon /> },
    { title: "Vacunación segura", value: "100%", helper: "Sin incidencias reportadas", icon: <VerifiedOutlinedIcon /> },
    { title: "Historiales listos", value: "16", helper: "Documentos actualizados", icon: <MedicalInformationOutlinedIcon /> },
  ],
};