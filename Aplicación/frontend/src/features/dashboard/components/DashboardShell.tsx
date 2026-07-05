import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

import { MenuItem as SidebarItem, Role } from "../types";

export type DashboardShellProps = {
  title: string;
  subtitle: string;
  role: string;
  userName: string;
  menuItems: SidebarItem[];
  activeItemLabel: string;
  drawerWidth: number;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onLogout: () => void;
  children: React.ReactNode;
};

export default function DashboardShell({
  title,
  subtitle,
  role,
  userName,
  menuItems,
  activeItemLabel,
  drawerWidth,
  collapsed,
  onToggleCollapsed,
  onLogout,
  children,
}: DashboardShellProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);
  const [expandedContentVisible, setExpandedContentVisible] = useState(!collapsed);

  useEffect(() => {
    if (collapsed) {
      setExpandedContentVisible(false);
    }
  }, [collapsed]);

  const showExpandedContent = !collapsed && expandedContentVisible;

  function handleDrawerTransitionEnd(event: React.TransitionEvent<HTMLDivElement>) {
    if (event.propertyName !== "width") {
      return;
    }

    if (!collapsed) {
      setExpandedContentVisible(true);
    }
  }

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "background.paper" }}>
      <Box
        sx={{
          px: 3,
          py: 2.5,
          minHeight: 72,
          transition: theme.transitions.create(["padding"], {
            duration: theme.transitions.duration.shorter,
          }),
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          justifyContent="flex-start"
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              bgcolor: "primary.main",
              color: "primary.contrastText",
              boxShadow: "0 12px 24px rgba(21,101,192,0.24)",
            }}
          >
            <VaccinesIcon />
          </Box>
          {showExpandedContent && (
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                VacunaGest
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Campañas y seguimiento
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>

      <Divider />

      <List
        sx={{
          px: 1.5,
          py: 1.5,
          flex: 1,
          transition: theme.transitions.create(["padding"], {
            duration: theme.transitions.duration.shorter,
          }),
        }}
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = item.label === activeItemLabel;

          return (
            <ListItemButton
              key={item.label}
              sx={{
                minHeight: 48,
                px: 1.5,
                justifyContent: "flex-start",
                borderRadius: 2,
                transition: theme.transitions.create(["background-color"], {
                  duration: theme.transitions.duration.shorter,
                }),
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  width: 40,
                  height: 40,
                  color: active ? "primary.main" : "text.secondary",
                  justifyContent: "center",
                  alignItems: "center",
                  flexShrink: 0,
                  mr: 0,
                }}
              >
                <Icon sx={{ fontSize: 24 }} />
              </ListItemIcon>

              {showExpandedContent && (
                <ListItemText
                  primary={item.label}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>

        <Button
          fullWidth
          variant="outlined"
          onClick={onToggleCollapsed}
          sx={{
            justifyContent: "flex-start",
            px: 3,
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            {showExpandedContent ? <KeyboardArrowLeftOutlinedIcon /> : <KeyboardArrowRightOutlinedIcon />}
          </Box>

          <Box
            sx={{
              flex: 1,
              textAlign: "left",
              opacity: showExpandedContent ? 1 : 0,
              transition: theme.transitions.create(["opacity"], {
                duration: theme.transitions.duration.shorter,
              }),
            }}
          >
            Contraer menú
          </Box>
        </Button>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F4F7FB", display: "flex" }}>
      <Box
        component="nav"
        sx={{
          width: { xs: drawerWidth, md: drawerWidth },
          flexShrink: { md: 0 },
          transition: theme.transitions.create(["width"], {
            duration: theme.transitions.duration.shorter,
          }),
        }}
      >
        <Drawer
          variant={isDesktop ? "permanent" : "temporary"}
          open={isDesktop ? true : mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: 1,
              borderColor: "divider",
              backgroundImage: "linear-gradient(180deg, #FFFFFF 0%, #F7FBFE 100%)",
              transition: theme.transitions.create("width", { duration: theme.transitions.duration.shorter }),
              overflowX: "hidden",
            },
          }}
          PaperProps={{ onTransitionEnd: handleDrawerTransitionEnd }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: (muiTheme) => muiTheme.zIndex.appBar,
            backdropFilter: "blur(14px)",
            backgroundColor: "rgba(244,247,251,0.88)",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Toolbar sx={{ px: { xs: 2, md: 3 }, minHeight: 72, gap: 2 }}>
            <IconButton
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { xs: "inline-flex", md: "none" } }}
              aria-label="Abrir navegación"
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: { xs: "none", sm: "block" } }}>
                {subtitle}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <Badge color="error" variant="dot" overlap="circular">
                <IconButton aria-label="Notificaciones" sx={{ bgcolor: "white", border: 1, borderColor: "divider" }}>
                  <NotificationsNoneIcon />
                </IconButton>
              </Badge>

              <Button
                onClick={(event) => setProfileMenuAnchor(event.currentTarget)}
                sx={{
                  p: 0.5,
                  border: 1,
                  borderColor: "divider",
                  bgcolor: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  pl: 0.5,
                  pr: 1.5
                }}
              >
                <Avatar sx={{ bgcolor: "primary.main", width: 38, height: 38}}>
                  {userName.charAt(0).toUpperCase()}
                </Avatar>

                <Box sx={{
                  display: { xs: "none", sm: "flex"},
                  flexDirection: "column",
                  alignItems: "flex-start"
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.1}}>
                  {userName}
                </Typography>

                <Chip
                  size="small"
                  label={role}
                  sx={{ height: 20, mt: 0.25}}
                />
              </Box>
              </Button>
            </Stack>
          </Toolbar>
        </Box>

        <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1600, mx: "auto" }}>{children}</Box>
      </Box>

      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={() => setProfileMenuAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => setProfileMenuAnchor(null)}>Perfil</MenuItem>
        <MenuItem onClick={() => setProfileMenuAnchor(null)}>Configuración</MenuItem>
        <Divider/>
        <MenuItem
          onClick={() => {
            setProfileMenuAnchor(null);
            onLogout();
          }}
          sx={{ color: "error.main"}}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error"/>
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </Box>
  );
}