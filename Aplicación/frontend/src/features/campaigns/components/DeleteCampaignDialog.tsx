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

type DeleteCampaignDialogProps = {
  open: boolean;
  campaignName?: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteCampaignDialog({
  open,
  campaignName,
  onClose,
  onConfirm,
}: DeleteCampaignDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <WarningAmberOutlinedIcon color="warning" />

          <Typography variant="h6" fontWeight={700}>
            Eliminar campaña
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={1.5}>
          <Typography>
            ¿Estás seguro de que deseas eliminar esta campaña?
          </Typography>

          {campaignName && (
            <Typography fontWeight={700}>
              {campaignName}
            </Typography>
          )}

          <Typography variant="body2" color="text.secondary">
            Esta acción no se puede deshacer. Si la campaña tiene citas,
            registros o vacunas asociadas, primero deberías revisar sus
            dependencias.
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button variant="outlined" onClick={onClose}>
          Volver
        </Button>

        <Button variant="contained" color="error" onClick={onConfirm}>
          Eliminar campaña
        </Button>
      </DialogActions>
    </Dialog>
  );
}