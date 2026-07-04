// app/theme/components.ts

import { Components, Theme } from "@mui/material/styles";

export const components: Components<Theme> = {

    MuiButton: {

        defaultProps: {

            disableElevation: true,

        },

        styleOverrides: {

            root: {

                borderRadius: 12,

                padding: "10px 20px",

                fontWeight: 600,

            },

        },

    },

    MuiCard: {

        styleOverrides: {

            root: {

                borderRadius: 16,

            },

        },

    },

    MuiTextField: {

        defaultProps: {

            fullWidth: true,

            variant: "outlined" as const,

        },

    },

    MuiPaper: {

        styleOverrides: {

            root: {

                borderRadius: 16,

            },

        },

    },

};