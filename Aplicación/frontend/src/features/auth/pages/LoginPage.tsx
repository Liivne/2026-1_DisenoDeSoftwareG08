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
  Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../api/client";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [rut, setRut] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  function validate() {
    const e: Record<string, string> = {};
    if (isRegister && !rut) e.rut = "El RUT es obligatorio";
    if (isRegister && !name) e.name = "El nombre es obligatorio";
    if (!email) e.email = "El correo es obligatorio";
    if (!password) e.password = "La contraseña es obligatoria";
    if (isRegister && password !== confirm) e.confirm = "Las contraseñas no coinciden";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev?: React.FormEvent) {
    ev?.preventDefault();
    if (!validate()) return;
    setServerError("");

    try {
      if (isRegister) {
        const response = await apiClient.post("/auth/register", { rut, name, email, password });
        localStorage.setItem("vaccination.token", response.data.accessToken);
        localStorage.setItem("vaccination.name", response.data.user.name);
        localStorage.setItem("vaccination.role", response.data.user.role);
        navigate("/");
      } else {
        const response = await apiClient.post("/auth/login", { email, password });
        localStorage.setItem("vaccination.token", response.data.accessToken);
        localStorage.setItem("vaccination.name", response.data.user.name);
        localStorage.setItem("vaccination.role", response.data.user.role);
        navigate("/");
      }
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const issues = error.response.data.errors.map((err: any) => err.message).join(", ");
        setServerError(`Datos inválidos: ${issues}`);
      } else {
        setServerError(error.response?.data?.message || "Ocurrió un error al procesar la solicitud.");
      }
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", py: 6 }}>
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }} component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Typography variant="h5">{isRegister ? "Crear cuenta" : "Iniciar sesión"}</Typography>

            {serverError && <Alert severity="error">{serverError}</Alert>}

            {isRegister && (
              <TextField
                label="RUT"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                error={!!errors.rut}
                helperText={errors.rut}
                fullWidth
              />
            )}

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
                      onClick={() => setShowPassword((value) => !value)}
                      edge="end"
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((value) => !value)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            )}

            <Button type="submit" variant="contained" fullWidth>
              {isRegister ? "Crear cuenta" : "Entrar"}
            </Button>

            <Button variant="text" onClick={() => setIsRegister((s) => !s)}>
              {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
