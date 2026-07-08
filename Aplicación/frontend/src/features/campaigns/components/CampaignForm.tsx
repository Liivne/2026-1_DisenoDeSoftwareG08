import { useState } from "react";
import {
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

import type { Campaign } from "../types/campaign";

type VaccineOption = {
  id: number;
  name: string;
};

export type CampaignFormValues = {
  name: string;
  startDate: string;
  endDate: string;
  vaccineId: string;
  responsible: string;
  status: string;
};

type CampaignFormErrors = Partial<Record<keyof CampaignFormValues, string>>;

type CampaignFormProps = {
  mode?: "create" | "edit";
  initialValues?: Partial<Campaign>;
  vaccines: VaccineOption[];
  submitLabel?: string;
  showStatus?: boolean;
  onCancel?: () => void;
  onSubmit?: (values: CampaignFormValues) => void;
};

const defaultValues: CampaignFormValues = {
  name: "",
  startDate: "",
  endDate: "",
  vaccineId: "",
  responsible: "Administrador",
  status: "Planificada",
};

export default function CampaignForm({
  mode = "create",
  initialValues,
  vaccines,
  submitLabel,
  showStatus = true,
  onCancel,
  onSubmit,
}: CampaignFormProps) {
  const initialVaccine = vaccines.find(
    (vaccine) => vaccine.name === initialValues?.vaccine
  );

  const [values, setValues] = useState<CampaignFormValues>({
    name: initialValues?.name ?? defaultValues.name,
    startDate: initialValues?.startDate ?? defaultValues.startDate,
    endDate: initialValues?.endDate ?? defaultValues.endDate,
    vaccineId: initialVaccine ? String(initialVaccine.id) : defaultValues.vaccineId,
    responsible: initialValues?.responsible ?? defaultValues.responsible,
    status: initialValues?.status ?? defaultValues.status,
  });

  const [errors, setErrors] = useState<CampaignFormErrors>({});

  const validate = () => {
    const newErrors: CampaignFormErrors = {};

    if (!values.name.trim()) {
      newErrors.name = "El nombre de la campaña es obligatorio.";
    }

    if (!values.startDate) {
      newErrors.startDate = "La fecha de inicio es obligatoria.";
    }

    if (!values.endDate) {
      newErrors.endDate = "La fecha de término es obligatoria.";
    }

    if (
      values.startDate &&
      values.endDate &&
      values.endDate < values.startDate
    ) {
      newErrors.endDate =
        "La fecha de término no puede ser anterior a la fecha de inicio.";
    }

    if (!values.vaccineId) {
      newErrors.vaccineId = "Debes seleccionar una vacuna.";
    }

    if (!values.responsible.trim()) {
      newErrors.responsible = "El responsable es obligatorio.";
    }

    if (!values.status) {
      newErrors.status = "Debes seleccionar un estado.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    field: keyof CampaignFormValues,
    value: string
  ) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit?.({
      ...values,
      status: showStatus ? values.status : "Planificada",
    });
  };

  return (
    <Stack spacing={3}>
      <TextField
        fullWidth
        required
        label="Nombre de la campaña"
        value={values.name}
        error={Boolean(errors.name)}
        helperText={errors.name}
        onChange={(event) =>
          handleChange("name", event.target.value)
        }
      />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            type="date"
            label="Fecha inicio"
            value={values.startDate}
            error={Boolean(errors.startDate)}
            helperText={errors.startDate}
            onChange={(event) =>
              handleChange("startDate", event.target.value)
            }
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            type="date"
            label="Fecha término"
            value={values.endDate}
            error={Boolean(errors.endDate)}
            helperText={errors.endDate}
            onChange={(event) =>
              handleChange("endDate", event.target.value)
            }
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      <TextField
        select
        fullWidth
        required
        label="Vacuna"
        value={values.vaccineId}
        error={Boolean(errors.vaccineId)}
        helperText={errors.vaccineId}
        onChange={(event) =>
          handleChange("vaccineId", event.target.value)
        }
      >
        {vaccines.map((vaccine) => (
          <MenuItem key={vaccine.id} value={String(vaccine.id)}>
            {vaccine.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        required
        label="Responsable"
        value={values.responsible}
        error={Boolean(errors.responsible)}
        helperText={errors.responsible}
        onChange={(event) =>
          handleChange("responsible", event.target.value)
        }
      />

      {showStatus && (
        <TextField
          select
          fullWidth
          required
          label="Estado"
          value={values.status}
          error={Boolean(errors.status)}
          helperText={errors.status}
          onChange={(event) =>
            handleChange("status", event.target.value)
          }
        >
          <MenuItem value="Planificada">
            Planificada
          </MenuItem>

          <MenuItem value="Activa">
            Activa
          </MenuItem>

          <MenuItem value="Finalizada">
            Finalizada
          </MenuItem>
        </TextField>
      )}

      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button variant="outlined" onClick={onCancel}>
          Cancelar
        </Button>

        <Button variant="contained" onClick={handleSubmit}>
          {submitLabel ??
            (mode === "edit"
              ? "Guardar cambios"
              : "Crear campaña")}
        </Button>
      </Stack>
    </Stack>
  );
}