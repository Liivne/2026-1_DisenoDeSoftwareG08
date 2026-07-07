import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import {
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import type { VaccinationHistoryItem } from "../types/vaccinationHistory";

type Props = {
  item: VaccinationHistoryItem;
};

export default function VaccinationHistoryCard({ item }: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        spacing={2}
      >
        <Stack direction="row" spacing={2}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: 3,
              bgcolor: "rgba(21, 101, 192, 0.12)",
              color: "#1565C0",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <VaccinesOutlinedIcon />
          </Box>

          <Box>
            <Typography variant="h6" fontWeight={700}>
              {item.vaccine}
            </Typography>

            <Typography color="text.secondary">
              {item.dose}
            </Typography>

            <Stack direction="row" spacing={1.5} mt={1.5} flexWrap="wrap">
              <Chip
                icon={<CalendarMonthOutlinedIcon />}
                label={item.displayDate}
                variant="outlined"
              />

              <Chip
                icon={<LocalHospitalOutlinedIcon />}
                label={item.center}
                variant="outlined"
              />
            </Stack>
          </Box>
        </Stack>

        <Chip
          icon={<CheckCircleOutlineIcon />}
          label={item.status}
          color="success"
          size="small"
          sx={{
            alignSelf: {
              xs: "flex-start",
              md: "center",
            },
          }}
        />
      </Stack>
    </Paper>
  );
}