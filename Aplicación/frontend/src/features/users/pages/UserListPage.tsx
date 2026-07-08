import { useEffect, useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import UserTable from "../components/UserTable";
import { getUsers } from "../services/users.service";
import type { User, UserRole } from "../types/user";

type RoleFilter = UserRole | "TODOS";

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("TODOS");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        setError("");

        const data = await getUsers();

        setUsers(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "No fue posible cargar los usuarios."
        );
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const value = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !value ||
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.rut.toLowerCase().includes(value);

      const matchesRole =
        roleFilter === "TODOS" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Gestión de Usuarios
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <TextField
          size="small"
          placeholder="Buscar usuarios..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          sx={{ width: { xs: "100%", md: 320 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          size="small"
          label="Rol"
          value={roleFilter}
          onChange={(event) =>
            setRoleFilter(event.target.value as RoleFilter)
          }
          sx={{ width: { xs: "100%", md: 240 } }}
        >
          <MenuItem value="TODOS">Todos los roles</MenuItem>
          <MenuItem value="ADMINISTRADOR">Administrador</MenuItem>
          <MenuItem value="PERSONAL_SALUD">Personal de Salud</MenuItem>
          <MenuItem value="PACIENTE">Paciente</MenuItem>
        </TextField>
      </Stack>

      {loading && <CircularProgress />}

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && <UserTable users={filteredUsers} />}
    </Box>
  );
}