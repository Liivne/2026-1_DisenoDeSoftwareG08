import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import CampaignForm from "../components/CampaignForm";
import { mockCampaigns } from "../data/mockCampaigns";

export default function EditCampaignPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const campaign = useMemo(
    () =>
      mockCampaigns.find(
        (item) => String(item.id) === id
      ),
    [id]
  );

  const [saved, setSaved] = useState(false);

  const handleCancel = () => {
    navigate("/campaigns");
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      navigate("/campaigns");
    }, 700);
  };

  if (!campaign) {
    return (
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight={700}>
          Campaña no encontrada
        </Typography>

        <Typography color="text.secondary">
          La campaña solicitada no existe o ya fue eliminada.
        </Typography>

        <Box>
          <Button
            variant="contained"
            onClick={() => navigate("/campaigns")}
          >
            Volver a campañas
          </Button>
        </Box>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={700}>
          Editar campaña
        </Typography>

        <Typography color="text.secondary">
          Modifica la información de la campaña seleccionada.
        </Typography>
      </Box>

      {saved && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: "success.light",
            color: "success.contrastText",
          }}
        >
          Campaña actualizada correctamente.
        </Paper>
      )}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <CampaignForm
          mode="edit"
          showStatus
          initialValues={campaign}
          submitLabel="Guardar cambios"
          onCancel={handleCancel}
          onSubmit={handleSave}
        />
      </Paper>
    </Stack>
  );
}