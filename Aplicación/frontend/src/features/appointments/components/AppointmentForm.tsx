import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useSnackbar } from "@/shared/context/SnackbarContext";

import {
  createAppointment,
  getAppointmentCampaigns,
  getVaccinationPoints,
  type AppointmentCampaignOption,
  type VaccinationPointOption,
} from "../services/appointments.service";
import { useLoading } from "@/shared/context/LoadingContext";

export default function AppointmentForm() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useSnackbar();
  const { showLoader, hideLoader } = useLoading();

  const [campaigns, setCampaigns] = useState<AppointmentCampaignOption[]>([]);
  const [points, setPoints] = useState<VaccinationPointOption[]>([]);

  const [campaignId, setCampaignId] = useState("");
  const [vaccinationPointId, setVaccinationPointId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOptions() {
      try {
        const [campaignData, pointData] = await Promise.all([
          getAppointmentCampaigns(),
          getVaccinationPoints(),
        ]);

        setCampaigns(campaignData);
        setPoints(pointData);
      } catch {
        const message = "No fue posible cargar las opciones de agendamiento.";
        setError(message);
        showError(message);
      }
    }

    loadOptions();
  }, [showError]);

  const canSubmit = campaignId && vaccinationPointId && date && time;

  async function handleSubmit() {
    if (!canSubmit) return;

    try {
      setLoading(true);
      showLoader();
      setError("");

      const appointmentDate = new Date(`${date}T${time}:00`).toISOString();

      await createAppointment({
        campaignId: Number(campaignId),
        vaccinationPointId: Number(vaccinationPointId),
        appointmentDate,
      });

      showSuccess("Cita agendada correctamente.");
      navigate("/appointments");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No fue posible agendar la cita.";

      setError(message);
      showError(message);
    } finally {
      setLoading(false);
      hideLoader();
    }
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Agendar nueva cita</Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        select
        fullWidth
        label="Campaña / vacuna"
        value={campaignId}
        onChange={(event) => setCampaignId(event.target.value)}
      >
        {campaigns.map((campaign) => (
          <MenuItem key={campaign.id} value={campaign.id}>
            {campaign.name} — {campaign.vaccine.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        fullWidth
        label="Centro de vacunación"
        value={vaccinationPointId}
        onChange={(event) => setVaccinationPointId(event.target.value)}
      >
        {points.map((point) => (
          <MenuItem key={point.id} value={point.id}>
            {point.name} — {point.address}
          </MenuItem>
        ))}
      </TextField>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            type="date"
            label="Fecha"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            type="time"
            label="Hora"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button variant="outlined" onClick={() => navigate("/appointments")}>
          Cancelar
        </Button>

        <Button
          variant="contained"
          disabled={!canSubmit || loading}
          onClick={handleSubmit}
        >
          {loading ? "Agendando..." : "Agendar cita"}
        </Button>
      </Stack>
    </Stack>
  );
}