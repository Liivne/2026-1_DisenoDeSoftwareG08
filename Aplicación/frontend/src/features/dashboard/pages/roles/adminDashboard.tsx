import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import {
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";

import DashboardHero from "../../components/DashboardHero";
import DashboardMetrics from "../../components/DashboardMetrics";
import { getDashboardSummary, type DashboardSummary } from "../../services/dashboard.service";
import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { mapApiRoleToFrontendRole } from "@/shared/utils/roleMapper";
import { formatRut } from "@/shared/utils/rut";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
      } finally {
        setLoading(false);
      }
    }

    loadSummary();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (!summary) {
    return (
      <Typography color="error">
        No fue posible cargar el resumen del dashboard.
      </Typography>
    );
  }

  const metrics = [
    {
      title: "Usuarios registrados",
      value: summary.users,
      icon: <GroupsOutlinedIcon />,
      color: "#1565C0",
    },
    {
      title: "Campañas activas",
      value: summary.activeCampaigns,
      icon: <CampaignOutlinedIcon />,
      color: "#2E7D32",
    },
    {
      title: "Centros vacunatorios",
      value: summary.vaccinationPoints,
      icon: <LocalHospitalOutlinedIcon />,
      color: "#EF6C00",
    },
    {
      title: "Vacunas disponibles",
      value: summary.vaccines,
      icon: <VaccinesOutlinedIcon />,
      color: "#6A1B9A",
    },
  ];

  const stats = [
    {
      title: "Campañas totales",
      value: summary.campaigns,
    },
    {
      title: "Citas registradas",
      value: summary.appointments,
    },
    {
      title: "Citas completadas",
      value: summary.completedAppointments,
    },
    {
      title: "Registros de vacunación",
      value: summary.vaccinationRecords,
    },
  ];

  return (
    <Stack spacing={3}>
      <DashboardHero
        title="Panel Administrativo"
        subtitle="Resumen general del sistema de vacunación"
        badge="Administrador"
        avatar={<AdminPanelSettingsOutlinedIcon sx={{ fontSize: 40 }} />}
        details={
          user
            ? [
                { label: "Nombre", value: user.name },
                { label: "Correo", value: user.email },
                { label: "RUT", value: formatRut(user.rut) },
                { label: "Rol", value: mapApiRoleToFrontendRole(user.role) },
              ]
            : []
        }
      />

      <DashboardMetrics metrics={metrics} />
    </Stack>
  );
}