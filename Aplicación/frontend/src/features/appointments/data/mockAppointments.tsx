import { Appointment } from "../types/appointment";


export const mockAppointments: Appointment[] = [

  {
    id: 1,
    vaccine: "Influenza",
    date: "12 Agosto 2026",
    time: "09:30",
    location: "CESFAM San Pedro",
    professional: "Dra. Laura Méndez",
    status: "Confirmada",
  },

  {
    id: 2,
    vaccine: "COVID-19 Refuerzo",
    date: "30 Agosto 2026",
    time: "16:00",
    location: "Hospital Regional",
    professional: "Dr. Felipe Soto",
    status: "Pendiente",
  },

  {
    id: 3,
    vaccine: "Hepatitis B",
    date: "10 Junio 2026",
    time: "11:00",
    location: "CESFAM Norte",
    professional: "Dra. Carolina Pérez",
    status: "Cancelada",
  },

];