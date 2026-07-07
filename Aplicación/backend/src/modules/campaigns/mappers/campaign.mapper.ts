import { Prisma } from "@prisma/client";
import { CampaignResponseDto } from "../dto/campaign-response.dto.js";

type CampaignWithVaccine = Prisma.CampaignGetPayload<{
  include: {
    vaccine: true;
  };
}>;

export function toCampaignResponse(
  campaign: CampaignWithVaccine
): CampaignResponseDto {
  return {
    id: campaign.id,
    name: campaign.name,
    description: campaign.description,
    startDate: campaign.startDate,
    endDate: campaign.endDate,
    active: campaign.active,
    vaccine: {
      id: campaign.vaccine.id,
      name: campaign.vaccine.name,
    },
  };
}