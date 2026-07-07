import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import type { NotificationFilter } from "../types/notification";

type Props = {
  value: NotificationFilter;
  onChange: (value: NotificationFilter) => void;
};

export default function NotificationFilters({
  value,
  onChange,
}: Props) {
  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: NotificationFilter | null,
  ) => {
    if (newValue) {
      onChange(newValue);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography
        variant="h6"
        fontWeight={700}
      >
        Filtrar notificaciones
      </Typography>

      <ToggleButtonGroup
        exclusive
        value={value}
        onChange={handleChange}
        size="small"
      >
        <ToggleButton value="all">
          Todas
        </ToggleButton>

        <ToggleButton value="unread">
          No leídas
        </ToggleButton>

        <ToggleButton value="important">
          Importantes
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}