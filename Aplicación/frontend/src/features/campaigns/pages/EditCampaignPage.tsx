import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import CampaignForm, {
  type CampaignFormValues,
} from "../components/CampaignForm";
import {
  getCampaignById,
  updateCampaign,
} from "../services/campaigns.service";
import type { Campaign } from "../types/campaign";
import { getVaccines } from "@/features/vaccines/services/vaccines.service";
import type { Vaccine } from "@/features/vaccines/types/vaccine";
import { useSnackbar } from "@/shared/context/SnackbarContext";

export default function EditCampaignPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showSuccess, showError } = useSnackbar();

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!id) return;

      try {
        const [campaignData, vaccineData] = await Promise.all([
          getCampaignById(Number(id)),
          getVaccines(),
        ]);

        setCampaign(campaignData);
        setVaccines(vaccineData);
      } catch {
        showError("No fue posible cargar la campaña.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id, showError]);

  const handleCancel = () => {
    navigate("/campaigns");
  };

  const handleSave = async (values: CampaignFormValues) => {
    if (!id) return;

    try {
      await updateCampaign(Number(id), {
        name: values.name,
        startDate: values.startDate,
        endDate: values.endDate,
        vaccineId: Number(values.vaccineId),
        active: values.status === "Activa",
      });

      showSuccess("Campaña actualizada correctamente.");
      navigate("/campaigns");
    } catch {
      showError("No fue posible actualizar la campaña.");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

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
          vaccines={vaccines}
          initialValues={campaign}
          submitLabel="Guardar cambios"
          onCancel={handleCancel}
          onSubmit={handleSave}
        />
      </Paper>
    </Stack>
  );
}