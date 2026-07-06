import {
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

export default function AppointmentForm() {
  return (
    <Stack spacing={3}>

      <Typography variant="h6">
        Buscar disponibilidad de vacuna
      </Typography>

      <TextField
        select
        fullWidth
        label="Vacuna solicitada"
      >
        <MenuItem value="covid">
          COVID-19
        </MenuItem>

        <MenuItem value="influenza">
          Influenza
        </MenuItem>

        <MenuItem value="hepatitis">
          Hepatitis B
        </MenuItem>
      </TextField>


      <Grid container spacing={2}>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            type="date"
            label="Fecha desde"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>


        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            type="date"
            label="Fecha hasta"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

      </Grid>


      <TextField
        select
        fullWidth
        label="Centro de vacunación"
      >
        <MenuItem value="cesfam1">
          CESFAM Centro
        </MenuItem>

        <MenuItem value="cesfam2">
          CESFAM Norte
        </MenuItem>
      </TextField>


      <Button
        variant="contained"
      >
        Buscar horarios disponibles
      </Button>

      {/* Resultado de búsqueda */}

      <Typography variant="h6">
        Horarios disponibles
      </Typography>


      <Card>
        <CardContent>
          <Typography>
            Campaña: Vacunación Influenza 2026
          </Typography>

          <Typography>
            Fecha: 15/07/2026
          </Typography>

          <Typography>
            Horarios disponibles:
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            mt={2}
          >
            <Button variant="outlined">
              09:00
            </Button>

            <Button variant="outlined">
              10:30
            </Button>

            <Button variant="outlined">
              14:00
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
      >
        <Button variant="outlined">
          Cancelar
        </Button>

        <Button
          variant="contained"
          disabled
        >
          Agendar cita
        </Button>
      </Stack>
    </Stack>
  );
}