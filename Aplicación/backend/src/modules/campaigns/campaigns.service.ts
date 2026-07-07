import { NotFoundError } from "../../shared/errors/NotFoundError.js";

import campaignsRepository from "./campaigns.repository.js";
import { toCampaignResponse } from "./mappers/campaign.mapper.js";

type CreateCampaignInput = {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  active?: boolean;
  vaccineId: number;
};

type UpdateCampaignInput = Partial<CreateCampaignInput>;

export class CampaignsService {
  async getCampaigns() {
    const campaigns = await campaignsRepository.findAll();

    return campaigns.map(toCampaignResponse);
  }

  async getActiveCampaigns() {
    const campaigns = await campaignsRepository.findActive();

    return campaigns.map(toCampaignResponse);
  }

  async getCampaignById(id: number) {
    const campaign = await campaignsRepository.findById(id);

    if (!campaign) {
      throw new NotFoundError("La campaña no existe.");
    }

    return toCampaignResponse(campaign);
  }

  async createCampaign(data: CreateCampaignInput) {
    const campaign = await campaignsRepository.create(data);

    return toCampaignResponse(campaign);
  }

  async updateCampaign(id: number, data: UpdateCampaignInput) {
    await this.getCampaignById(id);

    const campaign = await campaignsRepository.update(id, data);

    return toCampaignResponse(campaign);
  }

  async deleteCampaign(id: number) {
    await this.getCampaignById(id);

    await campaignsRepository.delete(id);

    return {
      message: "Campaña eliminada correctamente.",
    };
  }
}

export default new CampaignsService();