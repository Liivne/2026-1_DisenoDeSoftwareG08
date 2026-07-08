import { useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import CampaignToolbar from "../components/CampaignToolbar";
import CampaignTable from "../components/CampaignTable";
import DeleteCampaignDialog from "../components/DeleteCampaignDialog";

import type { Campaign } from "../types/campaign";
import {
  deleteCampaign,
  getCampaigns,
} from "../services/campaigns.service";
import { useSnackbar } from "@/shared/context/SnackbarContext";

export default function CampaignListPage() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useSnackbar();

  const [search, setSearch] = useState("");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCampaign, setSelectedCampaign] =
    useState<Campaign | null>(null);

  useEffect(() => {
    async function loadCampaigns() {
      try {
        setLoading(true);
        setError("");

        const data = await getCampaigns();

        setCampaigns(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "No fue posible cargar las campañas."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCampaigns();
  }, []);

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

  const handleConfirmDelete = async () => {
    if (!selectedCampaign) return;

    try {
      await deleteCampaign(selectedCampaign.id);

      setCampaigns((currentCampaigns) =>
        currentCampaigns.filter(
          (campaign) => campaign.id !== selectedCampaign.id
        )
      );

      showSuccess("Campaña eliminada correctamente.");
      setSelectedCampaign(null);
    } catch {
      showError("No fue posible eliminar la campaña.");
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Gestión de Campañas
      </Typography>

      <CampaignToolbar
        search={search}
        onSearchChange={setSearch}
        onFilter={() => console.log("Abrir filtros")}
        onCreate={() => navigate("/campaigns/new")}
      />

      {loading && <CircularProgress />}

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <CampaignTable
          campaigns={filteredCampaigns}
          onEdit={handleEditCampaign}
          onDelete={handleDeleteCampaign}
        />
      )}

      <DeleteCampaignDialog
        open={Boolean(selectedCampaign)}
        campaignName={selectedCampaign?.name}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}