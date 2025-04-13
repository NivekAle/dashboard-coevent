import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import TemplateCompontent from "./components/TemplateCompontent/TemplateComponent";
import EventsPage from "./pages/EventsPage";
import AddEventPage from "./pages/AddEventPage";
import OrganizationsPage from "./pages/Organizations/OrganizationsPage";
import AddOrganizationPage from "./pages/Organizations/AddOrganizationPage";
import UsersPage from "./pages/UsersPage";
import FinancesPage from "./pages/FinancesPage";
import OrganizationDetailsPage from "./pages/Organizations/OrganizationEditPage";

function App() {

	return (
		<Routes>
			<Route path="/" element={<TemplateCompontent />}>
				<Route path='/dashboard' element={<DashboardPage />} />

				<Route path='/events' element={<EventsPage />} />
				<Route path='/events/add' element={<AddEventPage />} />

				<Route path='/organizations' element={<OrganizationsPage />} />
				<Route path='/organizations/add' element={<AddOrganizationPage />} />
				<Route path="/organizations/edit/:id" element={<OrganizationDetailsPage />} />

				<Route path='/users' element={<UsersPage />} />

				<Route path='/finances' element={<FinancesPage />} />
			</Route>
		</Routes>
	)
}

export default App;
