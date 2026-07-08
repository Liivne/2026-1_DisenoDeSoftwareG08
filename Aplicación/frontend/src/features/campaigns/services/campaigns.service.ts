import { apiFetch } from "@/app/api";
import type { Campaign } from "../types/campaign";

type ApiCampaign = {
  id: number;
  name: string;
  description: string | null;
  startDate: string;
  endDate: string;
  active: boolean;
  vaccine: {
    id: number;
    name: string;
  };
};

export type CampaignPayload = {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  active?: boolean;
  vaccineId: number;
};

function mapCampaignFromApi(campaign: ApiCampaign): Campaign {
  return {
    id: campaign.id,
    name: campaign.name,
    startDate: campaign.startDate.split("T")[0],
    endDate: campaign.endDate.split("T")[0],
    status: campaign.active ? "Activa" : "Planificada",
    responsible: "Administrador",
    vaccine: campaign.vaccine.name,
  };
}

export async function getCampaigns() {
  const campaigns = await apiFetch<ApiCampaign[]>("/campaigns");

  return campaigns.map(mapCampaignFromApi);
}

export async function getCampaignById(id: number) {
  const campaign = await apiFetch<ApiCampaign>(`/campaigns/${id}`);

  return mapCampaignFromApi(campaign);
}

export function createCampaign(data: CampaignPayload) {
  return apiFetch<ApiCampaign>("/campaigns", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateCampaign(
  id: number,
  data: Partial<CampaignPayload>
) {
  return apiFetch<ApiCampaign>(`/campaigns/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteCampaign(id: number) {
  return apiFetch(`/campaigns/${id}`, {
    method: "DELETE",
  });
}