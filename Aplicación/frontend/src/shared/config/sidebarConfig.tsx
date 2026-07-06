import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import GroupIcon from "@mui/icons-material/Group";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

import type { Role } from "@/shared/types/role";
import type { MenuItem } from "../../../shared/config/menu";

export const sidebarConfig: Record<Role, MenuItem[]> = {
  Administrador: [
    { label: "Inicio", icon: DashboardIcon },
    { label: "Campañas", icon: CampaignOutlinedIcon },
    { label: "Usuarios", icon: GroupIcon },
    { label: "Vacunas", icon: VaccinesIcon },
    { label: "Inventario", icon: Inventory2OutlinedIcon },
    { label: "Reportes", icon: FactCheckOutlinedIcon },
  ],
  "Personal de Salud": [
    { label: "Inicio", icon: DashboardIcon },
    { label: "Agenda", icon: CalendarMonthIcon },
    { label: "Pacientes", icon: GroupIcon },
    { label: "Vacunación", icon: VaccinesIcon },
    { label: "Historial", icon: DescriptionOutlinedIcon },
    { label: "Inventario", icon: Inventory2OutlinedIcon },
  ],
  Paciente: [
    { label: "Inicio", icon: DashboardIcon },
    { label: "Mi esquema", icon: VerifiedOutlinedIcon },
    { label: "Próximas citas", icon: CalendarMonthIcon },
    { label: "Historial", icon: DescriptionOutlinedIcon },
    { label: "Certificado", icon: FactCheckOutlinedIcon },
  ],
};