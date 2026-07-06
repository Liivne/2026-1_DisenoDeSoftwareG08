import React from "react";

export interface MetricCardData {
  title: string;
  value: string;
  delta: string;
  icon: React.ReactNode;
}