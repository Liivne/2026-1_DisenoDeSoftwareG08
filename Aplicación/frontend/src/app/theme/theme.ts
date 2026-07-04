import { createTheme } from "@mui/material/styles";

import { breakpoints } from "./breakpoints";
import { colors } from "./colors";
import { components } from "./components";
import { typography } from "./typography";

export const theme = createTheme({
	palette: colors,
	typography,
	breakpoints,
	components,
	shape: {
		borderRadius: 16,
	},
});
