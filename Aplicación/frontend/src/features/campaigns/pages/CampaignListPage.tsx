import { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import CampaignToolbar from "../components/CampaignToolbar";
import CampaignTable from "../components/CampaignTable";
import DeleteCampaignDialog from "../components/DeleteCampaignDialog";

import { mockCampaigns } from "../data/mockCampaigns";
import type { Campaign } from "../types/campaign";

export default function CampaignListPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [selectedCampaign, setSelectedCampaign] =
    useState<Campaign | null>(null);

  const filteredCampaigns = useMemo(() => {
    if (!search.trim()) {
      return campaigns;
    }

    const value = search.toLowerCase();

    return campaigns.filter(
      (campaign) =>
        campaign.name.toLowerCase().includes(value) ||
        campaign.responsible.toLowerCase().includes(value) ||
        campaign.vaccine.toLowerCase().includes(value)
    );
  }, [campaigns, search]);

  const handleEditCampaign = (campaign: Campaign) => {
    navigate(`/campaigns/${campaign.id}/edit`);
  };

  const handleDeleteCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedCampaign(null);
  };

  const handleConfirmDelete = () => {
    if (!selectedCampaign) return;

    setCampaigns((currentCampaigns) =>
      currentCampaigns.filter(
        (campaign) => campaign.id !== selectedCampaign.id
      )
    );

    setSelectedCampaign(null);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
        }}
      >
        Gestión de Campañas
      </Typography>

      <CampaignToolbar
        search={search}
        onSearchChange={setSearch}
        onFilter={() => console.log("Abrir filtros")}
        onCreate={() => navigate("/campaigns/new")}
      />

      <CampaignTable
        campaigns={filteredCampaigns}
        onEdit={handleEditCampaign}
        onDelete={handleDeleteCampaign}
      />

      <DeleteCampaignDialog
        open={Boolean(selectedCampaign)}
        campaignName={selectedCampaign?.name}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}