export interface Appointment {
    id: number;
    vaccine: string;
    date: string;
    time: string;
    location: string;
    professional: string;
    status: AppointmentStatus;
}

export type AppointmentStatus = "Pendiente" | "Confirmada" | "Cancelada";