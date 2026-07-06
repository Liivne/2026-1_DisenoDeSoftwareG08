import { DashboardStat } from "@features/dashboard/types";
import Stack from "@mui/material/Stack";

interface DashboardStats {
    stats: DashboardStat[];
}

export const DashboardStats: React.FC<DashboardStats> = ({ stats }) => {
    return (
        <Stack direction="row" spacing={2} justifyContent="space-between">
            {stats.map((stat, index) => (
                <div key={index} style={{ flex: 1, textAlign: "center" }}>
                    <div>{stat.icon}</div>
                    <div>{stat.label}</div>
                    <div>{stat.value}</div>
                    <div>{stat.delta}</div>
                </div>
            ))}
        </Stack>
    );
}