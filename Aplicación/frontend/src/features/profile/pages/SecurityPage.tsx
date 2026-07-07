import { useState } from "react";

import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import {
  Alert,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";

import ChangePasswordDialog from "../components/ChangePasswordDialog";

export default function SecurityPage() {
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handlePasswordConfirm = () => {
    setPasswordDialogOpen(false);
    setSuccessOpen(true);
  };

  return (
    <>
      <Stack spacing={3}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            background: "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)",
            color: "white",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.18)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <SecurityOutlinedIcon sx={{ fontSize: 42 }} />
            </Box>

            <Stack spacing={0.5}>
              <Typography variant="h4" fontWeight={700}>
                Seguridad de la cuenta
              </Typography>

              <Typography sx={{ opacity: 0.9 }}>
                Administra tu contraseña y revisa la actividad de tu sesión.
              </Typography>
            </Stack>
          </Stack>
        </Paper>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <Stack spacing={2}>
                <Typography variant="h6" fontWeight={700}>
                  Contraseña
                </Typography>

                <Typography color="text.secondary">
                  Cambia tu contraseña periódicamente para mantener tu cuenta
                  protegida.
                </Typography>

                <Button
                  variant="contained"
                  startIcon={<LockResetOutlinedIcon />}
                  onClick={() => setPasswordDialogOpen(true)}
                  sx={{ alignSelf: "flex-start" }}
                >
                  Cambiar contraseña
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Stack>

      <ChangePasswordDialog
        open={passwordDialogOpen}
        onClose={() => setPasswordDialogOpen(false)}
        onConfirm={handlePasswordConfirm}
      />

      <Snackbar
        open={successOpen}
        autoHideDuration={1200}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert severity="success" variant="filled">
          Contraseña actualizada correctamente.
        </Alert>
      </Snackbar>
    </>
  );
}