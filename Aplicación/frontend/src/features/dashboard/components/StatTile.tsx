import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";

import { StatCard } from "../types";

function toneStyles(tone: StatCard["tone"]) {
  switch (tone) {
    case "success":
      return { bg: "rgba(76,175,80,0.12)", fg: "#2E7D32" };
    case "info":
      return { bg: "rgba(2,136,209,0.12)", fg: "#0277BD" };
    case "warning":
      return { bg: "rgba(251,140,0,0.12)", fg: "#E65100" };
    default:
      return { bg: "rgba(21,101,192,0.12)", fg: "#0D47A1" };
  }
}

export default function StatTile({ stat }: { stat: StatCard }) {
  const styles = toneStyles(stat.tone);

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        borderRadius: 2,
        borderColor: "divider",
        boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              bgcolor: styles.bg,
              color: styles.fg,
            }}
          >
            {stat.icon}
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {stat.label}
            </Typography>
            <Typography variant="h4" component="p" sx={{ mt: 0.5 }}>
              {stat.value}
            </Typography>
          </Box>
          <Chip
            label={stat.delta}
            size="small"
            sx={{ width: "fit-content", bgcolor: styles.bg, color: styles.fg, fontWeight: 700 }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}