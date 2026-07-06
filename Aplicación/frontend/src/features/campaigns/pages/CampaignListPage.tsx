import { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import CampaignToolbar from "../components/CampaignToolbar";
import CampaignTable from "../components/CampaignTable";

import { mockCampaigns } from "../data/mockCampaigns";

export default function CampaignListPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filteredCampaigns = useMemo(() => {
    if (!search.trim()) {
      return mockCampaigns;
    }

    const value = search.toLowerCase();

    return mockCampaigns.filter(
      (campaign) =>
        campaign.name.toLowerCase().includes(value) ||
        campaign.responsible.toLowerCase().includes(value) ||
        campaign.vaccine.toLowerCase().includes(value)
    );
  }, [search]);

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
      />
    </Box>
  );
}