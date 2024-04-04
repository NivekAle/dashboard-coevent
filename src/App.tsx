
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import TemplateCompontent from "./components/TemplateCompontent/TemplateComponent";
import EventsPage from "./pages/EventsPage";
import AddEventPage from "./pages/AddEventPage";
import OrganizationsPage from "./pages/OrganizationsPage";
import AddOrganizationPage from "./pages/AddOrganizationPage";

function App() {

	return (
		<Routes>
			<Route path="/" element={<TemplateCompontent />}>
				<Route path='/dashboard' element={<DashboardPage />} />
				<Route path='/events' element={<EventsPage />} />
				<Route path='/events/add' element={<AddEventPage />} />
				<Route path='/organizations' element={<OrganizationsPage />} />
				<Route path='/organizations/add' element={<AddOrganizationPage />} />
			</Route>
		</Routes>
	)
}

export default App;
