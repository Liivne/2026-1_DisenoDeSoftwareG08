// app/theme/typography.ts

export const typography = {
    fontFamily: `"Plus Jakarta Sans", "Roboto", sans-serif`,

    h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
        lineHeight: 1.2,
    },

    h2: {
        fontSize: "2rem",
        fontWeight: 700,
        lineHeight: 1.3,
    },

    h3: {
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1.3,
    },

    h4: {
        fontSize: "1.25rem",
        fontWeight: 600,
    },

    h5: {
        fontSize: "1.1rem",
        fontWeight: 600,
    },

    h6: {
        fontSize: "1rem",
        fontWeight: 600,
    },

    body1: {
        fontSize: "1rem",
    },

    body2: {
        fontSize: ".875rem",
    },

    button: {
        fontWeight: 600,
        textTransform: "none" as const,
    },
};