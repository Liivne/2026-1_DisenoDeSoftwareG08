import { ChartData } from "./chart";
import { MetricCardData } from "./metricCard";
import { DashboardStat } from "./stat";
import { DashboardTableRow } from "./table";

export interface DashboardData {
  title: string;
  subtitle: string;

  stats: DashboardStat[];

  chartTitle: string;
  chartSubtitle: string;
  chartData: ChartData[];

  metrics: MetricCardData[];

  tableTitle: string;
  tableHead: string[];
  tableRows: DashboardTableRow[];

  alerts: string[];
}