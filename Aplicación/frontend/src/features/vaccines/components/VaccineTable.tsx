import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";

import type { Vaccine } from "../types/vaccine";

interface VaccineTableProps {
  vaccines: Vaccine[];
}

export default function VaccineTable({ vaccines }: VaccineTableProps) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Nombre</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Laboratorio</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Descripción</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Stock</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {vaccines.map((vaccine) => (
            <TableRow hover key={vaccine.id}>
              <TableCell>{vaccine.name}</TableCell>
              <TableCell>{vaccine.laboratory ?? "Sin laboratorio"}</TableCell>
              <TableCell>{vaccine.description ?? "Sin descripción"}</TableCell>
              <TableCell>{vaccine.stock}</TableCell>
              <TableCell>
                <Chip
                  label={vaccine.stock > 0 ? "Disponible" : "Sin stock"}
                  color={vaccine.stock > 0 ? "success" : "error"}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {vaccines.length === 0 && (
        <Typography sx={{ p: 3 }} color="text.secondary">
          No hay vacunas registradas.
        </Typography>
      )}
    </TableContainer>
  );
}