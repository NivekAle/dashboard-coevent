import DashboardHeadCompontent from "../../components/DashboardHeadCompontent/DashboardHeadCompontent";
import { FormEvent, useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask";


import { z } from "zod";
import { organizationApi } from "../../api/OrganizationApi";
import { Alert } from "antd";
import {
	LoadingOutlined,
	PlusOutlined
} from '@ant-design/icons';

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

	const [isSubmitting, setIsSubmitting] = useState(false);

	const [alertType, setAlertType] = useState<"success" | "warning" | "error">("warning");

	const formRef = useRef<HTMLFormElement>(null);

	const [formErrors, setFormErrors] = useState<Record<string, string>>({});

	const [alertMessage, setAlertMessage] = useState<string | null>(null);

	useEffect(() => {
		if (alertMessage) {
			const timer = setTimeout(() => {
				setAlertMessage(null);
				formRef.current?.reset();
				setFormErrors({});
			}, 2000);

			return () => clearTimeout(timer);
		}
	}, [alertMessage]);

	const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitting(true); // Ativa loading

		const formData = new FormData(event.currentTarget);
		const data = Object.fromEntries(formData.entries());

		try {
			const validData = addOrganizationFormSchema.parse(data);

			const response = await organizationApi.insert(validData);

			if (response?.statusCode === 400) {
				setAlertMessage(response?.message);
				setAlertType("error");
			} else {
				setAlertMessage("Organização criada com sucesso!");
				setAlertType("success");
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
		} finally {
			setIsSubmitting(false); // Desativa loading ao finalizar
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

			{
				alertMessage && (
					<Alert
						showIcon
						className="left-5 absolute bottom-5"
						message={alertMessage}
						type={alertType}
						closable
					/>
				)
			}

			<form onSubmit={handleFormSubmit} ref={formRef}>
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
									<InputMask
										mask="99.999.999/9999-99"
										name="cnpj"
										className={`focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm ${formErrors.cnpj ? "border-red-500" : ""}`}
										placeholder="00.000.000/0000-00"
									/>
									{formErrors.cnpj && (
										<span className="text-red-500 text-sm">{formErrors.cnpj}</span>
									)}
								</label>
							</div>
							<div className="my-3">
								<label>
									<span className="block mb-1">Telefone</span>
									<InputMask
										mask="(99) 99999-9999"
										maskChar={null}
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
										type="password"
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
					disabled={isSubmitting}
					className={`hover:bg-orange-400 flex flex-row gap-x-2 items-center py-4 px-6 text-center max-w-max transition-colors rounded-lg font-semibold text-xs ${isSubmitting ? "bg-orange-200 cursor-not-allowed text-orange-700" : "bg-orange-500 text-white active:bg-orange-100 active:text-orange-500"}`}>
					{
						isSubmitting ?
							<span>
								<LoadingOutlined />
								&nbsp;
								Enviando...
							</span>
							:
							<span>
								<PlusOutlined size={40} />
								&nbsp;
								Adicionar Organização
							</span>
					}
				</button>

			</form>
		</>
	);
}