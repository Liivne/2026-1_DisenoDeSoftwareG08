import { Stack } from "@mui/material";
import AppointmentCard from "./AppointmentCard";
import { Appointment } from "../types/appointment";

interface Props {
  appointments: Appointment[];
}

export default function AppointmentList({
  appointments,
}: Props) {
  return (
    <Stack spacing={2}>
      {
        appointments.map(
          appointment => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
            />

          )
        )
      }

    </Stack>
  );
}