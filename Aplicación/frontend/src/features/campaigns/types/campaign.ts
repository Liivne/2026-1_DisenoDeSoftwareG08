export interface Campaign {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    status: "Activa" | "Planificada" | "Finalizada";
    responsible: string;
    vaccine: string;
}