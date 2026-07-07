import {
    Box,
    Button,
    Container,
    Typography,
} from "@mui/material";
import AppointmentForm from "../components/AppointmentForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function CreateAppointmentPage() {
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
        <Typography variant="h4" gutterBottom>
          Crear nueva cita
        </Typography>
        <AppointmentForm />
      </Box>
    </Container>
  );
}