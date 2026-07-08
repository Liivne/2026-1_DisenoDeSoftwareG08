import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { login, register } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "@/shared/context/SnackbarContext";
import { formatRut } from "@/shared/utils/rut";

export default function LoginPage() {
  const navigate = useNavigate();

  const { loginUser } = useAuth();
  const { showSuccess, showError } = useSnackbar();

  const [isRegister, setIsRegister] = useState(false);

  const [rut, setRut] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  function validate() {
    const e: Record<string, string> = {};

    if (isRegister && !name.trim()) {
      e.name = "El nombre es obligatorio";
    }

    if (isRegister && !rut.trim()) {
      e.rut = "El RUT es obligatorio";
    }

    if (!email.trim()) {
      e.email = "El correo es obligatorio";
    }

    if (!password) {
      e.password = "La contraseña es obligatoria";
    }

    if (isRegister && password !== confirm) {
      e.confirm = "Las contraseñas no coinciden";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev?: React.FormEvent) {
    ev?.preventDefault();

    if (!validate()) {
      return;
    }

    setServerError("");

    try {
      const response = isRegister
        ? await register({
            rut,
            name,
            email,
            password,
            phone: phone || undefined,
          })
        : await login(email, password);

      loginUser(response.accessToken, response.user);

      showSuccess(
        isRegister
          ? "Cuenta creada correctamente."
          : "Sesión iniciada correctamente."
      );

      navigate("/");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : isRegister
            ? "No fue posible crear la cuenta."
            : "No fue posible iniciar sesión.";

      setServerError(message);
      showError(message);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        py: 6,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Stack spacing={2}>
            <Typography variant="h5">
              {isRegister ? "Crear cuenta" : "Iniciar sesión"}
            </Typography>

            {isRegister && (
              <TextField
                label="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
              />
            )}

            {isRegister && (
              <TextField
                fullWidth
                label="RUT"
                value={rut}
                onChange={(e) =>
                  setRut(formatRut(e.target.value))
                }
                error={!!errors.rut}
                helperText={errors.rut}
              />
            )}

            {isRegister && (
              <TextField
                label="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
              />
            )}

            <TextField
              label="Correo electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
            />

            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((value) => !value)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />

            {isRegister && (
              <TextField
                label="Confirmar contraseña"
                type={showPassword ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                error={!!errors.confirm}
                helperText={errors.confirm}
                fullWidth
              />
            )}

            {serverError && (
              <Typography color="error" variant="body2">
                {serverError}
              </Typography>
            )}

            <Button type="submit" variant="contained" fullWidth>
              {isRegister ? "Crear cuenta" : "Entrar"}
            </Button>

            <Button
              variant="text"
              onClick={() => {
                setIsRegister((value) => !value);
                setErrors({});
                setServerError("");
              }}
            >
              {isRegister
                ? "¿Ya tienes cuenta? Inicia sesión"
                : "¿No tienes cuenta? Regístrate"}
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}