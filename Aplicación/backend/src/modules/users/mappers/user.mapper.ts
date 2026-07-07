import { User } from "@prisma/client";
import { UserResponseDto } from "../dto/user-response.dto.js";

export function toUserResponse(
    user: User
): UserResponseDto {
    return {
        id: user.id,
        rut: user.rut,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
    };
}