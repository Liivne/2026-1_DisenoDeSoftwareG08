import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

type CancelAppointmentDialogProps = {
  open: boolean;
  appointmentName?: string;
  appointmentDate?: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function CancelAppointmentDialog({
  open,
  appointmentName,
  appointmentDate,
  onClose,
  onConfirm,
}: CancelAppointmentDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <WarningAmberOutlinedIcon color="warning" />

          <Typography variant="h6" fontWeight={700}>
            Cancelar cita
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={1.5}>
          <Typography>
            ¿Estás seguro de que deseas cancelar esta cita?
          </Typography>

          {appointmentName && (
            <Typography fontWeight={700}>
              {appointmentName}
            </Typography>
          )}

          {appointmentDate && (
            <Typography color="text.secondary">
              Fecha: {appointmentDate}
            </Typography>
          )}

          <Typography variant="body2" color="text.secondary">
            Esta acción liberará el horario seleccionado. Podrás agendar una
            nueva cita más adelante si hay disponibilidad.
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button variant="outlined" onClick={onClose}>
          Volver
        </Button>

        <Button variant="contained" color="error" onClick={onConfirm}>
          Confirmar cancelación
        </Button>
      </DialogActions>
    </Dialog>
  );
}