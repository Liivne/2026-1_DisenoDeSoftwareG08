export interface AppointmentResponseDto {
    id: number;
    date: Date;
    status: string;
    campaign: string;
    vaccine: string;
    vaccinationPoint: string;
    address: string;
}