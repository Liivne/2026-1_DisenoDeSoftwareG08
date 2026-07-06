import { Icon, Stack } from "@mui/material";
import DashboardHero from "../../components/DashboardHero";
import { DashboardStats } from "../../components/DashboardStats";
import DashboardChart from "../../components/DashboardChart";
import { DashboardData } from "../../types";

const dashboard: DashboardData = {

  title: "...",

  subtitle: "...",

  stats: [
    //mock data for the stats cards
    {
      label: "Total Users",
      value: "1,234",
      delta: "+12%",
      tone: "primary",
      icon: <Icon/>
    },
    {
      label: "Total Revenue",
      value: "$56,789",
      delta: "+5%",
      tone: "success",
      icon: <Icon />
    }
  ],

  chartTitle: "...",

  chartSubtitle: "...",

  chartData: [
    {
      label: "January",
      value: 100,
      color: "#1565C0"
    }
  ],

  metrics: [
    {
      title: "Metric 1",
      value: "Value 1",
      delta: "+10%",
      icon: <Icon />
    },
    {
      title: "Metric 2",
      value: "Value 2",
      delta: "-5%",
      icon: <Icon />
    }
  ],

  tableTitle: "...",

  tableHead: [
    // mock data for the table head
    "Column 1",
    "Column 2",
    "Column 3"
  ],

  tableRows: [
    // mock data for the table rows
    { cells: ["Row 1, Col 1", "Row 1, Col 2", "Row 1, Col 3"] },
    { cells: ["Row 2, Col 1", "Row 2, Col 2", "Row 2, Col 3"] }
  ],

  alerts: [
    // mock data for the alerts
    "Alert 1: This is an important alert.",
    "Alert 2: This is another important alert."
  ],
};

export default function AdminDashboard() {
    return (
        <Stack spacing={3}>
            <DashboardHero
                title={dashboard.title}
                subtitle={dashboard.subtitle}
            /><DashboardStats
                stats={dashboard.stats}
            /><DashboardChart
            />
        </Stack>
    );
}