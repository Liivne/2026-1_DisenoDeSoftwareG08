import {
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

export default function CampaignForm() {
  return (
    <Stack spacing={3}>

      <TextField
        fullWidth
        label="Nombre de la campaña"
      />

      <Grid container spacing={2}>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            type="date"
            label="Fecha inicio"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            type="date"
            label="Fecha término"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

      </Grid>

      <TextField
        select
        fullWidth
        label="Vacuna"
      >
        <MenuItem value="covid">COVID-19</MenuItem>
        <MenuItem value="influenza">Influenza</MenuItem>
        <MenuItem value="hepatitis">Hepatitis B</MenuItem>
      </TextField>

      <TextField
        fullWidth
        label="Responsable"
      />

      <TextField
        select
        fullWidth
        label="Estado"
        defaultValue="Planificada"
      >
        <MenuItem value="Planificada">Planificada</MenuItem>
        <MenuItem value="Activa">Activa</MenuItem>
        <MenuItem value="Finalizada">Finalizada</MenuItem>
      </TextField>

      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
      >
        <Button variant="outlined">
          Cancelar
        </Button>

        <Button variant="contained">
          Crear Campaña
        </Button>
      </Stack>

    </Stack>
  );
}