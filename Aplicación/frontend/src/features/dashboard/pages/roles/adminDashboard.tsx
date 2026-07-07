import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
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
    title: "Usuarios registrados",
    value: "1.234",
    icon: <GroupsOutlinedIcon />,
    color: "#1565C0",
  },
  {
    title: "Campañas activas",
    value: 8,
    icon: <CampaignOutlinedIcon />,
    color: "#2E7D32",
  },
  {
    title: "Centros vacunatorios",
    value: 14,
    icon: <LocalHospitalOutlinedIcon />,
    color: "#EF6C00",
  },
  {
    title: "Vacunas disponibles",
    value: "24.500",
    icon: <VaccinesOutlinedIcon />,
    color: "#6A1B9A",
  },
];

const stats = [
  {
    title: "Cobertura general",
    value: "87%",
  },
  {
    title: "Stock crítico",
    value: "2 vacunas",
  },
  {
    title: "Citas pendientes",
    value: 126,
  },
  {
    title: "Funcionarios activos",
    value: 42,
  },
];

const campaigns = [
  {
    name: "Influenza 2026",
    status: "Activa",
    coverage: 72,
    target: "Adultos mayores y grupos de riesgo",
  },
  {
    name: "COVID-19 Refuerzo",
    status: "Activa",
    coverage: 58,
    target: "Mayores de 18 años",
  },
  {
    name: "Hepatitis B",
    status: "Planificada",
    coverage: 18,
    target: "Personal de salud",
  },
];

const alerts = [
  {
    id: 1,
    title: "Stock bajo de vacuna Hepatitis B",
    description: "Quedan menos de 150 dosis disponibles.",
    status: "Crítico",
  },
  {
    id: 2,
    title: "Nueva campaña pendiente de revisión",
    description: "Campaña escolar 2026 requiere aprobación.",
    status: "Pendiente",
  },
  {
    id: 3,
    title: "Aumento de citas para Influenza",
    description: "La demanda subió un 18% esta semana.",
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <Stack spacing={3}>
      <DashboardHero
        title="Panel Administrativo"
        subtitle="Resumen general del sistema de vacunación"
        badge="Administrador"
        avatar={<AdminPanelSettingsOutlinedIcon sx={{ fontSize: 40 }} />}
      />

      <DashboardMetrics metrics={metrics} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <DashboardTable
            title="Campañas principales"
            subtitle="Seguimiento de campañas activas y planificadas"
            actions={
              <Button variant="contained" startIcon={<CampaignOutlinedIcon />} onClick={() => navigate("/campaigns/new")}>
                Nueva campaña
              </Button>
            }
          >
            <Stack spacing={2}>
              {campaigns.map((campaign) => (
                <Box
                  key={campaign.name}
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
                          {campaign.name}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          {campaign.target}
                        </Typography>
                      </Box>

                      <Chip
                        label={campaign.status}
                        color={
                          campaign.status === "Activa"
                            ? "success"
                            : "warning"
                        }
                        size="small"
                      />
                    </Stack>

                    <MiniBar
                      label="Cobertura"
                      value={campaign.coverage}
                      max={100}
                      color={
                        campaign.coverage >= 70
                          ? "success"
                          : "primary"
                      }
                    />
                  </Stack>
                </Box>
              ))}
            </Stack>
          </DashboardTable>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <DashboardTable
            title="Acciones rápidas"
            subtitle="Gestión frecuente del sistema"
          >
            <Stack spacing={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<PersonAddAltOutlinedIcon />}
              >
                Registrar usuario
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<Inventory2OutlinedIcon />}
              >
                Revisar inventario
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<LocalHospitalOutlinedIcon />}
              >
                Gestionar centros
              </Button>
            </Stack>
          </DashboardTable>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <DashboardChart
            title="Resumen mensual"
            subtitle="Vacunas administradas durante el último periodo"
          >
            <Stack spacing={2}>
              <MiniBar
                label="Enero"
                value={820}
                max={1000}
                color="primary"
              />

              <MiniBar
                label="Febrero"
                value={690}
                max={1000}
                color="primary"
              />

              <MiniBar
                label="Marzo"
                value={940}
                max={1000}
                color="success"
              />

              <MiniBar
                label="Abril"
                value={760}
                max={1000}
                color="primary"
              />
            </Stack>
          </DashboardChart>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <DashboardAlerts
            title="Alertas administrativas"
            alerts={alerts}
          />
        </Grid>
      </Grid>

      <DashboardStats stats={stats} />
    </Stack>
  );
}