import { Controller, useForm } from "react-hook-form";
import DashboardHeadComponent from "../components/DashboardHeadCompontent/DashboardHeadCompontent";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/pt_BR";

import moment from "moment";
import { MdOutlineSubtitles } from "react-icons/md";
import { FaDatabase, FaImages } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
/* import { useState } from "react"; */
import { eventApi } from "../api/EventApi";

/* import { correiosApi } from "../api/CorreiosApi"; */
import DragAndDropFilesComponent from "../components/DragAndDropFilesCompontent/DragAndDropFilesCompontent";
import ModalSelectOrganization from "../components/modalSelectOrganization/ModalSelectOrganization";

const { RangePicker } = DatePicker;

const createEventFormSchema = z.object({
	title: z.string()
		.min(1, "O titulo do evento é obrigatório!")
		.transform(input => {
			return input.trim().split(" ").map(word => {
				return word[0].toUpperCase().concat(word.substring(1))
			}).join(" ")
		})
	,
	description: z.string()
		.min(1, "A descrição do evento é obrigatório!"),
	dates: z.array(z.string()),
	local: z.string().min(1, "Insira o local do evento!"),
	zip_code: z.string().optional(),
	country: z.string().optional(),
	area_of_the_place: z.string().optional(),
	isPrivary: z.boolean(),
	images: z
		.array(z.instanceof(File))
		.min(1, "Pelo menos uma imagem é obrigatória."),
	id_organization: z.number().min(1, "Selecione uma organização!")
});

type CreateEventFormData = z.infer<typeof createEventFormSchema>;

export default function AddEventPage() {

	const { control, register, handleSubmit, formState: { errors } } = useForm<CreateEventFormData>({
		resolver: zodResolver(createEventFormSchema),
	});

	if (errors.dates) {
		errors.dates.message = "Seleciona a data de Início e término.";
	}

	if (errors.id_organization) {
		errors.id_organization.message = "Selecione uma organização!";
	}

	function createEvent(data: CreateEventFormData) {
		console.log(data);

		eventApi.insert(data);
	}


	return (
		<>
			<DashboardHeadComponent title="Adicionar Evento" description="Adicione eventos para as organizações que já estão cadastrados no nosso sistema." breadCrumb={{ items: [{ label: "Eventos", link: "../events" }], currentPage: "Adicionar" }} />

			<form onSubmit={handleSubmit(createEvent)} className="bg-white py-6 px-8 rounded-lg border-[1px] grid grid-cols-12 gap-x-12 max-md:gap-x-0 select-none">
				<div className="col-span-6 max-lg:col-span-12 max-md:col-span-12 max-sm:col-span-12">
					<h4 className="flex flex-row items-center gap-x-2 font-bold mb-3 text-lg">
						<FaDatabase />
						Dados do evento
					</h4>
					<div className="my-3">
						<label htmlFor="">
							Titulo
						</label>
						<input
							type="text"
							className="focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm"
							placeholder="O titulo do evento"
							{...register("title")}
						/>
						{errors.title && <span className="mt-1 text-xs text-red-500">{errors.title?.message}</span>}
					</div>
					<div className="my-3">
						<label htmlFor="">
							Descrição
						</label>
						<textarea
							className="focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm"
							placeholder="O melhor evento do país..."
							cols={30}
							rows={5}
							{...register("description")}
						>
						</textarea>
						{errors.description && <span className="mt-1 text-xs text-red-500">{errors.description?.message}</span>}
					</div>
					<div className="my-3">
						<label className="block mb-1">
							Datas
						</label>
						<Controller
							control={control}
							name="dates"
							render={({ field }) => {
								return (
									<RangePicker
										showTime
										placeholder={["Data de Início", "Data de Término"]}
										locale={locale}
										format="DD/MM/YYYY HH:mm"
										className="w-full"
										onChange={(output) => {
											const firstDate = moment(output[0]?.toDate()).format("DD/MM/YYYY HH:mm").toString();
											const secondDate = moment(output[1]?.toDate()).format("DD/MM/YYYY HH:mm").toString();
											const res = [firstDate, secondDate]
											return field.onChange(res);
										}}
									/>
								)
							}}
						/>
						{errors.dates && <span className="mt-1 text-xs text-red-500">{errors.dates?.message}</span>}
					</div>

					<div className="flex flex-row items-start justify-between mb-4">
						<div className="flex-1">
						</div>
						<div className="flex-1">
						</div>
					</div>
					<hr className="my-4" />
					<h4 className="flex flex-row items-center gap-x-2 font-bold mb-3 text-lg">
						<FaMapMarkerAlt />
						Localização
					</h4>
					<div className="my-3">
						<label htmlFor="data[local]">
							<span className="block mb-1">Local do evento</span>
							<input
								className="focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm"
								type="text"
								placeholder="Ex: Av. 1 de Janeiro" id="data[local]"
								{...register("local")}
							/>
						</label>
						{errors.local && <span className="mt-1 text-xs text-red-500">{errors.local?.message}</span>}
					</div>
					<div className="my-3">
						<label htmlFor="">CEP</label>
						<input

							className="focus:border-range-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm"
							type="text"
							placeholder="0000-000"
							{...register("zip_code")}
						/>
						{errors.zip_code && <span className="mt-1 text-xs text-red-500">{errors.zip_code?.message}</span>}
					</div>
					<div className="my-3">
						<label htmlFor="">País</label>
						<input
							className="focus:border-range-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm"
							type="text"
							{...register("country")}
						/>
						{errors.country && <span className="mt-1 text-xs text-red-500">{errors.country?.message}</span>}
					</div>
					<div className="my-3">
						<label htmlFor="">Área do local</label>
						<input
							className="focus:border-range-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm"
							type="text"
							{...register("area_of_the_place")}
						/>
						{errors.area_of_the_place && <span className="mt-1 text-xs text-red-500">{errors.area_of_the_place?.message}</span>}
					</div>
				</div>
				<div className="col-span-6 max-lg:col-span-12 max-md:col-span-12 max-sm:col-span-12">
					<hr className="my-4 max-lg:block hidden" />
					<h4 className="flex flex-row items-center gap-x-2 font-bold mb-3 text-lg">
						<FaImages />
						Imagens
					</h4>
					<p className="text-sm">
						As imagens são obrigatórios. As dimensões que recomendamos é 600 de altura e 1250 de largura (1250x600).
					</p>
					<Controller
						name="images"
						control={control}
						defaultValue={[]}
						render={({ field }) => (
							<DragAndDropFilesComponent
								onChange={(files: File[]) => field.onChange(files)}
							/>
						)}
					/>
					{errors.images && <span className="-mt-3 text-xs text-red-500 text-center block">{errors.images.message}</span>}
					<hr className="my-4" />
					<h4 className="flex flex-row items-center gap-x-2 font-bold mb-3 text-lg">
						<MdOutlineSubtitles />
						Informações gerais
					</h4>
					<p className="text-sm mb-2">
						Todo evento precisa ser vinculado a uma organização, por favor escolha uma.
					</p>
					<Controller
						name="id_organization"
						control={control}
						render={({ field }) => (
							<ModalSelectOrganization getOptionSelected={(id_option) => field.onChange(id_option)} />
						)}
					/>
					{errors.id_organization && <span className="mt-2 text-xs text-red-500 block">{errors.id_organization.message}</span>}

					<p className="text-sm mb-2 my-4">O evento é privado?</p>
					<Controller
						name="isPrivary"
						control={control}
						defaultValue={false}
						render={({ field }) => (
							<div className="flex gap-x-3">
								<div className="flex-1 grow-0">
									<input
										type="radio"
										value="1"
										id="isPrivate-yes"
										checked={field.value === true}
										onChange={() => field.onChange(true)}
										className="peer hidden"
									/>
									<label
										htmlFor="isPrivate-yes"
										className="
										peer-checked:bg-orange-500 peer-checked:text-white
										border-1 block px-5 py-2 bg-slate-100 cursor-pointer
										rounded-md text-sm hover:bg-slate-200
										">
										Sim
									</label>
								</div>
								<div className="flex-1 grow-0">
									<input
										type="radio"
										value="0"
										id="isPrivate-no"
										checked={field.value === false}
										onChange={() => field.onChange(false)}
										className="peer hidden"
									/>
									<label
										htmlFor="isPrivate-no"
										className="
										peer-checked:bg-orange-500 peer-checked:text-white
										border-1 block px-5 py-2 bg-slate-100 cursor-pointer
										rounded-md text-sm hover:bg-slate-200
										">
										Não
									</label>
								</div>
							</div>
						)}
					/>
					{errors.isPrivary && (
						<span className="mt-1 text-xs text-red-500">
							{errors.isPrivary.message}
						</span>
					)}
				</div>
				<div className="col-span-12">
					<button type="submit" className="flex flex-row gap-x-2 items-center py-3 px-6 text-center max-w-max bg-orange-500 text-white transition-colors rounded-lg active:bg-orange-100 active:text-orange-500 font-semibold text-xs">
						Adicionar Evento
					</button>
				</div>
			</form>

		</>
	);
}
