import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  Button,
  Collapse,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import type { VaccinationHistoryFilters } from "../types/vaccinationHistory";

type Props = {
  filters: VaccinationHistoryFilters;
  onChange: (filters: VaccinationHistoryFilters) => void;
  onClear: () => void;
};

export default function VaccinationHistoryFilters({
  filters,
  onChange,
  onClear,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Stack spacing={2}>
      <Button
        variant="outlined"
        startIcon={<FilterListOutlinedIcon />}
        onClick={() => setOpen((current) => !current)}
        sx={{
          alignSelf: "flex-start",
          px: 3,
          py: 1.4,
          borderRadius: 2,
          fontWeight: 700,
        }}
      >
        Filtrar
      </Button>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h6" fontWeight={700}>
              Filtros de búsqueda
            </Typography>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  select
                  fullWidth
                  label="Vacuna"
                  value={filters.vaccine}
                  onChange={(event) =>
                    onChange({
                      ...filters,
                      vaccine: event.target.value,
                    })
                  }
                >
                  <MenuItem value="">Todas</MenuItem>
                  <MenuItem value="COVID-19">COVID-19</MenuItem>
                  <MenuItem value="Influenza">Influenza</MenuItem>
                  <MenuItem value="Hepatitis B">Hepatitis B</MenuItem>
                  <MenuItem value="VPH">VPH</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  select
                  fullWidth
                  label="Centro de vacunación"
                  value={filters.center}
                  onChange={(event) =>
                    onChange({
                      ...filters,
                      center: event.target.value,
                    })
                  }
                >
                  <MenuItem value="">Todos</MenuItem>
                  <MenuItem value="CESFAM Norte">CESFAM Norte</MenuItem>
                  <MenuItem value="CESFAM Central">CESFAM Central</MenuItem>
                  <MenuItem value="Hospital Regional">
                    Hospital Regional
                  </MenuItem>
                  <MenuItem value="Hospital San Borja Arriarán">
                    Hospital San Borja Arriarán
                  </MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Fecha desde"
                  value={filters.dateFrom}
                  onChange={(event) =>
                    onChange({
                      ...filters,
                      dateFrom: event.target.value,
                    })
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Fecha hasta"
                  value={filters.dateTo}
                  onChange={(event) =>
                    onChange({
                      ...filters,
                      dateTo: event.target.value,
                    })
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button variant="outlined" onClick={onClear}>
                Limpiar filtros
              </Button>

              <Button variant="contained" startIcon={<SearchOutlinedIcon />}>
                Buscar
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Collapse>
    </Stack>
  );
}