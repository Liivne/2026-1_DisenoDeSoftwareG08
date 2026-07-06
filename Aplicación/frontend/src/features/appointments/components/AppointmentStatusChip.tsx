import { Chip } from "@mui/material";

import { AppointmentStatus } from "../types/appointment";


interface Props {
  status: AppointmentStatus;
}


export default function AppointmentStatusChip({
  status,
}: Props) {


  const config = {

    Confirmada: {
      color: "#138A42",
      bg: "#D8F5E5",
    },

    Pendiente: {
      color: "#B77900",
      bg: "#FFF3CD",
    },

    Cancelada: {
      color: "#B91C1C",
      bg: "#FEE2E2",
    },

  };


  return (

    <Chip
      label={status}
      size="small"
      sx={{
        backgroundColor:
          config[status].bg,

        color:
          config[status].color,

        fontWeight: 600,
      }}
    />

  );
}