export interface VaccinationRecordResponseDto {
  id: number;
  doseNumber: number;
  appliedAt: Date;
  notes: string | null;

  user: {
    id: number;
    rut: string;
    name: string;
  };

  vaccine: {
    id: number;
    name: string;
  };

  appointment: {
    id: number;
    date: Date;
    status: string;
    vaccinationPoint: string;
    campaign: string;
  };
}