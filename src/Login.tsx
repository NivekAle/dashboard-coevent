import { useState } from "react";
import { useNavigate } from "react-router-dom";
import auth_api from "./auth/Auth.api"
import { useAuth } from "./auth/useAuth";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const { data } = await auth_api.post("/auth/login", { email, password });
			await login(data.token); // aguarda o setUser
			navigate("/"); // redireciona após garantir que o user foi setado
		} catch (err) {
			console.error("Erro no login", err);
		}
	};

	return (
		<>

			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
						Logo
					</a>
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Acesse sua conta
							</h1>
							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seu e-mail</label>
									<input required value={email} onChange={e => setEmail(e.target.value)} placeholder="exemplo@gmail.com" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
								</div>
								<div className="mb-3">
									<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
									<input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
								</div>
								<button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500 hover:bg-blue-700 focus:ring-blue-100">Entrar</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
