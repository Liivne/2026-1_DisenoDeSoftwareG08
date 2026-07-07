import { ReactNode } from "react";

import {
  Paper,
  Stack,
  Typography,
} from "@mui/material";

type DashboardChartProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function DashboardChart({
  title,
  subtitle,
  children,
}: DashboardChartProps) {
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
      <Stack spacing={3}>

        <Stack spacing={0.5}>

          <Typography
            variant="h6"
            fontWeight={700}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {subtitle}
            </Typography>
          )}

        </Stack>

        {children}

      </Stack>
    </Paper>
  );
}