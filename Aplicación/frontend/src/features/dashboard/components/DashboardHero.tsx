import { Box, Typography } from "@mui/material";

type Props = {
    title: string;
    subtitle: string;
};

export default function DashboardHero({
    title,
    subtitle,
}: Props) {
    return (
        <Box>
            <Typography variant="h4" fontWeight={700}>
                {title}
            </Typography>

            <Typography color="text.secondary">
                {subtitle}
            </Typography>
        </Box>
    );
}