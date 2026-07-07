export type VaccinationHistoryItem = {
    id: number;
    vaccine: string;
    dose: string;
    date: string;
    displayDate: string;
    center: string;
    status: "Aplicada";
};

export type VaccinationHistoryFilters = {
    vaccine: string;
    center: string;
    dateFrom: string;
    dateTo: string;
}