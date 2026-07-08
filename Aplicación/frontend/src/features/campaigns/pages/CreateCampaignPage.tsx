import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import CampaignForm, {
  type CampaignFormValues,
} from "../components/CampaignForm";
import { createCampaign } from "../services/campaigns.service";
import {
  getVaccines,
} from "@/features/vaccines/services/vaccines.service";
import type { Vaccine } from "@/features/vaccines/types/vaccine";
import { useSnackbar } from "@/shared/context/SnackbarContext";

export default function CreateCampaignPage() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useSnackbar();

  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVaccines() {
      try {
        const data = await getVaccines();
        setVaccines(data);
      } catch {
        showError("No fue posible cargar las vacunas.");
      } finally {
        setLoading(false);
      }
    }

    loadVaccines();
  }, [showError]);

  const handleCancel = () => {
    navigate("/campaigns");
  };

  const handleCreate = async (values: CampaignFormValues) => {
    try {
      await createCampaign({
        name: values.name,
        description: "Campaña creada desde el sistema.",
        startDate: values.startDate,
        endDate: values.endDate,
        vaccineId: Number(values.vaccineId),
        active: values.status === "Activa",
      });

      showSuccess("Campaña creada correctamente.");
      navigate("/campaigns");
    } catch {
      showError("No fue posible crear la campaña.");
    }
  };

  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h4" fontWeight={700}>
            Nueva Campaña de Vacunación
          </Typography>

          {loading ? (
            <CircularProgress />
          ) : (
            <CampaignForm
              mode="create"
              vaccines={vaccines}
              showStatus
              submitLabel="Crear campaña"
              onCancel={handleCancel}
              onSubmit={handleCreate}
            />
          )}
        </Stack>
      </Paper>
    </Stack>
  );
}