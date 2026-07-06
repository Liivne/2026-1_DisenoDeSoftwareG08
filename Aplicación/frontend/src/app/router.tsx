import { Routes, Route } from "react-router-dom";

import App from "./App";
import LoginPage from "@/features/auth/pages/LoginPage";

export function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/campaigns" element={<CampaignListPage />} />

			<Route
				path="/campaigns/new"
				element={<CampaignCreatePage />}
			/>
		</Routes>
	);
}
