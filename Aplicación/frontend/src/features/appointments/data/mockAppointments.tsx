import { Appointment } from "../types/appointment";


export const mockAppointments: Appointment[] = [

  {
    id: 1,
    vaccine: "Influenza",
    date: "12 Agosto 2026",
    time: "09:30",
    location: "CESFAM San Pedro",
    status: "Confirmada",
  },

  {
    id: 2,
    vaccine: "COVID-19 Refuerzo",
    date: "30 Agosto 2026",
    time: "16:00",
    location: "Hospital Regional",
    status: "Planificada",
  },

  {
    id: 3,
    vaccine: "Hepatitis B",
    date: "10 Junio 2026",
    time: "11:00",
    location: "CESFAM Norte",
    status: "Cancelada",
  },

  {
    id: 4,
    vaccine: "VPH",
    date: "20 Julio 2026",
    time: "14:00",
    location: "CESFAM Sur",
    status: "Completada",
  },
];

export const initialAppointments: Appointment[] = [
  {
    id: 1,
    vaccine: "Influenza",
    date: "15 Julio 2026",
    time: "09:30",
    location: "CESFAM Norte",
    status: "Confirmada",
  },
  {
    id: 2,
    vaccine: "COVID-19 Refuerzo",
    date: "20 Agosto 2026",
    time: "11:00",
    location: "Hospital Regional",
    status: "Planificada",
  },
];
