import AddIcon from "@mui/icons-material/Add";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import SearchIcon from "@mui/icons-material/Search";

import {
  Button,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";

interface CampaignToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onFilter?: () => void;
  onCreate?: () => void;
}

export default function CampaignToolbar({
  search,
  onSearchChange,
  onFilter,
  onCreate,
}: CampaignToolbarProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
    >
      <Stack
        direction="row"
        spacing={2}
      >
        <TextField
          size="small"
          placeholder="Buscar campañas..."
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          sx={{
            width: 320,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="outlined"
          startIcon={<FilterListOutlinedIcon />}
          onClick={onFilter}
        >
          Filtrar
        </Button>
      </Stack>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onCreate}
      >
        Nueva Campaña
      </Button>
    </Stack>
  );
}