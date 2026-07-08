import { ReactNode } from "react";

import {
  Paper,
  Stack,
  Typography,
} from "@mui/material";

type MetricCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
};

export default function MetricCard({
  title,
  value,
  icon,
  color = "#1976D2",
}: MetricCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 176,
        transition: "all .2s ease",

        "&:hover": {
          boxShadow: 4,
          transform: "translateY(-2px)",
        },
      }}
    >
      <Stack spacing={1.5}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 50,
            height: 50,
            borderRadius: 3,
            bgcolor: `${color}15`,
            color,
          }}
        >
          {icon}
        </Stack>

        <Typography variant="h4" fontWeight={700}>
          {value}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </Stack>
    </Paper>
  );
}