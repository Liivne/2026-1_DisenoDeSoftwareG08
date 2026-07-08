import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import GroupIcon from "@mui/icons-material/Group";
import VaccinesIcon from "@mui/icons-material/Vaccines";

import type { Role } from "@/shared/types/role";
import type { MenuItem } from "./menu";

export const sidebarConfig: Record<Role, MenuItem[]> = {
  Administrador: [
    { label: "Inicio", icon: DashboardIcon, path: "/dashboard" },
    { label: "Campañas", icon: CampaignOutlinedIcon, path: "/campaigns" },
    { label: "Usuarios", icon: GroupIcon, path: "/users" },
    { label: "Vacunas", icon: VaccinesIcon, path: "/vaccines" },
  ],
  "Personal de Salud": [
    { label: "Inicio", icon: DashboardIcon, path: "/dashboard" },
    { label: "Agenda", icon: CalendarMonthIcon, path: "/agenda" },
    { label: "Historial", icon: DescriptionOutlinedIcon, path: "/history" },
  ],
  Paciente: [
    { label: "Mi estado", icon: DashboardIcon, path: "/dashboard" },
    { label: "Mis citas", icon: CalendarMonthIcon, path: "/appointments" },
    { label: "Historial", icon: DescriptionOutlinedIcon, path: "/history" }
  ],
};