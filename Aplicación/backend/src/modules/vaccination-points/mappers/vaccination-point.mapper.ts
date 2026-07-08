import { VaccinationPoint } from "@prisma/client";

import { VaccinationPointResponseDto } from "../dto/vaccination-point-response.dto.js";

export function toVaccinationPointResponse(
  point: VaccinationPoint
): VaccinationPointResponseDto {
  return {
    id: point.id,
    name: point.name,
    address: point.address,
    city: point.city,
    commune: point.commune,
  };
}