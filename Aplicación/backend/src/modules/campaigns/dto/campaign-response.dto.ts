export interface CampaignResponseDto {
    id: number;
    name: string;
    description: string | null;
    startDate: Date;
    endDate: Date;
    active: boolean;
    vaccine: {
        id: number;
        name: string;
    };
}