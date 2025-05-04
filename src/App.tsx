import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import TemplateCompontent from "./components/TemplateCompontent/TemplateComponent";
import EventsPage from "./pages/EventsPage";
import AddEventPage from "./pages/AddEventPage";
import OrganizationsPage from "./pages/Organizations/OrganizationsPage";
import AddOrganizationPage from "./pages/Organizations/AddOrganizationPage";
import UsersPage from "./pages/UsersPage";
import FinancesPage from "./pages/FinancesPage";
import OrganizationDetailsPage from "./pages/Organizations/OrganizationEditPage";
import { AuthProvider } from "./auth/AuthContext";
import Login from "./Login";
import { PrivateRoute } from "./auth/PrivateRoute";

function App() {

	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route
						path="/"
						element={
							<PrivateRoute>
								<TemplateCompontent />
							</PrivateRoute>
						}
					>
						<Route path='/dashboard' element={<DashboardPage />} />
						<Route path='/events' element={<EventsPage />} />
						<Route path='/events/add' element={<AddEventPage />} />
						<Route path='/organizations' element={<OrganizationsPage />} />
						<Route path='/organizations/add' element={<AddOrganizationPage />} />
						<Route path="/organizations/edit/:id" element={<OrganizationDetailsPage />} />
						<Route path='/finances' element={<FinancesPage />} />
						<Route path='/users' element={<UsersPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App;
