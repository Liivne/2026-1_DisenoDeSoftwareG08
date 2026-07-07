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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (isRegister && !name) e.name = "El nombre es obligatorio";
    if (!email) e.email = "El correo es obligatorio";
    if (!password) e.password = "La contraseña es obligatoria";
    if (isRegister && password !== confirm) e.confirm = "Las contraseñas no coinciden";
    if (isRegister && !role) e.role = "Debe seleccionar un rol";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev?: React.FormEvent) {
    ev?.preventDefault();
    if (!validate()) return;

    if (isRegister) {
      window.localStorage.setItem("vaccination.name", name);
      window.localStorage.setItem("vaccination.role", role);
      // Aquí podrías llamar a la API de registro
      // Simulamos registro y vamos al inicio
      navigate("/");
      return;
    }

    window.localStorage.setItem("vaccination.name", name);
    // solucion temporal a falta de backend
    const savedRole = window.localStorage.getItem("vaccination.role") ?? "Paciente";
    window.localStorage.setItem("vaccination.role", savedRole);

    // Aquí podrías llamar a la API de autenticación
    // Simulamos login y redirigimos al inicio
    navigate("/");
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", py: 6 }}>
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }} component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Typography variant="h5">{isRegister ? "Crear cuenta" : "Iniciar sesión"}</Typography>

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
              <FormControl fullWidth error={!!errors.role}>
                <InputLabel>Rol</InputLabel>

                <Select
                  value={role}
                  label="Rol"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value = "Paciente">Paciente</MenuItem>
                  <MenuItem value = "Personal de Salud">Personal de Salud</MenuItem>
                  <MenuItem value = "Administrador">Administrador</MenuItem>
                </Select>

                {!!errors.role && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ml: 2, mt: 0.5}}
                    >
                      {errors.role}
                    </Typography>
                )}
              </FormControl>
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
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
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
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
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
