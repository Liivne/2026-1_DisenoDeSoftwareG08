import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import {
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import type { Notification } from "../types/notification";

type Props = {
  notification: Notification;
};

const typeConfig = {
  info: {
    icon: <InfoOutlinedIcon />,
    color: "#1565C0",
    label: "Información",
  },
  success: {
    icon: <CheckCircleOutlineIcon />,
    color: "#2E7D32",
    label: "Completado",
  },
  warning: {
    icon: <WarningAmberOutlinedIcon />,
    color: "#EF6C00",
    label: "Advertencia",
  },
  error: {
    icon: <ErrorOutlineOutlinedIcon />,
    color: "#C62828",
    label: "Importante",
  },
};

export default function NotificationCard({
  notification,
}: Props) {
  const config = typeConfig[notification.type];
  const isUnread = notification.status === "unread";

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid",
        borderColor: isUnread ? config.color : "divider",
        bgcolor: isUnread ? `${config.color}08` : "background.paper",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: 3,
              bgcolor: `${config.color}15`,
              color: config.color,
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            {config.icon}
          </Box>

          <Box>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              <Typography variant="h6" fontWeight={700}>
                {notification.title}
              </Typography>

              {isUnread && (
                <Chip
                  label="Nueva"
                  size="small"
                  color="primary"
                />
              )}
            </Stack>

            <Typography color="text.secondary" mt={0.5}>
              {notification.description}
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={1}>
              {notification.date} · {notification.time}
            </Typography>
          </Box>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          alignItems="flex-start"
          justifyContent="flex-end"
        >
          <Chip
            label={config.label}
            size="small"
            variant="outlined"
          />

          <Chip
            label={notification.audience}
            size="small"
          />
        </Stack>
      </Stack>
    </Paper>
  );
}