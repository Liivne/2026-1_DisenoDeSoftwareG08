import {
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import CampaignStatusChip from "./CampaignStatusChip";
import CampaignActions from "./CampaignActions";
import type { Campaign } from "../types/campaign";

interface CampaignTableProps {
  campaigns: Campaign[];
  onEdit: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
}

export default function CampaignTable({
  campaigns,
  onEdit,
  onDelete,
}: CampaignTableProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 4,
        boxShadow: 2,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>
              Nombre
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Fecha Inicio
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Fecha Término
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Estado
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Responsable
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Vacuna
            </TableCell>

            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow hover key={campaign.id}>
              <TableCell>{campaign.name}</TableCell>

              <TableCell>{campaign.startDate}</TableCell>

              <TableCell>{campaign.endDate}</TableCell>

              <TableCell>
                <CampaignStatusChip status={campaign.status} />
              </TableCell>

              <TableCell>{campaign.responsible}</TableCell>

              <TableCell>{campaign.vaccine}</TableCell>

              <TableCell align="right">
                <CampaignActions
                  onEdit={() => onEdit(campaign)}
                  onDelete={() => onDelete(campaign)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {campaigns.length} de {campaigns.length} campañas
        </Typography>

        <Pagination page={1} count={3} color="primary" />
      </Stack>
    </TableContainer>
  );
}