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
import { useState } from "react";
import DragAndDropFilesCompontent from "../components/DragAndDropFilesCompontent/DragAndDropFilesCompontent";

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
	zip_code: z.string().min(1, "Preencha o valor corretamente"),
	country: z.string().min(1, "Preencha o valor corretamente"),
	area_of_the_place: z.string().min(1, "Preencha o valor corretamente"),
});

type CreateEventFormData = z.infer<typeof createEventFormSchema>;

export default function AddEventPage() {

	const { control, register, handleSubmit, formState: { errors } } = useForm<CreateEventFormData>({
		resolver: zodResolver(createEventFormSchema),
	});

	if (errors.dates) {
		errors.dates.message = "Seleciona a data de Início e término.";
	}

	function createEvent(data: any) {
		console.log(data);
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
							Title
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
					<hr className="my-4" />
					<h4 className="flex flex-row items-center gap-x-2 font-bold mb-3 text-lg">
						<MdOutlineSubtitles />
						Informações gerais
					</h4>
					<div className="flex flex-row items-start justify-between mb-4">
						<div className="flex-1">
							<p className="text-sm mb-2">
								Todo evento precisa ser vinculado a uma organização, por favor escolha uma.
							</p>
							<button type="button" className="text-xs font-semibold bg-slate-50 px-6 py-3 text-orange-600">
								Vincular a uma organização<i className="text-orange-500">*</i>
							</button>
						</div>
						<div className="flex-1">
							<p className="my-2 text-center">
								O evento é privado?
							</p>
							<div className="flex flex-row items-center justify-center gap-x-4">
								<label htmlFor="isPrivate-yes">
									<input type="radio" name="isPrivary" id="isPrivate-yes" onChange={() => console.log("Selecionado Sim")} />
									&nbsp;
									Sim
								</label>
								<label htmlFor="isPrivate-no">
									<input type="radio" name="isPrivary" id="isPrivate-no" onChange={() => console.log("Selecionado Não")} defaultChecked />
									&nbsp;
									Não
								</label>
							</div>
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
						<label htmlFor="">dasd</label>
						<input
							className="focus:border-range-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm"
							type="text"
							{...register("zip_code")}
						/>
						{errors.zip_code && <span className="mt-1 text-xs text-red-500">{errors.zip_code?.message}</span>}
					</div>
					<div className="my-3">
						<label htmlFor="">dasd</label>
						<input
							className="focus:border-range-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm"
							type="text"
							{...register("country")}
						/>
						{errors.country && <span className="mt-1 text-xs text-red-500">{errors.country?.message}</span>}
					</div>
					<div className="my-3">
						<label htmlFor="">dasd</label>
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
					<DragAndDropFilesCompontent />
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