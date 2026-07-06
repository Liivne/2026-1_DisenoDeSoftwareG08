import {
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const campaigns = [
  {
    nombre: "Campaña COVID-19 Bivalente",
    inicio: "2025-04-01",
    termino: "2025-06-30",
    estado: "Activa",
    responsable: "Dra. Ana Martínez",
    vacuna: "Moderna",
  },
  {
    nombre: "Vacunación Influenza 2025",
    inicio: "2025-03-15",
    termino: "2025-05-31",
    estado: "Activa",
    responsable: "Dr. Carlos Reyes",
    vacuna: "Influvac",
  },
];

export default function CampaignTable() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          <TableCell>Inicio</TableCell>
          <TableCell>Término</TableCell>
          <TableCell>Estado</TableCell>
          <TableCell>Responsable</TableCell>
          <TableCell>Vacuna</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>

      <TableBody>
        {campaigns.map((c) => (
          <TableRow key={c.nombre}>
            <TableCell>{c.nombre}</TableCell>
            <TableCell>{c.inicio}</TableCell>
            <TableCell>{c.termino}</TableCell>

            <TableCell>
              <Chip
                label={c.estado}
                color={c.estado === "Activa" ? "success" : "primary"}
                size="small"
              />
            </TableCell>

            <TableCell>{c.responsable}</TableCell>

            <TableCell>{c.vacuna}</TableCell>

            <TableCell align="right">
              <IconButton>
                <EditIcon />
              </IconButton>

              <IconButton color="error">
                <DeleteOutlineIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}