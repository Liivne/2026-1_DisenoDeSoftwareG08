import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import GroupIcon from "@mui/icons-material/Group";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

import { RoleDashboard } from "../../types";

export const adminDashboard: RoleDashboard = {
  title: "Vista general del sistema",
  subtitle: "Monitoreo central de campañas, usuarios, vacunaciones y stock operativo.",
  stats: [
    { label: "Campañas activas", value: "12", delta: "+3 esta semana", tone: "primary", icon: <CampaignOutlinedIcon /> },
    { label: "Usuarios registrados", value: "4.286", delta: "+126 nuevos", tone: "success", icon: <GroupIcon /> },
    { label: "Vacunaciones hoy", value: "842", delta: "98% completadas", tone: "info", icon: <VaccinesIcon /> },
    { label: "Stock crítico", value: "6 lotes", delta: "Requiere reposición", tone: "warning", icon: <Inventory2OutlinedIcon /> },
  ],
  alerts: [
    "2 campañas alcanzaron el 80% de cobertura y necesitan seguimiento.",
    "6 lotes de vacunas presentan inventario por debajo del umbral mínimo.",
    "Se detectaron 14 usuarios sin completar perfil clínico.",
  ],
  quickActions: ["Crear campaña", "Gestionar usuarios", "Ajustar stock", "Exportar reportes"],
  chartTitle: "Tendencia de vacunaciones por semana",
  chartLegend: "Promedio diario de dosis aplicadas",
  chartData: [
    { label: "Lun", value: 56, color: "#1565C0" },
    { label: "Mar", value: 72, color: "#1976D2" },
    { label: "Mié", value: 64, color: "#26A69A" },
    { label: "Jue", value: 84, color: "#0D47A1" },
    { label: "Vie", value: 90, color: "#4CAF50" },
    { label: "Sáb", value: 78, color: "#42A5F5" },
  ],
  tableTitle: "Alertas y seguimiento operativo",
  tableHead: ["Elemento", "Estado", "Responsable"],
  tableRows: [
    { cells: ["Campaña Influenza Norte", "En progreso", "Coordinación"] },
    { cells: ["Vacuna BCG lote 24A", "Reposición pendiente", "Inventario"] },
    { cells: ["Usuarios sin validación", "Pendiente", "Administración"] },
  ],
  secondaryCards: [
    { title: "Cobertura general", value: "78.4%", helper: "Meta mensual: 85%", icon: <TrendingUpOutlinedIcon /> },
    { title: "Centros activos", value: "24", helper: "18 urbanos, 6 rurales", icon: <LocalHospitalOutlinedIcon /> },
    { title: "Eventos críticos", value: "3", helper: "Sin interrupciones mayores", icon: <ShieldOutlinedIcon /> },
  ],
};