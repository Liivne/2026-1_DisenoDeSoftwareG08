import type { ReactNode } from "react";

export type StatCard = {
  label: string;
  value: string;
  delta: string;
  tone: "primary" | "success" | "info" | "warning";
  icon: ReactNode;
}

export interface SecondaryCard {
    title: string;
    value: string;
    helper: string;
    icon: ReactNode;
}