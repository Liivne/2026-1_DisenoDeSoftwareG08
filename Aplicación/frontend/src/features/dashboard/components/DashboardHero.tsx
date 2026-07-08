import { ReactNode } from "react";

import {
  Avatar,
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

type DashboardHeroProps = {
  title: string;
  subtitle?: string;
  badge?: string;
  avatar?: ReactNode;
  details?: {
    label: string;
    value: string;
  }[];
};

export default function DashboardHero({
  title,
  subtitle,
  badge,
  avatar,
  details = [],
}: DashboardHeroProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        background: "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)",
        color: "white",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>

          <Typography
            variant="h4"
            fontWeight={700}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant="h6"
              sx={{
                mt: 1,
                opacity: 0.9,
              }}
            >
              {subtitle}
            </Typography>
          )}

          {details.length > 0 && (
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              sx={{ mt: 3 }}
            >
              {details.map((detail) => (
                <Chip
                  key={detail.label}
                  label={`${detail.label}: ${detail.value}`}
                  sx={{
                    bgcolor: "rgba(255,255,255,.18)",
                    color: "white",
                    fontWeight: 600,
                  }}
                />
              ))}
            </Stack>
          )}

          {badge && (
            <Chip
              label={badge}
              sx={{
                mt: 4,
                bgcolor: "rgba(255,255,255,.18)",
                color: "white",
                fontWeight: 600,
              }}
            />
          )}

        </Box>

        <Avatar
          sx={{
            width: 72,
            height: 72,
            bgcolor: "rgba(255,255,255,.18)",
          }}
        >
          {avatar}
        </Avatar>

      </Stack>
    </Paper>
  );
}