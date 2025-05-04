import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
	const { user, loading } = useAuth();

	if (loading) {
		return <div className="p-8">Carregando...</div>; // ou um spinner se quiser
	}
	console.log(user);
	return user ? children : <Navigate to="/login" />;
};
