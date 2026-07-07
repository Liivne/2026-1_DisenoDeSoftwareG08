import { ReactNode } from "react";

import { Grid } from "@mui/material";

import MetricCard from "./MetricCard";

export type DashboardMetric = {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
};

type DashboardMetricsProps = {
  metrics: DashboardMetric[];
};

export default function DashboardMetrics({
  metrics,
}: DashboardMetricsProps) {
  return (
    <Grid container spacing={3}>
      {metrics.map((metric) => (
        <Grid
          key={metric.title}
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <MetricCard
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            color={metric.color}
          />
        </Grid>
      ))}
    </Grid>
  );
}