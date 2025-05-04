import { createContext, useState, useEffect, ReactNode } from "react";
import auth_api from "./Auth.api";

type User = {
	id: number;
	name: string;
};

type AuthContextType = {
	user: User | null;
	login: (token: string) => void;
	logout: () => void;
	loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			auth_api.get("/auth/me")
				.then(response => {
					setUser(response.data);
					setLoading(false);
				})
				.catch(() => {
					localStorage.removeItem("token");
					setLoading(false);
				});


		} else {
			setLoading(false);
		}
	}, []);

	const login = async (token: string): Promise<void> => {
		localStorage.setItem("token", token);
		const { data } = await auth_api.get("/auth/me");
		setUser(data);
	};


	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};