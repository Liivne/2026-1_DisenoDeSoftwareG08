import { ReactNode } from "react";

import { Grid } from "@mui/material";

import StatTile from "./StatTile";

export type DashboardStat = {
  title: string;
  value: string | number;
  icon?: ReactNode;
};

type DashboardStatsProps = {
  stats: DashboardStat[];
};

export default function DashboardStats({
  stats,
}: DashboardStatsProps) {
  return (
    <Grid container spacing={2}>
      {stats.map((stat) => (
        <Grid
          key={stat.title}
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <StatTile
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        </Grid>
      ))}
    </Grid>
  );
}