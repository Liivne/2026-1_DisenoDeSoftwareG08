import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonBase,
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
  Paper,
  Stack,
  Toolbar,
  Typography,
  useTheme,
  Tooltip,
} from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LockIcon from "@mui/icons-material/Lock";

import { useLocation, useNavigate } from "react-router-dom";

import type { MenuItem as SidebarItem } from "../../config/menu";

export interface AppShellProps {
  role: string;
  userName: string;
  menuItems: SidebarItem[];
  drawerWidth: number;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export default function AppShell({
  role,
  userName,
  menuItems,
  drawerWidth,
  collapsed,
  onToggleCollapsed,
  onLogout,
  children,
}: AppShellProps) {
  const theme = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const unreadNotifications = 3;

  const [profileMenuAnchor, setProfileMenuAnchor] =
    useState<null | HTMLElement>(null);

  const [expandedContentVisible, setExpandedContentVisible] =
    useState(!collapsed);

  useEffect(() => {
    if (collapsed) {
      setExpandedContentVisible(false);
    }
  }, [collapsed]);

  const showExpandedContent =
    !collapsed && expandedContentVisible;

  function handleDrawerTransitionEnd(
    event: React.TransitionEvent<HTMLDivElement>
  ) {
    if (event.propertyName !== "width") return;

    if (!collapsed) {
      setExpandedContentVisible(true);
    }
  }

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2.5,
          minHeight: 72,
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
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
            }}
          >
            <VaccinesIcon />
          </Box>

          {showExpandedContent && (
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={800}
              >
                VacunaGest
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Sistema de vacunación
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>

      <Divider />

      <List
        sx={{
          flex: 1,
          px: 1.5,
          py: 1.5,
        }}
      >
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            location.pathname === item.path;

          return (
            <ListItemButton
              key={item.label}
              selected={active}
              onClick={() => navigate(item.path)}
              sx={{
                mb: 0.5,
                borderRadius: 2,
                minHeight: 48,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: active
                    ? "primary.main"
                    : "text.secondary",
                }}
              >
                <Icon />
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

      <Divider />

      <Box p={2}>
        <Button
          fullWidth
          variant="outlined"
          onClick={onToggleCollapsed}
          startIcon={
            showExpandedContent
              ? <KeyboardArrowLeftOutlinedIcon />
              : <KeyboardArrowRightOutlinedIcon />
          }
        >
          {showExpandedContent
            ? "Contraer menú"
            : ""}
        </Button>
      </Box>
    </Box>
  );
    const mobileBottomBar = (
    <Paper
      elevation={10}
      sx={{
        display: { xs: "block", md: "none" },
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: (theme) => theme.zIndex.appBar + 1,
        borderTop: 1,
        borderColor: "divider",
        borderRadius: "18px 18px 0 0",
        backgroundColor: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(16px)",
        px: 1,
        py: 0.75,
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.5rem)",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${menuItems.length}, minmax(0, 1fr))`,
          gap: 0.5,
        }}
      >
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            location.pathname === item.path;

          return (
            <ButtonBase
              key={item.label}
              onClick={() => navigate(item.path)}
              sx={{
                minHeight: 60,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
                color: active
                  ? "primary.main"
                  : "text.secondary",
                bgcolor: active
                  ? "rgba(21,101,192,0.08)"
                  : "transparent",
              }}
            >
              <Icon fontSize="small" />

              <Typography
                variant="caption"
                sx={{
                  fontWeight: active ? 700 : 500,
                }}
              >
                {item.label}
              </Typography>
            </ButtonBase>
          );
        })}
      </Box>
    </Paper>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "#F4F7FB",
      }}
    >
      <Box
        component="nav"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          transition: theme.transitions.create(
            "width"
          ),
        }}
      >
        <Drawer
          variant="permanent"
          PaperProps={{
            onTransitionEnd:
              handleDrawerTransitionEnd,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              overflowX: "hidden",
              borderRight: 1,
              borderColor: "divider",
              transition:
                theme.transitions.create("width"),
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: theme.zIndex.appBar,
            backdropFilter: "blur(16px)",
            backgroundColor:
              "rgba(244,247,251,0.88)",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Toolbar
            sx={{
              minHeight: 72,
              px: 3,
            }}
          >
            <Box sx={{ flex: 1 }} />

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
            >
              <Tooltip title="Notificaciones">
                <Badge
                  badgeContent={unreadNotifications}
                  color="error"
                  max={99}
                >
                  <IconButton
                    onClick={() => navigate("/notifications")}
                    sx={{
                      bgcolor: "white",
                      border: 1,
                      borderColor: "divider",
                      "&:hover": {
                        bgcolor: "primary.main",
                      },
                    }}
                  >
                    <NotificationsNoneIcon />
                  </IconButton>
                </Badge>
              </Tooltip>

              <Button
                onClick={(event) =>
                  setProfileMenuAnchor(
                    event.currentTarget
                  )
                }
                sx={{
                  bgcolor: "white",
                  border: 1,
                  borderColor: "divider",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1,
                  py: 0.5,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: 38,
                    height: 38,
                  }}
                >
                  {userName
                    .charAt(0)
                    .toUpperCase()}
                </Avatar>

                <Box
                  sx={{
                    display: {
                      xs: "none",
                      sm: "flex",
                    },
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={700}
                  >
                    {userName}
                  </Typography>

                  <Chip
                    label={role}
                    size="small"
                    sx={{
                      mt: 0.25,
                    }}
                  />
                </Box>
              </Button>
            </Stack>
          </Toolbar>
        </Box>

        <Box
          sx={{
            p: {
              xs: 2,
              md: 3,
            },
            pb: {
              xs: 11,
              md: 3,
            },
            maxWidth: 1600,
            mx: "auto",
          }}
        >
          {children}
        </Box>
      </Box>

      {mobileBottomBar}

      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={() =>
          setProfileMenuAnchor(null)
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            setProfileMenuAnchor(null);
            navigate("/profile/edit");
          }}
        >
          <ListItemIcon>
            <PersonOutlinedIcon
              color="inherit"
              fontSize="small"
            />
          </ListItemIcon>
          Perfil
        </MenuItem>

        <Divider />

        <MenuItem
          sx={{
            color: "error.main",
          }}
          onClick={() => {
            setProfileMenuAnchor(null);
            onLogout();
          }}
        >
          <ListItemIcon>
            <LogoutIcon
              color="error"
              fontSize="small"
            />
          </ListItemIcon>

          Cerrar sesión
        </MenuItem>
      </Menu>
    </Box>
  );
}