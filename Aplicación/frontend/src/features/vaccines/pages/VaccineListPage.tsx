import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import { useSnackbar } from "@/shared/context/SnackbarContext";

import VaccineTable from "../components/VaccineTable";
import {
  createVaccine,
  getVaccines,
} from "../services/vaccines.service";
import type { Vaccine } from "../types/vaccine";

export default function VaccineListPage() {
  const { showSuccess, showError } = useSnackbar();

  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newVaccine, setNewVaccine] = useState({
    name: "",
    laboratory: "",
    description: "",
    stock: "0",
  });

  async function loadVaccines() {
    try {
      setLoading(true);
      setError("");

      const data = await getVaccines();

      setVaccines(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No fue posible cargar las vacunas."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVaccines();
  }, []);

  const filteredVaccines = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return vaccines;

    return vaccines.filter(
      (vaccine) =>
        vaccine.name.toLowerCase().includes(value) ||
        vaccine.laboratory?.toLowerCase().includes(value)
    );
  }, [vaccines, search]);

  function handleCloseDialog() {
    setDialogOpen(false);
    setNewVaccine({
      name: "",
      laboratory: "",
      description: "",
      stock: "0",
    });
  }

  async function handleCreateVaccine() {
    if (!newVaccine.name.trim()) {
      showError("El nombre de la vacuna es obligatorio.");
      return;
    }

    try {
      setSaving(true);

      const created = await createVaccine({
        name: newVaccine.name.trim(),
        laboratory: newVaccine.laboratory.trim() || undefined,
        description: newVaccine.description.trim() || undefined,
        stock: Number(newVaccine.stock),
      });

      setVaccines((current) => [...current, created]);

      showSuccess("Vacuna registrada correctamente.");
      handleCloseDialog();
    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : "No fue posible registrar la vacuna."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4" fontWeight={700}>
          Gestión de Vacunas
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Nueva vacuna
        </Button>
      </Stack>

      <TextField
        size="small"
        placeholder="Buscar vacunas..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        sx={{ width: 320, mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {loading && <CircularProgress />}

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && <VaccineTable vaccines={filteredVaccines} />}

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Nueva vacuna</DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Nombre"
              value={newVaccine.name}
              onChange={(event) =>
                setNewVaccine((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              fullWidth
              required
            />

            <TextField
              label="Laboratorio"
              value={newVaccine.laboratory}
              onChange={(event) =>
                setNewVaccine((current) => ({
                  ...current,
                  laboratory: event.target.value,
                }))
              }
              fullWidth
            />

            <TextField
              label="Descripción"
              value={newVaccine.description}
              onChange={(event) =>
                setNewVaccine((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              fullWidth
              multiline
              minRows={3}
            />

            <TextField
              label="Stock"
              type="number"
              value={newVaccine.stock}
              onChange={(event) =>
                setNewVaccine((current) => ({
                  ...current,
                  stock: event.target.value,
                }))
              }
              fullWidth
              inputProps={{
                min: 0,
              }}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={saving}>
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={handleCreateVaccine}
            disabled={saving}
          >
            {saving ? "Guardando..." : "Registrar vacuna"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}