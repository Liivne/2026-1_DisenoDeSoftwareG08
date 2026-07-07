import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import GroupIcon from "@mui/icons-material/Group";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import VaccinesIcon from "@mui/icons-material/Vaccines";

import type { Role } from "@/shared/types/role";
import type { MenuItem } from "./menu";

export const sidebarConfig: Record<Role, MenuItem[]> = {
  Administrador: [
    { label: "Inicio", icon: DashboardIcon, path: "/dashboard" },
    { label: "Campañas", icon: CampaignOutlinedIcon, path: "/campaigns" },
    { label: "Usuarios", icon: GroupIcon, path: "/users" },
    { label: "Vacunas", icon: VaccinesIcon, path: "/vaccines" },
    { label: "Inventario", icon: Inventory2OutlinedIcon, path: "/inventory" },
    { label: "Reportes", icon: FactCheckOutlinedIcon, path: "/reports" },
  ],
  "Personal de Salud": [
    { label: "Inicio", icon: DashboardIcon, path: "/dashboard" },
    { label: "Agenda", icon: CalendarMonthIcon, path: "/agenda" },
    { label: "Pacientes", icon: GroupIcon, path: "/patients" },
    { label: "Vacunación", icon: VaccinesIcon, path: "/vaccination" },
    { label: "Historial", icon: DescriptionOutlinedIcon, path: "/history" },
    { label: "Inventario", icon: Inventory2OutlinedIcon, path: "/inventory" },
  ],
  Paciente: [
    { label: "Mi estado", icon: DashboardIcon, path: "/dashboard" },
    { label: "Mis citas", icon: CalendarMonthIcon, path: "/appointments" },
    { label: "Historial", icon: DescriptionOutlinedIcon, path: "/history" }
  ],
};