import DashboardHeadCompontent from "../../components/DashboardHeadCompontent/DashboardHeadCompontent";
import { FormEvent, useState } from "react";

import { z } from "zod";
import { organizationApi } from "../../api/OrganizationApi";
import { Alert } from "antd";

const addOrganizationFormSchema = z.object({
	name: z
		.string()
		.min(1, "O nome é obrigatório."),
	email: z
		.string()
		.min(1, "O e-mail é obrigatório.")
		.email("Insira um e-mail válido."),
	cnpj: z
		.string()
		.transform((value) => value.replace(/\D/g, "")) // Remove caracteres não numéricos
		.refine((value) => /^\d{14}$/.test(value), "O CNPJ deve conter exatamente 14 números."),
	telephone: z
		.string()
		.transform((value) => value.replace(/\D/g, "")) // Remove caracteres não numéricos
		.refine((value) => /^\d{10,15}$/.test(value), "Insira um telefone válido com 10 a 15 números."),
	password: z
		.string()
		.min(8, "A senha deve conter pelo menos 8 caracteres.")
});


export default function AddOrganizationPage() {
	const [formErrors, setFormErrors] = useState<Record<string, string>>({});

	const [alertMessage, setAlertMessage] = useState<string | null>(null);


	const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const data = Object.fromEntries(formData.entries());

		try {
			const validData = addOrganizationFormSchema.parse(data);

			const response = await organizationApi.insert(validData);

			if (response?.statusCode == 400) {
				setAlertMessage(response?.message);
			} else {
				setAlertMessage("Organização criada com sucesso!");
			}

		} catch (error) {
			if (error instanceof z.ZodError) {
				const fieldErrors: Record<string, string> = {};
				error.errors.forEach((e) => {
					if (e.path[0]) {
						fieldErrors[e.path[0] as string] = e.message;
					}
				});
				setFormErrors(fieldErrors);
			}
		}
	};

	return (
		<>
			<DashboardHeadCompontent
				title="Adicionar uma Organização"
				description="Lembre que a organização precisa estar ciente deste cadastro e que recomendamos que o cadastro só ocorra se caso estaja havendo algum problema com o cadastro da organização."
				breadCrumb={
					{
						items: [
							{ label: "Organizações", link: "../organizations" }
						],
						currentPage: "Adicionar"
					}}
			/>
			{alertMessage && (<Alert className="left-5 absolute bottom-5" message={alertMessage} type="warning" closable />)}
			<form onSubmit={handleFormSubmit}>
				<div className="grid grid-cols-12 gap-x-4 mb-4">
					<div className="col-span-6">
						<div className="bg-white py-6 px-8 rounded-lg border-[1px]">
							<div className="my-3">
								<label>
									<span className="block mb-1">Nome</span>
									<input
										type="text"
										name="name"
										className={`focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm ${formErrors.name ? "border-red-500" : ""
											}`}
										placeholder="Nome da Organização"
									/>
									{formErrors.name && (
										<span className="text-red-500 text-sm">{formErrors.name}</span>
									)}
								</label>
							</div>
							<div className="my-3">
								<label>
									<span className="block mb-1">E-mail</span>
									<input
										type="text"
										name="email"
										className={`focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm ${formErrors.email ? "border-red-500" : ""
											}`}
										placeholder="E-mail"
									/>
									{formErrors.email && (
										<span className="text-red-500 text-sm">{formErrors.email}</span>
									)}
								</label>
							</div>
							<div className="my-3">
								<label>
									<span className="block mb-1">CNPJ</span>
									<input
										type="text"
										name="cnpj"
										className={`focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm ${formErrors.cnpj ? "border-red-500" : ""
											}`}
										placeholder="CNPJ"
									/>
									{formErrors.cnpj && (
										<span className="text-red-500 text-sm">{formErrors.cnpj}</span>
									)}
								</label>
							</div>
							<div className="my-3">
								<label>
									<span className="block mb-1">Telefone</span>
									<input
										maxLength={15}
										type="text"
										name="telephone"
										className={`focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm ${formErrors.telephone ? "border-red-500" : ""
											}`}
										placeholder="(00) 00000-0000"
									/>
									{formErrors.telephone && (
										<span className="text-red-500 text-sm">{formErrors.telephone}</span>
									)}
								</label>
							</div>
							<div className="my-3">
								<label>
									<span className="block mb-1">Senha</span>
									<input
										type="text"
										name="password"
										className={`focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm ${formErrors.password ? "border-red-500" : ""
											}`}
										placeholder="**********"
									/>
									{formErrors.password && (
										<span className="text-red-500 text-sm">{formErrors.password}</span>
									)}
								</label>
							</div>
						</div>
					</div>
				</div>
				<button
					type="submit"
					className="flex flex-row gap-x-2 items-center py-3 px-6 text-center max-w-max bg-orange-500 text-white transition-colors rounded-lg active:bg-orange-100 active:text-orange-500 font-semibold text-xs"
				>
					Adicionar Organização
				</button>
			</form>
		</>
	);
}