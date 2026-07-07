import { Chip } from "@mui/material";

export type CampaignStatus =
  | "Activa"
  | "Planificada"
  | "Finalizada";

interface CampaignStatusChipProps {
  status: CampaignStatus;
}

export default function CampaignStatusChip({
  status,
}: CampaignStatusChipProps) {
  const colors = {
    Activa: {
      bgcolor: "#D8F5E5",
      color: "#138A42",
    },
    Planificada: {
      bgcolor: "#DCE9FF",
      color: "#1F5BD8",
    },
    Finalizada: {
      bgcolor: "#EEF2F6",
      color: "#6B7280",
    },
  };

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        bgcolor: colors[status].bgcolor,
        color: colors[status].color,
        fontWeight: 600,
        borderRadius: "999px",
        minWidth: 110,
      }}
    />
  );
}