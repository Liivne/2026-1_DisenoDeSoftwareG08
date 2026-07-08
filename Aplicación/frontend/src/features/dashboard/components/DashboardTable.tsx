import { ReactNode } from "react";

import {
  Paper,
  Stack,
  Typography,
} from "@mui/material";

type DashboardTableProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export default function DashboardTable({
  title,
  subtitle,
  actions,
  children,
}: DashboardTableProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack spacing={3} sx={{ flex: 1 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <Stack spacing={0.5}>
            <Typography variant="h6" fontWeight={700}>
              {title}
            </Typography>

            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Stack>

          {actions}
        </Stack>

        <Stack sx={{ flex: 1 }}>{children}</Stack>
      </Stack>
    </Paper>
  );
}