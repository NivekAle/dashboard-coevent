import { Select } from "antd";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineSubtitles } from "react-icons/md";
import { FaImages } from "react-icons/fa";
import DragAndDropFilesCompontent from "../components/DragAndDropFilesCompontent/DragAndDropFilesCompontent";
import { FaDatabase } from "react-icons/fa";
import { FormEvent } from "react";
import { DatePicker } from 'antd';
import locale from "antd/es/date-picker/locale/pt_BR";
import { FaHome } from "react-icons/fa";

const { RangePicker } = DatePicker;

export default function AddEventPage() {


	const handleChangeSelectElement = (value: string) => {
		console.log(`selected ${value}`);
	};

	const handleForm = (event: FormEvent) => {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);

		// Aqui você pode trabalhar com o objeto FormData, como enviar para o servidor ou fazer outras operações.

		// Exemplo de uso:
		for (const [name, value] of formData.entries()) {
			console.log(name, value);
		}
	}

	return (
		<>
			<header>
				<div className=" px-5 py-2 rounded-lg  mb-4">
					<div className="flex-1">
						<p className="text-xs font-semibold mb-3">
							<span className="inline-block"> <FaHome /> </span> &nbsp; / &nbsp; <span className="">Eventos</span> &nbsp; / &nbsp; <span className="text-orange-500">Adicionar</span>
						</p>
						<h2 className="font-semibold text-2xl mb-3">
							Adicionar Evento
						</h2>
						<p>
							Adicione eventos para as organizações que já estão cadastrados no nosso sistema.
						</p>
					</div>
					<div className="flex-1">

					</div>
				</div>
			</header>

			<form onSubmit={handleForm}>
				<div className="grid grid-cols-12 gap-x-4">
					<div className="col-span-6">
						<div className="bg-white py-6 px-8 rounded-lg border-[1px]">
							<h4 className="flex flex-row items-center gap-x-2 font-bold mb-3 text-lg">
								<FaDatabase />
								Dados do evento
							</h4>
							<div className="my-3">
								<label htmlFor="data[Title]">
									<span className="block mb-1">Title</span>
									<input name="title" id="data[Title]" type="text" className="focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm" placeholder="Show de fulano" />
								</label>
							</div>
							<div className="my-3">
								<label htmlFor="data[Description]">
									<span className="block mb-1">Description</span>
									<textarea name="description" className="focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm" placeholder="O melhor evento do país..." id="data[Description]" cols={30} rows={5}></textarea>
								</label>
							</div>
							<div className="my-3">
								<label htmlFor="data[expected_date]" className="block mb-1">
									Datas
								</label>
								<RangePicker showTime placeholder={["Data de Início", "Data de Término"]} locale={locale} format="DD/MM/YYYY HH:mm" className="w-full" name="dates" />
							</div>
							{/* <div className="my-3 flex	flex-row gap-x-4">
							<div className="flex-1">
							<label htmlFor="data[expected_date]">
							<span className="block mb-1">Data de Início</span>
							<input className="focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm" type="date" name="expected_date" id="data[expected_date]" />
							</label>
							</div>
							<div className="flex-1">
							<label htmlFor="data[end_date]">
							<span className="block mb-1">Data de Término</span>
							<input className="focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm" type="date" name="end_date" id="data[end_date]" />
							</label>
							</div>
						</div> */}

							<hr className="my-4" />
							<h4 className="flex flex-row items-center gap-x-2 font-bold mb-3 text-lg">
								<MdOutlineSubtitles />
								Informações gerais
							</h4>
							<div className="flex flex-row justify-between">
								<div className="flex-1">
									<p className="my-2">
										O evento é privado?
									</p>
									<div className="flex flex-row gap-x-4">
										<label htmlFor="">
											<input type="radio" name="isPrivary" id="" />
											&nbsp;
											Sim
										</label>
										<label htmlFor="">
											<input type="radio" name="isPrivary" id="" checked />
											&nbsp;
											Não
										</label>
									</div>
								</div>
								<div className="flex-1">
									<label htmlFor="">
										Organizadores
									</label>
									<Select
										defaultValue="Flow-Fest"
										className="w-full"
										onChange={handleChangeSelectElement}
										options={[
											{ value: 'Flow-Fest', label: 'Flow Fest' },
											{ value: 'CENA-2k25', label: 'CENA 2k25' },
											/* { value: 'disabled', label: 'Disabled', disabled: true }, */
										]}
									/>
								</div>
							</div>
							<hr className="my-4" />
							<h4 className="flex flex-row items-center gap-x-2 font-bold mb-3 text-lg">
								<FaImages />
								Imagens
							</h4>
							<p>
								As imagens são obrigatórios para que haja confiabilidade.
							</p>
							{/* Renderizar as imagens aqui */}
							<DragAndDropFilesCompontent />
						</div>
					</div>
					<div className="col-span-6">
						<div className="bg-white py-6 px-8 rounded-lg border-[1px]">
							<h4 className="flex flex-row items-center gap-x-2 font-bold mb-3 text-lg">
								<FaMapMarkerAlt />
								Localização
							</h4>
							<label htmlFor="data[local]">
								<span className="block mb-1">Local do evento</span>
								<input className="focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm" type="text" name="" placeholder="Ex: Av. 1 de Janeiro" id="data[local]" />
							</label>
							<p className="my-3">
								Quer ser mais exato?
							</p>
							<label htmlFor="">
								<input type="checkbox" name="" id="" />
								&nbsp;
								Sim
							</label>
							<hr className="my-4" />
							{/* se caso ele por que sim no input:checkbox acima, terá que ser renderizado mais inputs */}
							<div className="mb-3">
								<label htmlFor="">
									<span className="block mb-1">
										zip dode
									</span>
									<input type="text" className="focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm" placeholder="zip dode" />
								</label>
							</div>
							<div className="mb-3">
								<label htmlFor="">
									<span className="block mb-1">
										location number
									</span>
									<input type="text" className="focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm" placeholder="location number" />
								</label>
							</div>
							<div className="mb-3">
								<label htmlFor="">
									<span className="block mb-1">
										street
									</span>
									<input type="text" className="focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm" placeholder="street" />
								</label>
							</div>
							<div className="mb-3">
								<label htmlFor="">
									<span className="block mb-1">
										country
									</span>
									<input type="text" className="focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm" placeholder="country" />
								</label>
							</div>
							<div className="mb-3">
								<label htmlFor="">
									<span className="block mb-1">
										state
									</span>
									<input type="text" className="focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm" placeholder="state" />
								</label>
							</div>
							<div className="mb-3">
								<label htmlFor="">
									<span className="block mb-1">
										area of the place
									</span>
									<input type="text" className="focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm" placeholder="area_of_the_place" />
								</label>
							</div>
						</div>
					</div>
				</div>
				<button type="submit" className="flex flex-row gap-x-2 items-center py-3 px-6 text-center max-w-max bg-orange-500 text-white transition-colors rounded-lg active:bg-orange-100 active:text-orange-500 font-semibold text-xs">
					Adicionar Evento
				</button>
			</form>

		</>
	);
}