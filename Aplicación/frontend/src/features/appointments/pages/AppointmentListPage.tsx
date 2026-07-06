import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import AppointmentList from "../components/AppointmentList";
import { mockAppointments } from "../data/mockAppointments";



export default function AppointmentListPage(){
  const navigate = useNavigate();

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        mb={3}
      >
        <Typography
          variant="h4"
          fontWeight={700}
        >
          Mis citas
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon/>}
          onClick={() =>
            navigate("/appointments/new")
          }
        >
          Nueva cita
        </Button>
      </Stack>

      <AppointmentList
        appointments={mockAppointments}
      />
    </Box>
  );
}