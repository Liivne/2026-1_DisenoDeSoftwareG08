import {
  Box,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

type MiniBarProps = {
  label: string;
  value: number;
  max?: number;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info";
};

export default function MiniBar({
  label,
  value,
  max = 100,
  color = "primary",
}: MiniBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <Stack spacing={1}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {label}
        </Typography>

        <Typography
          variant="body2"
          fontWeight={600}
        >
          {Math.round(percentage)}%
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={percentage}
        color={color}
        sx={{
          height: 8,
          borderRadius: 999,
        }}
      />

      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
        >
          {value} de {max}
        </Typography>
      </Box>
    </Stack>
  );
}