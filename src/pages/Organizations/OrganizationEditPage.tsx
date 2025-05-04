import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardHeadComponent from "../../components/DashboardHeadCompontent/DashboardHeadCompontent";
import { organizationApi } from "../../api/OrganizationApi";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputMask from "react-input-mask";
import { LoadingOutlined, SaveOutlined } from "@ant-design/icons";
import { Alert } from "antd";

// Zod schema
const organizationSchema = z.object({
	name: z.string().min(1, "O nome é obrigatório"),
	email: z.string().email("E-mail inválido"),
	cnpj: z.string().min(1, "O CNPJ é obrigatório"),
	telephone: z.string().min(1, "O telefone é obrigatório"),
	password: z.string().optional(), // opcional na edição
});

type OrganizationFormData = z.infer<typeof organizationSchema>;

export default function OrganizationEditPage() {

	const [alertType, setAlertType] = useState<"success" | "warning" | "error">("warning");
	const [alertMessage, setAlertMessage] = useState<string | null>(null);

	const { id } = useParams();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
		control
	} = useForm<OrganizationFormData>({
		resolver: zodResolver(organizationSchema),
		defaultValues: {
			name: "",
			email: "",
			cnpj: "",
			telephone: "",
			password: "",
		},
	});

	useEffect(() => {
		if (!id || isNaN(Number(id))) {
			navigate("/organizations");
			return;
		}

		fetchOrganizationData(Number(id));
	}, [id]);

	const fetchOrganizationData = async (org_id: number) => {
		const response = await organizationApi.getOrgById(org_id);
		const data = response.data;

		setValue("name", data.name);
		setValue("email", data.email);
		setValue("cnpj", data.cnpj);
		setValue("telephone", data.telephone);
	};

	const onSubmit = async (formData: OrganizationFormData) => {
		const response = await organizationApi.updateOrg(Number(id), formData);

		if (response?.statusCode === 400) {
			setAlertMessage(response?.message);
			setAlertType("error");
		} else {
			setAlertMessage("Organização criada com sucesso!");
			setAlertType("success");
		}
	};

	return (
		<>
			<DashboardHeadComponent
				title="Editar Organizações"
				description="Atualize abaixo os dados da organização."
				breadCrumb={{
					items: [{ label: "Organizações", link: "organizations" }],
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

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid grid-cols-12 gap-x-4 mb-4">
					<div className="col-span-6">
						<div className="bg-white py-6 px-8 rounded-lg border-[1px]">
							<div className="my-3">
								<label>
									<span className="block mb-1">Nome</span>
									<input
										type="text"
										{...register("name")}
										className={`focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm ${errors.name ? "border-red-500" : ""}`}
										placeholder="Nome da Organização"
									/>
									{errors.name && (
										<span className="text-red-500 text-sm">{errors.name.message}</span>
									)}
								</label>
							</div>

							<div className="my-3">
								<label>
									<span className="block mb-1">E-mail</span>
									<input
										type="text"
										{...register("email")}
										className={`focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm ${errors.email ? "border-red-500" : ""}`}
										placeholder="E-mail"
									/>
									{errors.email && (
										<span className="text-red-500 text-sm">{errors.email.message}</span>
									)}
								</label>
							</div>

							<div className="my-3">
								<label>
									<span className="block mb-1">CNPJ</span>
									<Controller
										name="cnpj"
										control={control}
										render={({ field }) => (
											<InputMask
												{...field}
												mask="99.999.999/9999-99"
												className={`focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm ${errors.cnpj ? "border-red-500" : ""}`}
												placeholder="00.000.000/0000-00"
											/>
										)}
									/>
									{errors.cnpj && (
										<span className="text-red-500 text-sm">{errors.cnpj.message}</span>
									)}
								</label>
							</div>

							<div className="my-3">
								<label>
									<span className="block mb-1">Telefone</span>
									<Controller
										name="telephone"
										control={control}
										render={({ field }) => (
											<InputMask
												{...field}
												mask="(99) 99999-9999"
												maskChar={null}
												className={`focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm ${errors.telephone ? "border-red-500" : ""}`}
												placeholder="(00) 00000-0000"
											/>
										)}
									/>
									{errors.telephone && (
										<span className="text-red-500 text-sm">{errors.telephone.message}</span>
									)}
								</label>
							</div>

							<div className="my-3">
								<label>
									<span className="block mb-1">Senha</span>
									<input
										type="password"
										{...register("password")}
										className={`focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm ${errors.password ? "border-red-500" : ""}`}
										placeholder="**********"
									/>
									{errors.password && (
										<span className="text-red-500 text-sm">{errors.password.message}</span>
									)}
								</label>
							</div>
						</div>
					</div>
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					className={`hover:bg-orange-400 flex flex-row gap-x-2 items-center py-4 px-6 text-center max-w-max transition-colors rounded-lg font-semibold text-xs ${isSubmitting ? "bg-orange-200 cursor-not-allowed text-orange-700" : "bg-orange-500 text-white active:bg-orange-100 active:text-orange-500"}`}
				>
					{isSubmitting ? (
						<>
							<LoadingOutlined />
							&nbsp; Atualizando...
						</>
					) : (
						<>
							<SaveOutlined />
							&nbsp; Atualizar Organização
						</>
					)}
				</button>
			</form>
		</>
	);
}
