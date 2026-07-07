import {
  Box,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import VaccinesIcon from "@mui/icons-material/Vaccines";

import AppointmentStatusChip from "./AppointmentStatusChip";

import { Appointment } from "../types/appointment";


interface Props {

  appointment: Appointment;

}


export default function AppointmentCard({
  appointment,
}: Props) {


  return (

    <Paper
      sx={{
        p:3,
        borderRadius:3,
      }}
    >

      <Stack spacing={2}>


        <Stack
          direction="row"
          justifyContent="space-between"
        >

          <Stack direction="row" spacing={1}>

            <VaccinesIcon color="primary"/>

            <Typography
              fontWeight={700}
            >
              {appointment.vaccine}
            </Typography>

          </Stack>


          <AppointmentStatusChip
            status={appointment.status}
          />

        </Stack>



        <Stack spacing={1}>


          <Typography>
            📅 {appointment.date}
          </Typography>


          <Typography>
            🕒 {appointment.time}
          </Typography>


          <Typography>
            📍 {appointment.location}
          </Typography>


          <Typography>
            👨‍⚕️ {appointment.professional}
          </Typography>


        </Stack>


      </Stack>


    </Paper>

  );
}