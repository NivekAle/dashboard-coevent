import { Table, Checkbox, Select } from "antd";
import type { CheckboxProps } from 'antd';
import { useEffect, useState } from "react";

import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { eventApi } from "../api/EventApi";
import { EventForUseInTable } from "../types/event.types";
import DashboardHeadComponent from "../components/DashboardHeadCompontent/DashboardHeadCompontent";

export default function EventsPage() {

	const [eventDatas, setEventDatas] = useState<EventForUseInTable[]>();

	useEffect(() => {
		const getAllEvents = async () => {
			const response = await eventApi.getAll();

			setEventDatas(response);
		};

		getAllEvents();
	}, []);

	const onChangeInputCheckBox: CheckboxProps['onChange'] = (e) => {
		console.log(`checked = ${e.target.checked}`);
	};

	const columns = [
		{
			title: 'Id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'isPrivary',
			dataIndex: 'isPrivary',
			key: 'isPrivary',
		},
		{
			title: 'Created At',
			dataIndex: 'created_at',
			key: 'created_at',
		},
	];

	const handleChangeSelectElement = (value: string) => {
		console.log(`selected ${value}`);
	};

	return (
		<>

			<DashboardHeadComponent
				title="Eventos"
				description="Abaixo está listado todos os eventos que estão registrados no sistema e estão disponíveis para edição, remoção e criação."
				breadCrumb={
					{
						items: [
							{ label: "Organizações", link: "organizations" }
						],
					}}
			/>

			<div className="grid grid-cols-12 gap-x-4">
				<div className="col-span-2">
					<div className="bg-white p-5 rounded-lg border-[1px] select-none">
						<h4 className="font-semibold text-xl mb-0">
							Filtrar
						</h4>
						<hr className="my-4" />
						<p className="mb-2 capitalize font-semibold text-sm">
							ordernar por:
						</p>
						<div className="flex flex-row gap-x-4">
							<div className="flex-1">
								<p className="text-xs mb-1">
									Nome
								</p>
								<Select
									defaultValue="lucy"
									className="w-full"
									onChange={handleChangeSelectElement}
									options={[
										{ value: 'A', label: 'A-z' },
										{ value: 'D', label: 'Z-a' },
									]}
								/>
							</div>
							<div className="flex-1">
								<p className="text-xs mb-1">
									Preço
								</p>
								<Select
									defaultValue="lucy"
									className="w-full"
									onChange={handleChangeSelectElement}
									options={[
										{ value: 'ASC', label: 'Maior' },
										{ value: 'DESC', label: 'Menor' },
										/* { value: 'disabled', label: 'Disabled', disabled: true }, */
									]}
								/>
							</div>
						</div>
						<hr className="my-4" />
						<p className="mb-2 capitalize font-semibold text-sm">
							status
						</p>
						<ul className="flex gap-y-3 flex-col pl-4">
							<li>
								<Checkbox onChange={onChangeInputCheckBox}>
									Em andamento
								</Checkbox>
							</li>
							<li>
								<Checkbox onChange={onChangeInputCheckBox}>
									Finalizados
								</Checkbox>
							</li>
							<li>
								<Checkbox onChange={onChangeInputCheckBox}>
									Previstos
								</Checkbox>
							</li>
						</ul>
					</div>
				</div>
				<div className="col-span-10">
					<div className="bg-white p-5 rounded-lg border-[1px]">
						<div className="flex flex-row justify-between items-center mb-4">
							<h4 className="font-semibold text-xl">
								Listagem ({eventDatas?.length})
							</h4>
							<Link to={"/events/add"} className="flex flex-row gap-x-2 items-center py-3 px-6 text-center max-w-max bg-orange-500 text-white transition-colors rounded-lg active:bg-orange-100 active:text-orange-500 font-semibold text-xs">
								<MdAdd />
								Adicionar Evento
							</Link>
						</div>
						<Table dataSource={eventDatas} columns={columns} />
					</div>
				</div>
			</div >

		</>
	);

}