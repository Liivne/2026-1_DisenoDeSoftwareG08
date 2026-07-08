export interface VaccinationPointResponseDto {
  id: number;
  name: string;
  address: string;
  city: string | null;
  commune: string | null;
}