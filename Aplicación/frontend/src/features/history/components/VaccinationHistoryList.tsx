import {
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import type { VaccinationHistoryItem } from "../types/vaccinationHistory";
import VaccinationHistoryCard from "./VaccinationHistoryCard";

type Props = {
  items: VaccinationHistoryItem[];
};

export default function VaccinationHistoryList({ items }: Props) {
  if (items.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <Typography color="text.secondary">
          No se encontraron vacunas con los filtros seleccionados.
        </Typography>
      </Paper>
    );
  }

  return (
    <Stack spacing={2}>
      {items.map((item) => (
        <VaccinationHistoryCard key={item.id} item={item} />
      ))}
    </Stack>
  );
}