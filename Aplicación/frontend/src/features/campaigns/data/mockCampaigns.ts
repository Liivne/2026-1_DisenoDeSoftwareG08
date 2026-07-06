import { Campaign } from "../types/campaign";

export const mockCampaigns: Campaign[] = [
    {
        id: 1,
        name: "Campaña COVID-19 Bivalente",
        startDate: "2025-04-01",
        endDate: "2025-06-30",
        status: "Activa",
        responsible: "Dra. Ana Martínez",
        vaccine: "Moderna Bivalente",
    },
    {
        id: 2,
        name: "Vacunación Influenza 2025",
        startDate: "2025-03-15",
        endDate: "2025-05-31",
        status: "Activa",
        responsible: "Dr. Carlos Reyes",
        vaccine: "Influvac Tetra",
    },
    {
        id: 3,
        name: "Hepatitis B Adultos",
        startDate: "2025-05-01",
        endDate: "2025-12-31",
        status: "Planificada",
        responsible: "Dra. Sofía Vargas",
        vaccine: "Engerix-B",
    },
    {
        id: 4,
        name: "MMR Campaña Nacional",
        startDate: "2025-01-15",
        endDate: "2025-03-31",
        status: "Finalizada",
        responsible: "Dr. Luis Fernández",
        vaccine: "M-M-RvaxPro",
    },
    {
        id: 5,
        name: "VPH Adolescentes",
        startDate: "2025-06-01",
        endDate: "2025-11-30",
        status: "Planificada",
        responsible: "Dra. Paula Soto",
        vaccine: "Gardasil 9",
    },
];