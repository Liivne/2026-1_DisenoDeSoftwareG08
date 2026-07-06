import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate } from "react-router-dom";
import CampaignTable from "../components/CampaignTable";

export default function CampaignListPage() {
  const navigate = useNavigate();

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        Gestión de Campañas
      </Typography>

      <Stack
        direction="row"
        justifyContent="space-between"
        mb={3}
      >
        <Stack direction="row" spacing={2}>
          <TextField
            placeholder="Buscar campañas..."
            size="small"
            sx={{ width: 320 }}
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
            startIcon={<FilterListIcon />}
          >
            Filtrar
          </Button>
        </Stack>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/campaigns/new")}
        >
          Nueva Campaña
        </Button>
      </Stack>

      <Paper>
        <CampaignTable />
      </Paper>
    </Box>
  );
}