import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import CampaignForm from "../components/CampaignForm";

export default function CreateCampaignPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box py={5}>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Volver
        </Button>

        <Paper sx={{ p: 4 }}>

          <Typography variant="h4" mb={4}>
            Nueva Campaña de Vacunación
          </Typography>

          <CampaignForm />

        </Paper>

      </Box>
    </Container>
  );
}