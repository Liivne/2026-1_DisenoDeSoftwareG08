export interface VaccineResponseDto {
    id: number;
    name: string;
    laboratory: string | null;
    description: string | null;
    stock: number;
}