import bcrypt from "bcrypt";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    //
    // Usuarios
    //

    const password = await bcrypt.hash("123456", 10);

    const admin = await prisma.user.upsert({
        where: {
            email: "admin@example.com",
        },
        update: {},
        create: {
            rut: "11111111-1",
            name: "Administrador",
            email: "admin@example.com",
            password,
            role: Role.ADMINISTRADOR,
        },
    });

    const patient = await prisma.user.upsert({
        where: {
            email: "maria@example.com",
        },
        update: {},
        create: {
            rut: "12345678-9",
            name: "María Fernanda Ruiz",
            email: "maria@example.com",
            password,
            role: Role.PACIENTE,
        },
    });

    //
    // Vacuna
    //

    const influenza = await prisma.vaccine.upsert({
        where: {
            id: 1,
        },
        update: {},
        create: {
            name: "Influenza",
            laboratory: "Pfizer",
            stock: 500,
        },
    });

    //
    // Campaña
    //

    const campaign = await prisma.campaign.upsert({
        where: {
            id: 1,
        },
        update: {},
        create: {
            name: "Campaña Influenza 2026",

            startDate: new Date("2026-07-01"),

            endDate: new Date("2026-08-31"),

            active: true,

            vaccineId: influenza.id,
        },
    });

    //
    // Punto de vacunación
    //

    const cesfam = await prisma.vaccinationPoint.upsert({
        where: {
            id: 1,
        },
        update: {},
        create: {
            name: "CESFAM Central",

            address: "Av. Principal 123",

            city: "Santiago",

            commune: "Santiago Centro",
        },
    });

    console.log("Seed ejecutado correctamente.");
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });