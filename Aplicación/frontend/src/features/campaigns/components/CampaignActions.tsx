import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { IconButton, Stack, Tooltip } from "@mui/material";

type CampaignActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function CampaignActions({
  onEdit,
  onDelete,
}: CampaignActionsProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="flex-end"
    >
      <Tooltip title="Editar campaña">
        <IconButton
          size="small"
          onClick={onEdit}
          sx={{
            color: "text.secondary",
          }}
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
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}