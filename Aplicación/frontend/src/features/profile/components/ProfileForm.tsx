import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
  Button,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

export type ProfileFormValues = {
  name: string;
  phone: string;
  email: string;
  address: string;
};

type ProfileFormErrors = Partial<Record<keyof ProfileFormValues, string>>;

type ProfileFormProps = {
  initialValues: ProfileFormValues;
  onCancel: () => void;
  onSubmit: (values: ProfileFormValues) => void;
};

export default function ProfileForm({
  initialValues,
  onCancel,
  onSubmit,
}: ProfileFormProps) {
  const [values, setValues] = useState<ProfileFormValues>(initialValues);
  const [errors, setErrors] = useState<ProfileFormErrors>({});

  const handleChange = (
    field: keyof ProfileFormValues,
    value: string
  ) => {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  };

  const validate = () => {
    const newErrors: ProfileFormErrors = {};

    if (!values.name.trim()) {
      newErrors.name = "El nombre visible es obligatorio.";
    }

    if (!values.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    }

    if (
      values.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
    ) {
      newErrors.email = "Ingresa un correo electrónico válido.";
    }

    if (!values.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio.";
    }

    if (!values.address.trim()) {
      newErrors.address = "La dirección es obligatoria.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit(values);
  };

  return (
    <Stack spacing={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            label="Nombre visible"
            value={values.name}
            error={Boolean(errors.name)}
            helperText={errors.name}
            onChange={(event) =>
              handleChange("name", event.target.value)
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            label="Teléfono"
            value={values.phone}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
            onChange={(event) =>
              handleChange("phone", event.target.value)
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            type="email"
            label="Correo electrónico"
            value={values.email}
            error={Boolean(errors.email)}
            helperText={errors.email}
            onChange={(event) =>
              handleChange("email", event.target.value)
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            label="Dirección"
            value={values.address}
            error={Boolean(errors.address)}
            helperText={errors.address}
            onChange={(event) =>
              handleChange("address", event.target.value)
            }
          />
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button variant="outlined" onClick={onCancel}>
          Cancelar
        </Button>

        <Button
          variant="contained"
          startIcon={<SaveOutlinedIcon />}
          onClick={handleSubmit}
        >
          Guardar cambios
        </Button>
      </Stack>
    </Stack>
  );
}