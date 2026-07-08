import prisma from "../../config/prisma.js";

const campaignInclude = {
  vaccine: true,
};

type CreateCampaignData = {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  active?: boolean;
  vaccineId: number;
};

type UpdateCampaignData = Partial<CreateCampaignData>;

export class CampaignsRepository {
  async findAll() {
    return prisma.campaign.findMany({
      orderBy: { id: "asc" },
      include: campaignInclude,
    });
  }

  async findActive() {
    return prisma.campaign.findMany({
      where: { active: true },
      orderBy: { startDate: "asc" },
      include: campaignInclude,
    });
  }

  async findById(id: number) {
    return prisma.campaign.findUnique({
      where: { id },
      include: campaignInclude,
    });
  }

  async create(data: CreateCampaignData) {
    return prisma.campaign.create({
      data,
      include: campaignInclude,
    });
  }

  async update(id: number, data: UpdateCampaignData) {
    return prisma.campaign.update({
      where: { id },
      data,
      include: campaignInclude,
    });
  }

  async delete(id: number) {
    return prisma.campaign.delete({
      where: { id },
    });
  }
}

export default new CampaignsRepository();