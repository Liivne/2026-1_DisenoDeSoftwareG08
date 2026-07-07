import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

import {
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export type DashboardAlert = {
  id: string | number;
  title: string;
  description?: string;
  status?: string;
};

type DashboardAlertsProps = {
  title: string;
  alerts: DashboardAlert[];
  onSelect?: (alert: DashboardAlert) => void;
};

export default function DashboardAlerts({
  title,
  alerts,
  onSelect,
}: DashboardAlertsProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
      }}
    >
      <Stack spacing={2}>

        <Typography
          variant="h6"
          fontWeight={700}
        >
          {title}
        </Typography>

        <List disablePadding>

          {alerts.map((alert) => (
            <ListItem
              key={alert.id}
              disablePadding
              sx={{ mb: 1 }}
            >
              <ListItemButton
                onClick={() => onSelect?.(alert)}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                }}
              >
                <ListItemText
                  primary={alert.title}
                  secondary={alert.description}
                />

                {alert.status && (
                  <Chip
                    label={alert.status}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                )}

                <ChevronRightOutlinedIcon
                  color="action"
                />

              </ListItemButton>
            </ListItem>
          ))}

        </List>

      </Stack>
    </Paper>
  );
}