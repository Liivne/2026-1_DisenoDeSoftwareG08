import { ReactNode } from "react";

import {
  Paper,
  Stack,
  Typography,
} from "@mui/material";

type StatTileProps = {
  title: string;
  value: string | number;
  icon?: ReactNode;
};

export default function StatTile({
  title,
  value,
  icon,
}: StatTileProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
        minHeight: 120,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transition: "all .2s ease",

        "&:hover": {
          boxShadow: 2,
        },
      }}
    >
      <Stack spacing={1}>
        {icon}

        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>

        <Typography variant="h6" fontWeight={700}>
          {value}
        </Typography>
      </Stack>
    </Paper>
  );
}