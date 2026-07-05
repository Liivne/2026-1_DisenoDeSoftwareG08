import { useMemo, useState } from "react";
import { Box, Button, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import DashboardShell from "../components/DashboardShell";
import MetricCard from "../components/MetricCard";
import MiniBars from "../components/MiniBars";
import StatTile from "../components/StatTile";
import { dashboardsByRole } from "../config/roleDashboards";
import { sidebarConfig } from "../config/sidebarConfig";
import { roleOrder } from "@/shared/config/roles";
import { Role } from "@/shared/types/role";

function getStoredRole(): Role {
  const role = window.localStorage.getItem("vaccination.role");
  return roleOrder.includes(role as Role) ? (role as Role) : "Paciente";
}

function getStoredName(role: Role): string {
  const storedName = window.localStorage.getItem("vaccination.name");
  if (storedName) return storedName;

  switch (role) {
    case "Personal de Salud":
      return "Dra. Laura Méndez";
    case "Paciente":
      return "María Fernanda Ruiz";
    default:
      return "Dra. Valeria Gómez";
  }
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const role = useMemo(() => getStoredRole(), []);
  const userName = useMemo(() => getStoredName(role), [role]);
  const dashboard = dashboardsByRole[role];

  function handleLogout() {
    window.localStorage.removeItem("vaccination.role");
    window.localStorage.removeItem("vaccination.name");
    navigate("/login");
  }

  return (
    <DashboardShell
      title="Sistema de Gestión de Campañas de Vacunación"
      subtitle="Panel de control y estadísticas"
      role={role}
      userName={userName}
      menuItems={sidebarConfig[role]}
      activeItemLabel={sidebarConfig[role][0]?.label ?? "Inicio"}
      drawerWidth={collapsed ? 96 : 288}
      collapsed={collapsed}
      onToggleCollapsed={() => setCollapsed((value) => !value)}
      onLogout={handleLogout}
    >
      <Stack spacing={3}>
        <Paper
          variant="outlined"
          sx={{
            p: { xs: 2.5, md: 3 },
            borderRadius: 2,
            background:
              "linear-gradient(135deg, rgba(21,101,192,0.06) 0%, rgba(38,166,154,0.09) 100%)",
            boxShadow: "0 12px 34px rgba(15,23,42,0.05)",
          }}
        >
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", lg: "center" }}
            justifyContent="space-between"
          >
            <Box sx={{ maxWidth: 800 }}>
              <Chip label={`Rol activo: ${role}`} sx={{ mb: 1.5, fontWeight: 700 }} />
              <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1 }}>
                {dashboard.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {dashboard.subtitle}
              </Typography>
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              {dashboard.quickActions.slice(0, 2).map((action) => (
                <Button key={action} variant="contained" size="large">
                  {action}
                </Button>
              ))}
            </Stack>
          </Stack>
        </Paper>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              xl: "repeat(4, minmax(0, 1fr))",
            },
            gap: 2.5,
          }}
        >
          {dashboard.stats.map((stat) => (
            <StatTile key={stat.label} stat={stat} />
          ))}
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", xl: "1.6fr 1fr" }, gap: 2.5 }}>
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 2,
              p: { xs: 2, md: 3 },
              boxShadow: "0 12px 30px rgba(15,23,42,0.05)",
            }}
          >
            <Stack spacing={1.5}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {dashboard.chartTitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {dashboard.chartLegend}
                  </Typography>
                </Box>
                <Chip label="Material Design 3" variant="outlined" />
              </Stack>

              <MiniBars data={dashboard.chartData} />
            </Stack>
          </Paper>

          <Stack spacing={2.5}>
            {dashboard.secondaryCards.map((card) => (
              <MetricCard key={card.title} {...card} />
            ))}
          </Stack>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 2.5 }}>
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 2,
              p: { xs: 2, md: 3 },
              boxShadow: "0 12px 30px rgba(15,23,42,0.05)",
            }}
          >
            <Stack spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {dashboard.tableTitle}
              </Typography>

              <TableContainer>
                <Table size="small" aria-label={dashboard.tableTitle}>
                  <TableHead>
                    <TableRow>
                      {dashboard.tableHead.map((head) => (
                        <TableCell key={head} sx={{ fontWeight: 700 }}>
                          {head}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboard.tableRows.map((row, rowIndex) => (
                      <TableRow key={row.cells[0]} hover>
                        {row.cells.map((cell, cellIndex) => (
                          <TableCell key={`${rowIndex}-${cellIndex}`}>{cell}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              borderRadius: 2,
              p: { xs: 2, md: 3 },
              boxShadow: "0 12px 30px rgba(15,23,42,0.05)",
            }}
          >
            <Stack spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Alertas y acciones prioritarias
              </Typography>

              <Stack spacing={1.5}>
                {dashboard.alerts.map((alert) => (
                  <Box
                    key={alert}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "rgba(21,101,192,0.05)",
                      border: 1,
                      borderColor: "divider",
                    }}
                  >
                    <Typography variant="body2" color="text.primary">
                      {alert}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              <Stack direction="row" flexWrap="wrap" gap={1.25}>
                {dashboard.quickActions.map((action) => (
                  <Chip key={action} label={action} color="primary" variant="outlined" />
                ))}
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </DashboardShell>
  );
}
