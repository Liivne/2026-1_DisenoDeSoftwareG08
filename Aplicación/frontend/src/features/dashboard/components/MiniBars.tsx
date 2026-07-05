import { Box, Stack, Typography } from "@mui/material";

export default function MiniBars({ data }: { data: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...data.map((item) => item.value));

  return (
    <Stack direction="row" alignItems="flex-end" spacing={2} sx={{ minHeight: 220, pt: 1 }}>
      {data.map((item) => (
        <Stack key={item.label} spacing={1} alignItems="center" sx={{ flex: 1 }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              minHeight: 180,
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 52,
                height: `${(item.value / max) * 100}%`,
                minHeight: 24,
                borderRadius: 2,
                background: `linear-gradient(180deg, ${item.color} 0%, rgba(21,101,192,0.18) 100%)`,
                boxShadow: "0 12px 24px rgba(21,101,192,0.12)",
              }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {item.label}
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary" }}>
            {item.value}%
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}