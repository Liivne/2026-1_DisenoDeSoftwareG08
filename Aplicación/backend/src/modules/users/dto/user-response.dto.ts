import { Role } from "@prisma/client";

export interface UserResponseDto {
    id: number;
    rut: string;
    name: string;
    email: string;
    phone: string | null;
    role: Role;
}