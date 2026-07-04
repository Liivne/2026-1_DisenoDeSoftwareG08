import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Container,
	Stack,
	Typography,
} from "@mui/material";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

const highlights = [
	{
		title: "Agenda centralizada",
		description: "Consulta cupos y disponibilidad desde una interfaz uniforme.",
		icon: <CalendarMonthIcon />,
	},
	{
		title: "Diseño consistente",
		description: "Tema MUI reutilizable con tipografía, color y componentes base.",
		icon: <HealthAndSafetyIcon />,
	},
	{
		title: "Escalabilidad limpia",
		description: "Estructura lista para crecer sin mezclar lógica visual y routing.",
		icon: <VaccinesIcon />,
	},
];

function App() {
	return (
		<Box
			sx={{
				minHeight: "100vh",
				background:
					"radial-gradient(circle at top left, rgba(25,118,210,0.16), transparent 34%), linear-gradient(180deg, #f6f9fc 0%, #ffffff 100%)",
				py: { xs: 6, md: 10 },
			}}
		>
			<Container maxWidth="lg">
				<Stack spacing={5}>
					<Stack spacing={2} sx={{ maxWidth: 760 }}>
						<Chip
							label="Material UI integrado"
							color="primary"
							sx={{ width: "fit-content" }}
						/>
						<Typography variant="h2" component="h1">
							Base visual profesional para el sistema de vacunación.
						</Typography>
						<Typography variant="body1" color="text.secondary">
							La app ya arranca con ThemeProvider, CssBaseline, router y componentes MUI reales,
							preparada para crecer con vistas, formularios y navegación sin repetir layout.
						</Typography>
					</Stack>

					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
							gap: 3,
						}}
					>
						{highlights.map((item) => (
							<Box key={item.title}>
								<Card
									variant="outlined"
									sx={{
										height: "100%",
										borderRadius: 4,
										backdropFilter: "blur(12px)",
										backgroundColor: "rgba(255,255,255,0.82)",
									}}
								>
									<CardContent>
										<Stack spacing={2}>
											<Box
												sx={{
													width: 48,
													height: 48,
													borderRadius: 3,
													display: "grid",
													placeItems: "center",
													bgcolor: "primary.main",
													color: "primary.contrastText",
												}}
											>
												{item.icon}
											</Box>
											<Typography variant="h6">{item.title}</Typography>
											<Typography variant="body2" color="text.secondary">
												{item.description}
											</Typography>
										</Stack>
									</CardContent>
								</Card>
							</Box>
						))}
					</Box>

					<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
						<Button variant="contained" size="large">
							Empezar
						</Button>
						<Button variant="outlined" size="large">
							Ver módulos
						</Button>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
}

export default App;
