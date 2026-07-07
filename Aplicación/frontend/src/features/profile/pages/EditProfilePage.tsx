import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {
  Alert,
  Avatar,
  Button,
  Grid,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";

import ChangePasswordDialog from "../components/ChangePasswordDialog";
import ProfileAvatar from "../components/ProfileAvatar";
import ProfileForm, {
  type ProfileFormValues,
} from "../components/ProfileForm";

export default function EditProfilePage() {
  const navigate = useNavigate();

  const [successOpen, setSuccessOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  const userName =
    localStorage.getItem("vaccination.name") ?? "María Fernanda Ruiz";

  const initialValues: ProfileFormValues = {
    name: userName,
    phone: "+56 9 1234 5678",
    email: "maria.ruiz@email.com",
    address: "Av. Siempre Viva 123",
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = (values: ProfileFormValues) => {
    localStorage.setItem("vaccination.name", values.name);

    setSuccessOpen(true);

    setTimeout(() => {
      navigate("/dashboard");
    }, 1200);
  };

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
            <Avatar
              sx={{
                width: 72,
                height: 72,
                bgcolor: "rgba(255,255,255,0.18)",
              }}
            >
              <PersonOutlineIcon sx={{ fontSize: 42 }} />
            </Avatar>

            <Stack spacing={0.5}>
              <Typography variant="h4" fontWeight={700}>
                Editar perfil
              </Typography>

              <Typography sx={{ opacity: 0.9 }}>
                Actualiza tus datos personales editables y opciones de cuenta.
              </Typography>
            </Stack>
          </Stack>
        </Paper>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
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
              <ProfileAvatar name={userName} />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Stack spacing={3}>
                <Typography variant="h6" fontWeight={700}>
                  Datos editables
                </Typography>

                <ProfileForm
                  initialValues={initialValues}
                  onCancel={handleCancel}
                  onSubmit={handleSubmit}
                />

                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: "grey.50",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    El RUT, rol y otros datos únicos de identificación no se
                    pueden modificar desde esta pantalla.
                  </Typography>
                </Paper>

                <Button
                  variant="outlined"
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
          Cambios guardados correctamente.
        </Alert>
      </Snackbar>
    </>
  );
}