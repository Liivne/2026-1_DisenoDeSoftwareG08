import type { StatCard, SecondaryCard } from "./cards";
import type { TableRowItem } from "./table";

export interface RoleDashboard {
    title: string;
    subtitle: string;
    stats: StatCard[];
    alerts: string[];
    quickActions: string[];
    chartTitle: string;
    chartLegend: string;
    chartData: { label: string; value: number; color: string }[];
    tableTitle: string;
    tableHead: string[];
    tableRows: TableRowItem[];
    secondaryCards: SecondaryCard[];
}