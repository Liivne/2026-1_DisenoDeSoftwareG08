import React from "react";

export type StatTone =
  | "primary"
  | "success"
  | "info"
  | "warning"
  | "error";

export interface DashboardStat {
  label: string;
  value: string;
  delta: string;
  tone: StatTone;
  icon: React.ReactNode;
}