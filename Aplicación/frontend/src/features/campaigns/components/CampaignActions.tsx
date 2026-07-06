import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import {
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";

interface CampaignActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function CampaignActions({
  onEdit,
  onDelete,
}: CampaignActionsProps) {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      justifyContent="center"
    >
      <Tooltip title="Editar campaña">
        <IconButton
          size="small"
          onClick={onEdit}
        >
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Eliminar campaña">
        <IconButton
          size="small"
          color="error"
          onClick={onDelete}
        >
          <DeleteOutlineOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}