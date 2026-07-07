import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

type PasswordValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type PasswordErrors = Partial<Record<keyof PasswordValues, string>>;

type ChangePasswordDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const initialValues: PasswordValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function ChangePasswordDialog({
  open,
  onClose,
  onConfirm,
}: ChangePasswordDialogProps) {
  const [values, setValues] = useState<PasswordValues>(initialValues);
  const [errors, setErrors] = useState<PasswordErrors>({});

  const handleChange = (
    field: keyof PasswordValues,
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
    const newErrors: PasswordErrors = {};

    if (!values.currentPassword) {
      newErrors.currentPassword = "Ingresa tu contraseña actual.";
    }

    if (!values.newPassword) {
      newErrors.newPassword = "Ingresa una nueva contraseña.";
    }

    if (values.newPassword && values.newPassword.length < 8) {
      newErrors.newPassword =
        "La nueva contraseña debe tener al menos 8 caracteres.";
    }

    if (!values.confirmPassword) {
      newErrors.confirmPassword = "Confirma la nueva contraseña.";
    }

    if (
      values.newPassword &&
      values.confirmPassword &&
      values.newPassword !== values.confirmPassword
    ) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (!validate()) return;

    onConfirm();
    setValues(initialValues);
    setErrors({});
  };

  const handleClose = () => {
    setValues(initialValues);
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <LockResetOutlinedIcon color="primary" />

          <Typography variant="h6" fontWeight={700}>
            Cambiar contraseña
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            fullWidth
            required
            type="password"
            label="Contraseña actual"
            value={values.currentPassword}
            error={Boolean(errors.currentPassword)}
            helperText={errors.currentPassword}
            onChange={(event) =>
              handleChange("currentPassword", event.target.value)
            }
          />

          <TextField
            fullWidth
            required
            type="password"
            label="Nueva contraseña"
            value={values.newPassword}
            error={Boolean(errors.newPassword)}
            helperText={errors.newPassword}
            onChange={(event) =>
              handleChange("newPassword", event.target.value)
            }
          />

          <TextField
            fullWidth
            required
            type="password"
            label="Confirmar nueva contraseña"
            value={values.confirmPassword}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
            onChange={(event) =>
              handleChange("confirmPassword", event.target.value)
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancelar
        </Button>

        <Button variant="contained" onClick={handleConfirm}>
          Guardar contraseña
        </Button>
      </DialogActions>
    </Dialog>
  );
}