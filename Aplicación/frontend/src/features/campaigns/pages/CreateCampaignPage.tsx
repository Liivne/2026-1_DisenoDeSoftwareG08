import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";

import CampaignForm from "../components/CampaignForm";

export default function CreateCampaignPage() {
  const navigate = useNavigate();

  const [successOpen, setSuccessOpen] = useState(false);

  const handleCancel = () => {
    navigate("/campaigns");
  };

  const handleCreate = () => {
    setSuccessOpen(true);

    setTimeout(() => {
      navigate("/campaigns");
    }, 1500);
  };

  return (
    <>
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

            <CampaignForm
              mode="create"
              showStatus={false}
              submitLabel="Crear campaña"
              onCancel={handleCancel}
              onSubmit={handleCreate}
            />
          </Stack>
        </Paper>
      </Stack>

      <Snackbar
        open={successOpen}
        autoHideDuration={1500}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Campaña creada correctamente.
        </Alert>
      </Snackbar>
    </>
  );
}