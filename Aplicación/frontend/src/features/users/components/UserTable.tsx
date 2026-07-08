import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import type { User, UserRole } from "../types/user";

interface UserTableProps {
  users: User[];
}

function getRoleLabel(role: UserRole) {
  switch (role) {
    case "ADMINISTRADOR":
      return "Administrador";
    case "PERSONAL_SALUD":
      return "Personal de Salud";
    case "PACIENTE":
      return "Paciente";
  }
}

export default function UserTable({ users }: UserTableProps) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Nombre</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>RUT</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Correo</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Teléfono</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Rol</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => (
            <TableRow hover key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.rut}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone ?? "Sin teléfono"}</TableCell>
              <TableCell>
                <Chip label={getRoleLabel(user.role)} size="small" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {users.length === 0 && (
        <Typography sx={{ p: 3 }} color="text.secondary">
          No hay usuarios registrados.
        </Typography>
      )}
    </TableContainer>
  );
}