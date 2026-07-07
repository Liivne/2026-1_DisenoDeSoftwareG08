export interface Appointment {
    id: number;
    vaccine: string;
    date: string;
    time: string;
    location: string;
    status: AppointmentStatus;
}

export type AppointmentStatus = "Planificada" | "Confirmada" | "Cancelada" | "Completada";