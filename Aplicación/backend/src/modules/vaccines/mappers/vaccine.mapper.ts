import { Vaccine } from "@prisma/client";
import { VaccineResponseDto } from "../dto/vaccine-response.dto.js";

export function toVaccineResponse(vaccine: Vaccine): VaccineResponseDto {
    return {
        id: vaccine.id,
        name: vaccine.name,
        laboratory: vaccine.laboratory,
        description: vaccine.description,
        stock: vaccine.stock,
    };
}